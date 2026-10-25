import sqlite3
import sqlite_vec
import numpy as np
import json
from pathlib import Path
from typing import List, Optional, Iterator
from .models import Chunk, IndexConfig
from .paths import RagPaths
from .embedder import Embedder

SCHEMA = """
CREATE TABLE IF NOT EXISTS chunks (
    id INTEGER PRIMARY KEY,
    file_path TEXT NOT NULL,
    chunk_index INTEGER NOT NULL,
    content TEXT NOT NULL,
    tokens INTEGER NOT NULL,
    language TEXT,
    start_line INTEGER,
    end_line INTEGER,
    embedding BLOB
);

CREATE VIRTUAL TABLE IF NOT EXISTS vec_chunks USING vec0(
    embedding FLOAT[384]
);

CREATE TABLE IF NOT EXISTS meta (
    key TEXT PRIMARY KEY,
    value TEXT
);

CREATE INDEX IF NOT EXISTS idx_chunks_file ON chunks(file_path);
"""

class VectorIndex:
    def __init__(self, config: IndexConfig, paths: RagPaths, embedder: Embedder):
        self.config = config
        self.paths = paths
        self.embedder = embedder
        self.conn: Optional[sqlite3.Connection] = None
    
    def connect(self):
        if self.conn:
            return
        self.paths.ensure_dirs()
        self.conn = sqlite3.connect(str(self.paths.index_db))
        self.conn.enable_load_extension(True)
        sqlite_vec.load(self.conn)
        self.conn.enable_load_extension(False)
        self.conn.executescript(SCHEMA)
        # Set version
        self.conn.execute("INSERT OR REPLACE INTO meta(key, value) VALUES (?, ?)", 
                         ("version", str(self.config.version)))
        self.conn.commit()
    
    def close(self):
        if self.conn:
            self.conn.close()
            self.conn = None
    
    def __enter__(self):
        self.connect()
        return self
    
    def __exit__(self, *args):
        self.close()
    
    def _chunk_to_row(self, chunk: Chunk) -> tuple:
        emb = chunk.embedding
        if emb is None and chunk.content:
            emb = self.embedder.embed_one(chunk.content).tobytes()
        return (
            chunk.file_path,
            chunk.chunk_index,
            chunk.content,
            chunk.tokens,
            chunk.language,
            chunk.start_line,
            chunk.end_line,
            emb,
        )
    
    def upsert_chunks(self, chunks: List[Chunk]) -> int:
        self.connect()
        count = 0
        for chunk in chunks:
            row = self._chunk_to_row(chunk)
            # First, get the existing chunk_id to delete from vec_chunks
            cur = self.conn.execute(
                "SELECT id FROM chunks WHERE file_path = ? AND chunk_index = ?",
                (chunk.file_path, chunk.chunk_index)
            )
            existing = cur.fetchone()
            if existing:
                existing_id = existing[0]
                self.conn.execute("DELETE FROM vec_chunks WHERE rowid = ?", (existing_id,))
            
            # Delete from chunks
            self.conn.execute(
                "DELETE FROM chunks WHERE file_path = ? AND chunk_index = ?",
                (chunk.file_path, chunk.chunk_index)
            )
            # Insert
            cur = self.conn.execute(
                """INSERT INTO chunks(file_path, chunk_index, content, tokens, language, start_line, end_line, embedding)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
                row
            )
            chunk_id = cur.lastrowid
            # Insert into vec table
            self.conn.execute(
                "INSERT INTO vec_chunks(rowid, embedding) VALUES (?, ?)",
                (chunk_id, row[7])
            )
            count += 1
        self.conn.commit()
        return count
    
    def delete_chunks(self, file_paths: List[str]) -> int:
        self.connect()
        placeholders = ",".join("?" * len(file_paths))
        # Get ids to delete from vec table
        cur = self.conn.execute(
            f"SELECT id FROM chunks WHERE file_path IN ({placeholders})", file_paths
        )
        ids = [row[0] for row in cur.fetchall()]
        if ids:
            id_placeholders = ",".join("?" * len(ids))
            self.conn.execute(f"DELETE FROM vec_chunks WHERE rowid IN ({id_placeholders})", ids)
        cur = self.conn.execute(
            f"DELETE FROM chunks WHERE file_path IN ({placeholders})", file_paths
        )
        self.conn.commit()
        return cur.rowcount
    
    def get_all_chunks(self) -> List[Chunk]:
        self.connect()
        cur = self.conn.execute(
            "SELECT id, file_path, chunk_index, content, tokens, language, start_line, end_line, embedding FROM chunks"
        )
        chunks = []
        for row in cur.fetchall():
            chunks.append(Chunk(
                id=row[0],
                file_path=row[1],
                chunk_index=row[2],
                content=row[3],
                tokens=row[4],
                language=row[5],
                start_line=row[6],
                end_line=row[7],
                embedding=row[8],
            ))
        return chunks
    
    def get_chunk_count(self) -> int:
        self.connect()
        cur = self.conn.execute("SELECT COUNT(*) FROM chunks")
        return cur.fetchone()[0]
    
    def get_index_version(self) -> int:
        self.connect()
        cur = self.conn.execute("SELECT value FROM meta WHERE key = 'version'")
        row = cur.fetchone()
        return int(row[0]) if row else 0