import pytest
import tempfile
import numpy as np
from pathlib import Path
from src.rag.indexer import VectorIndex
from src.rag.models import IndexConfig, Chunk
from src.rag.paths import RagPaths
from src.rag.embedder import Embedder, ensure_model


@pytest.mark.integration
def test_indexer_crud(tmp_path):
    config = IndexConfig()
    paths = RagPaths.from_root(tmp_path)
    paths.ensure_dirs()
    
    # Need embedder (downloads model)
    ensure_model(config, paths)
    embedder = Embedder(config, paths)
    
    with VectorIndex(config, paths, embedder) as idx:
        # Insert
        chunks = [
            Chunk(id=None, file_path="test.py", chunk_index=0, content="def foo(): pass", tokens=5, language="python", start_line=1, end_line=1),
            Chunk(id=None, file_path="test.py", chunk_index=1, content="def bar(): pass", tokens=5, language="python", start_line=2, end_line=2),
        ]
        count = idx.upsert_chunks(chunks)
        assert count == 2
        
        # Retrieve
        all_chunks = idx.get_all_chunks()
        assert len(all_chunks) == 2
        assert all_chunks[0].file_path == "test.py"
        assert all_chunks[0].embedding is not None
        
        # Delete
        deleted = idx.delete_chunks(["test.py"])
        assert deleted == 2
        assert idx.get_chunk_count() == 0
        
        # Re-insert same (upsert)
        count = idx.upsert_chunks(chunks)
        assert count == 2
        assert idx.get_chunk_count() == 2


@pytest.mark.integration
def test_indexer_upsert_updates_existing(tmp_path):
    config = IndexConfig()
    paths = RagPaths.from_root(tmp_path)
    paths.ensure_dirs()
    
    ensure_model(config, paths)
    embedder = Embedder(config, paths)
    
    with VectorIndex(config, paths, embedder) as idx:
        # Insert initial chunks
        chunks = [
            Chunk(id=None, file_path="test.py", chunk_index=0, content="def foo(): pass", tokens=5, language="python", start_line=1, end_line=1),
        ]
        idx.upsert_chunks(chunks)
        assert idx.get_chunk_count() == 1
        
        # Update with new content (same file_path and chunk_index)
        updated_chunks = [
            Chunk(id=None, file_path="test.py", chunk_index=0, content="def foo(): return 42", tokens=6, language="python", start_line=1, end_line=1),
        ]
        count = idx.upsert_chunks(updated_chunks)
        assert count == 1
        assert idx.get_chunk_count() == 1
        
        # Verify content was updated
        all_chunks = idx.get_all_chunks()
        assert all_chunks[0].content == "def foo(): return 42"
        assert all_chunks[0].tokens == 6


@pytest.mark.integration
def test_indexer_multiple_files(tmp_path):
    config = IndexConfig()
    paths = RagPaths.from_root(tmp_path)
    paths.ensure_dirs()
    
    ensure_model(config, paths)
    embedder = Embedder(config, paths)
    
    with VectorIndex(config, paths, embedder) as idx:
        chunks = [
            Chunk(id=None, file_path="a.py", chunk_index=0, content="def a(): pass", tokens=4, language="python", start_line=1, end_line=1),
            Chunk(id=None, file_path="b.py", chunk_index=0, content="def b(): pass", tokens=4, language="python", start_line=1, end_line=1),
            Chunk(id=None, file_path="b.py", chunk_index=1, content="def c(): pass", tokens=4, language="python", start_line=2, end_line=2),
        ]
        count = idx.upsert_chunks(chunks)
        assert count == 3
        assert idx.get_chunk_count() == 3
        
        # Delete only one file
        deleted = idx.delete_chunks(["a.py"])
        assert deleted == 1
        assert idx.get_chunk_count() == 2
        
        remaining = idx.get_all_chunks()
        assert all(c.file_path == "b.py" for c in remaining)


@pytest.mark.integration
def test_indexer_get_index_version(tmp_path):
    config = IndexConfig(version=5)
    paths = RagPaths.from_root(tmp_path)
    paths.ensure_dirs()
    
    ensure_model(config, paths)
    embedder = Embedder(config, paths)
    
    with VectorIndex(config, paths, embedder) as idx:
        version = idx.get_index_version()
        assert version == 5


@pytest.mark.integration
def test_indexer_embedding_persisted(tmp_path):
    config = IndexConfig()
    paths = RagPaths.from_root(tmp_path)
    paths.ensure_dirs()
    
    ensure_model(config, paths)
    embedder = Embedder(config, paths)
    
    with VectorIndex(config, paths, embedder) as idx:
        chunks = [
            Chunk(id=None, file_path="test.py", chunk_index=0, content="def foo(): pass", tokens=5, language="python", start_line=1, end_line=1),
        ]
        idx.upsert_chunks(chunks)
        
        # Verify embedding is stored as bytes
        all_chunks = idx.get_all_chunks()
        assert all_chunks[0].embedding is not None
        assert isinstance(all_chunks[0].embedding, bytes)
        
        # Verify it's valid float32 data (384 dims * 4 bytes = 1536 bytes)
        assert len(all_chunks[0].embedding) == 384 * 4