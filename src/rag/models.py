from dataclasses import dataclass
from typing import Optional, List
import json

@dataclass
class Chunk:
    id: Optional[int]
    file_path: str
    chunk_index: int
    content: str
    tokens: int
    language: Optional[str]
    start_line: int
    end_line: int
    embedding: Optional[bytes] = None  # sqlite-vec blob

@dataclass
class SearchResult:
    chunk: Chunk
    score: float
    bm25_score: float
    vector_score: float

@dataclass
class IndexConfig:
    version: int = 1
    embedding_model: str = "all-MiniLM-L6-v2"
    embedding_dim: int = 384
    chunk_max_tokens: int = 500
    chunk_overlap_tokens: int = 50
    hybrid_alpha: float = 0.6
    default_k: int = 8
    default_max_tokens: int = 4000
    include_patterns: List[str] = None
    exclude_patterns: List[str] = None
    watch: bool = False

    def __post_init__(self):
        if self.include_patterns is None:
            self.include_patterns = ["**/*.ts", "**/*.tsx", "**/*.py", "**/*.md", "**/*.json", "**/*.css", "**/*.yml", "**/*.yaml"]
        if self.exclude_patterns is None:
            self.exclude_patterns = ["**/node_modules/**", "**/dist/**", "**/build/**", "**/.next/**", "**/*.lock", "**/*.min.*"]

@dataclass
class FileHash:
    path: str
    sha256: str
    mtime: float
    size: int