# Local RAG per Project Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local, per-project RAG system with CLI (`rag-index`, `rag-query`, `rag-status`) and OpenCode skill, using sqlite-vec for vector storage and ONNX embeddings.

**Architecture:** Python package in `src/rag/` with CLI entrypoints. Indexes code/docs into `.rag/index.sqlite` (sqlite-vec) + BM25 pickle. Hybrid search (α=0.6). Tree-sitter chunking for TS/Python. OpenCode skill wraps `rag-query` as a tool.

**Tech Stack:** Python 3.11+, sentence-transformers (ONNX), sqlite-vec, rank-bm25, tiktoken, tree-sitter, typer, pyyaml.

**Spec:** `docs/superpowers/specs/2026-10-25-local-rag-per-project-design.md`

## Global Constraints

- Single-file index: `.rag/index.sqlite` (gitignored)
- Embedding model: `all-MiniLM-L6-v2` (384 dims, ~90MB, MIT)
- Chunking: Tree-sitter AST-aware (50-500 lines, 50 overlap), fallback recursive
- Hybrid search: α=0.6 (vector) + 0.4 (BM25), optional reranker
- Token budget: tiktoken cl100k_base, default 4000 tokens
- Config: `.rag/config.json` (per-project, versioned)
- Incremental indexing via SHA256 file hashes
- Zero external services at runtime

## Review Focus

1. **Binary model file missing/corrupt** — embedder must fail gracefully with actionable error (download URL, expected path)
2. **sqlite-vec extension not loadable** — CLI must detect and guide: "install sqlite-vec Python package, ensure SQLite ≥3.45"
3. **Tree-sitter grammars unavailable** — chunker must fall back to recursive splitter without crashing
4. **Index corruption / schema mismatch** — `rag-index --rebuild` must recover; version in `meta` table
5. **Token budget exceeded silently** — query must return exact token count and truncation notice

---

### Task 1: Project Scaffold & Dependencies

**Files:**
- Create: `requirements-rag.txt`
- Create: `pyproject.toml` (optional, for uv/pip)
- Create: `src/rag/__init__.py`
- Create: `src/rag/models.py`
- Create: `.gitignore` additions (handled by init)

**Interfaces:**
- Produces: `requirements-rag.txt` (deps list), `models.py` (dataclasses: `Chunk`, `SearchResult`, `IndexConfig`, `FileHash`)

- [ ] **Step 1: Write requirements-rag.txt**

```text
sentence-transformers==3.0.1
onnxruntime==1.18.0
sqlite-vec==0.1.6
rank-bm25==0.2.2
tiktoken==0.7.0
typer==0.12.3
tree-sitter==0.22.0
tree-sitter-typescript==0.21.0
tree-sitter-python==0.21.0
pyyaml==6.0.1
watchdog==3.0.0
```

- [ ] **Step 2: Write pyproject.toml (optional)**

```toml
[project]
name = "local-rag"
version = "0.1.0"
requires-python = ">=3.11"
dependencies = [
  "sentence-transformers==3.0.1",
  "onnxruntime==1.18.0",
  "sqlite-vec==0.1.6",
  "rank-bm25==0.2.2",
  "tiktoken==0.7.0",
  "typer==0.12.3",
  "tree-sitter==0.22.0",
  "tree-sitter-typescript==0.21.0",
  "tree-sitter-python==0.21.0",
  "pyyaml==6.0.1",
  "watchdog==3.0.0",
]
[build-system]
requires = ["setuptools>=68"]
build-backend = "setuptools.build_meta"
```

- [ ] **Step 3: Write src/rag/models.py**

```python
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
```

- [ ] **Step 4: Write src/rag/__init__.py**

```python
from .models import Chunk, SearchResult, IndexConfig, FileHash

__all__ = ["Chunk", "SearchResult", "IndexConfig", "FileHash"]
```

- [ ] **Step 5: Verify imports work**

Run: `cd /project && python -c "from src.rag.models import Chunk, SearchResult, IndexConfig, FileHash; print('OK')"`

- [ ] **Step 6: Commit**

```bash
git add requirements-rag.txt pyproject.toml src/rag/__init__.py src/rag/models.py
git commit -m "feat(rag): scaffold project structure and data models"
```

---

### Task 2: Configuration & Paths

**Files:**
- Create: `src/rag/config.py`
- Create: `src/rag/paths.py`

**Interfaces:**
- Consumes: `IndexConfig` from Task 1
- Produces: `load_config(root: Path) -> IndexConfig`, `save_config(config, root)`, `RagPaths` (dataclass with .rag dir, index, bm25, hashes, model)

- [ ] **Step 1: Write src/rag/paths.py**

```python
from dataclasses import dataclass
from pathlib import Path

@dataclass
class RagPaths:
    root: Path
    rag_dir: Path
    index_db: Path
    bm25_index: Path
    file_hashes: Path
    config_file: Path
    model_dir: Path

    @classmethod
    def from_root(cls, root: Path) -> "RagPaths":
        rag_dir = root / ".rag"
        return cls(
            root=root,
            rag_dir=rag_dir,
            index_db=rag_dir / "index.sqlite",
            bm25_index=rag_dir / "bm25_index.pkl",
            file_hashes=rag_dir / "file_hashes.json",
            config_file=rag_dir / "config.json",
            model_dir=rag_dir / "models",
        )

    def ensure_dirs(self):
        self.rag_dir.mkdir(parents=True, exist_ok=True)
        self.model_dir.mkdir(parents=True, exist_ok=True)
```

- [ ] **Step 2: Write src/rag/config.py**

```python
import json
from pathlib import Path
from .models import IndexConfig
from .paths import RagPaths

DEFAULT_CONFIG = IndexConfig()

def load_config(root: Path) -> IndexConfig:
    paths = RagPaths.from_root(root)
    if paths.config_file.exists():
        with open(paths.config_file) as f:
            data = json.load(f)
        # Merge with defaults for forward compat
        config = DEFAULT_CONFIG
        for key, value in data.items():
            if hasattr(config, key):
                setattr(config, key, value)
        return config
    return DEFAULT_CONFIG

def save_config(config: IndexConfig, root: Path):
    paths = RagPaths.from_root(root)
    paths.ensure_dirs()
    data = config.__dict__.copy()
    # Convert Path objects to strings if any
    with open(paths.config_file, "w") as f:
        json.dump(data, f, indent=2)

def ensure_gitignore(root: Path):
    gitignore = root / ".gitignore"
    entry = ".rag/"
    if gitignore.exists():
        content = gitignore.read_text()
        if entry not in content:
            with open(gitignore, "a") as f:
                f.write(f"\n{entry}\n")
    else:
        gitignore.write_text(f"{entry}\n")
```

- [ ] **Step 3: Write test**

```python
# tests/test_config.py
import tempfile
from pathlib import Path
from src.rag.config import load_config, save_config, DEFAULT_CONFIG
from src.rag.models import IndexConfig

def test_load_default_config():
    with tempfile.TemporaryDirectory() as tmp:
        config = load_config(Path(tmp))
        assert config.embedding_model == "all-MiniLM-L6-v2"
        assert config.hybrid_alpha == 0.6

def test_save_and_load_config():
    with tempfile.TemporaryDirectory() as tmp:
        root = Path(tmp)
        custom = IndexConfig(hybrid_alpha=0.7, default_k=10)
        save_config(custom, root)
        loaded = load_config(root)
        assert loaded.hybrid_alpha == 0.7
        assert loaded.default_k == 10
```

- [ ] **Step 4: Run test**

Run: `pytest tests/test_config.py -v`

- [ ] **Step 5: Commit**

```bash
git add src/rag/config.py src/rag/paths.py tests/test_config.py
git commit -m "feat(rag): config loading/saving and paths"
```

---

### Task 3: Embedder (ONNX Runtime)

**Files:**
- Create: `src/rag/embedder.py`
- Create: `src/rag/model_downloader.py`

**Interfaces:**
- Consumes: `IndexConfig.embedding_model`, `IndexConfig.embedding_dim`, `RagPaths.model_dir`
- Produces: `Embedder` class with `embed(texts: List[str]) -> np.ndarray[float32, (N, 384)]`, `embed_one(text: str) -> np.ndarray[float32, (384,)]`

- [ ] **Step 1: Write src/rag/model_downloader.py**

```python
import urllib.request
import hashlib
from pathlib import Path
from typing import Optional

MODEL_URLS = {
    "all-MiniLM-L6-v2": {
        "onnx": "https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2/resolve/main/onnx/model.onnx",
        "tokenizer": "https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2/resolve/main/tokenizer.json",
        "config": "https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2/resolve/main/config.json",
    }
}

EXPECTED_SIZES = {
    "all-MiniLM-L6-v2": {"onnx": 90_000_000},  # ~90MB
}

def download_model(model_name: str, dest_dir: Path, force: bool = False) -> Path:
    """Download ONNX model and tokenizer. Returns model_dir."""
    if model_name not in MODEL_URLS:
        raise ValueError(f"Unknown model: {model_name}")
    
    model_dir = dest_dir / model_name
    model_dir.mkdir(parents=True, exist_ok=True)
    
    urls = MODEL_URLS[model_name]
    for name, url in urls.items():
        dest = model_dir / f"{name}.json" if name != "onnx" else model_dir / "model.onnx"
        if dest.exists() and not force:
            continue
        print(f"Downloading {name}...")
        urllib.request.urlretrieve(url, dest)
        # Verify size
        if name in EXPECTED_SIZES.get(model_name, {}):
            actual = dest.stat().st_size
            expected = EXPECTED_SIZES[model_name][name]
            if abs(actual - expected) > expected * 0.1:
                raise RuntimeError(f"Download size mismatch for {name}: got {actual}, expected ~{expected}")
    return model_dir

def get_model_path(model_name: str, model_dir: Path) -> Path:
    path = model_dir / model_name / "model.onnx"
    if not path.exists():
        raise FileNotFoundError(
            f"Model not found at {path}. Run 'rag-index --init' to download."
        )
    return path
```

- [ ] **Step 2: Write src/rag/embedder.py**

```python
import numpy as np
import onnxruntime as ort
from tokenizers import Tokenizer
from pathlib import Path
from typing import List
from .model_downloader import download_model, get_model_path
from .paths import RagPaths
from .models import IndexConfig

class Embedder:
    def __init__(self, config: IndexConfig, paths: RagPaths):
        self.config = config
        self.paths = paths
        self._session: ort.InferenceSession = None
        self._tokenizer: Tokenizer = None
        self._dim = config.embedding_dim
    
    def _load(self):
        if self._session is not None:
            return
        model_path = get_model_path(self.config.embedding_model, self.paths.model_dir)
        tokenizer_path = model_path.parent / "tokenizer.json"
        
        self._session = ort.InferenceSession(
            str(model_path),
            providers=["CPUExecutionProvider"]
        )
        self._tokenizer = Tokenizer.from_file(str(tokenizer_path))
        self._tokenizer.enable_truncation(max_length=512)
        self._tokenizer.enable_padding(pad_id=0, pad_token="[PAD]", length=512)
    
    def embed(self, texts: List[str]) -> np.ndarray:
        """Return (N, 384) float32 array."""
        self._load()
        if not texts:
            return np.zeros((0, self._dim), dtype=np.float32)
        
        # Tokenize
        encodings = [self._tokenizer.encode(t) for t in texts]
        input_ids = np.array([e.ids for e in encodings], dtype=np.int64)
        attention_mask = np.array([e.attention_mask for e in encodings], dtype=np.int64)
        
        # Run ONNX
        outputs = self._session.run(
            None,
            {"input_ids": input_ids, "attention_mask": attention_mask}
        )
        # Mean pooling
        token_embeddings = outputs[0]  # (N, seq_len, 384)
        mask = attention_mask[:, :, None]  # (N, seq_len, 1)
        summed = np.sum(token_embeddings * mask, axis=1)
        counts = np.clip(np.sum(mask, axis=1), a_min=1, a_max=None)
        embeddings = summed / counts
        # Normalize
        norms = np.linalg.norm(embeddings, axis=1, keepdims=True)
        embeddings = embeddings / np.clip(norms, a_min=1e-12, a_max=None)
        return embeddings.astype(np.float32)
    
    def embed_one(self, text: str) -> np.ndarray:
        return self.embed([text])[0]
    
    @property
    def dim(self) -> int:
        return self._dim

def ensure_model(config: IndexConfig, paths: RagPaths) -> Path:
    """Download model if missing. Returns model_dir."""
    model_dir = paths.model_dir / config.embedding_model
    if not (model_dir / "model.onnx").exists():
        print(f"Downloading embedding model: {config.embedding_model} (~90MB)...")
        download_model(config.embedding_model, paths.model_dir)
    return model_dir
```

- [ ] **Step 3: Write test (requires model download — mark as integration)**

```python
# tests/test_embedder.py
import pytest
import numpy as np
from src.rag.embedder import Embedder, ensure_model
from src.rag.models import IndexConfig
from src.rag.paths import RagPaths

@pytest.mark.integration
def test_embedder_loads_and_embeds(tmp_path):
    config = IndexConfig()
    paths = RagPaths.from_root(tmp_path)
    paths.ensure_dirs()
    
    # This will download model on first run
    ensure_model(config, paths)
    embedder = Embedder(config, paths)
    
    vec = embedder.embed_one("hello world")
    assert vec.shape == (384,)
    assert vec.dtype == np.float32
    # Normalized
    assert abs(np.linalg.norm(vec) - 1.0) < 1e-5
    
    batch = embedder.embed(["a", "b", "c"])
    assert batch.shape == (3, 384)
```

- [ ] **Step 4: Run integration test (manual first run)**

Run: `pytest tests/test_embedder.py -v -m integration`

- [ ] **Step 5: Commit**

```bash
git add src/rag/embedder.py src/rag/model_downloader.py tests/test_embedder.py
git commit -m "feat(rag): ONNX embedder with model downloader"
```

---

### Task 4: Chunker (Tree-sitter + Fallback)

**Files:**
- Create: `src/rag/chunker.py`

**Interfaces:**
- Consumes: file content (str), file path (for language detection), `IndexConfig.chunk_max_tokens`, `chunk_overlap_tokens`
- Produces: `List[Chunk]` (without embeddings), each with `content`, `tokens`, `language`, `start_line`, `end_line`

- [ ] **Step 1: Write src/rag/chunker.py**

```python
import tiktoken
from pathlib import Path
from typing import List, Optional
from .models import Chunk, IndexConfig

# Tree-sitter imports (optional)
try:
    from tree_sitter import Language, Parser
    TREE_SITTER_AVAILABLE = True
except ImportError:
    TREE_SITTER_AVAILABLE = False

# Language mapping
LANG_MAP = {
    ".ts": "typescript",
    ".tsx": "tsx",
    ".py": "python",
    ".rs": "rust",
    ".go": "go",
    ".js": "javascript",
    ".jsx": "jsx",
}

# Tree-sitter language objects (lazy loaded)
_TS_LANGUAGES = {}
_TS_PARSERS = {}

def get_tree_sitter_language(ext: str):
    if not TREE_SITTER_AVAILABLE:
        return None
    lang_name = LANG_MAP.get(ext)
    if not lang_name:
        return None
    if lang_name not in _TS_LANGUAGES:
        try:
            if lang_name == "typescript":
                import tree_sitter_typescript as tst
                _TS_LANGUAGES[lang_name] = Language(tst.language_typescript())
            elif lang_name == "tsx":
                import tree_sitter_typescript as tst
                _TS_LANGUAGES[lang_name] = Language(tst.language_tsx())
            elif lang_name == "python":
                import tree_sitter_python as tsp
                _TS_LANGUAGES[lang_name] = Language(tsp.language())
            # Add more as needed
        except Exception:
            return None
    return _TS_LANGUAGES.get(lang_name)

def get_parser(ext: str):
    lang = get_tree_sitter_language(ext)
    if not lang:
        return None
    if lang not in _TS_PARSERS:
        parser = Parser()
        parser.set_language(lang)
        _TS_PARSERS[lang] = parser
    return _TS_PARSERS[lang]

ENCODER = tiktoken.get_encoding("cl100k_base")

def count_tokens(text: str) -> int:
    return len(ENCODER.encode(text))

def chunk_by_tokens(text: str, max_tokens: int, overlap_tokens: int) -> List[str]:
    """Fallback: recursive character splitting with token awareness."""
    tokens = ENCODER.encode(text)
    if len(tokens) <= max_tokens:
        return [text]
    
    chunks = []
    start = 0
    while start < len(tokens):
        end = min(start + max_tokens, len(tokens))
        chunk_tokens = tokens[start:end]
        chunks.append(ENCODER.decode(chunk_tokens))
        if end == len(tokens):
            break
        start = end - overlap_tokens
    return chunks

def extract_nodes(source: bytes, ext: str) -> List[tuple]:
    """Extract (start_line, end_line, text) for function/class nodes."""
    parser = get_parser(ext)
    if not parser:
        return []
    
    tree = parser.parse(source)
    root = tree.root_node
    
    # Node types to capture per language
    capture_types = {
        ".ts": ["function_declaration", "class_declaration", "interface_declaration", "type_alias_declaration", "enum_declaration"],
        ".tsx": ["function_declaration", "class_declaration", "interface_declaration", "type_alias_declaration", "enum_declaration"],
        ".py": ["function_definition", "class_definition"],
    }.get(ext, [])
    
    results = []
    def walk(node):
        if node.type in capture_types:
            start_line = node.start_point[0] + 1
            end_line = node.end_point[0] + 1
            text = source[node.start_byte:node.end_byte].decode("utf-8", errors="replace")
            results.append((start_line, end_line, text))
        for child in node.children:
            walk(child)
    walk(root)
    return results

def chunk_file(file_path: Path, content: str, config: IndexConfig) -> List[Chunk]:
    ext = file_path.suffix.lower()
    language = LANG_MAP.get(ext)
    
    # Try AST chunking first
    nodes = extract_nodes(content.encode("utf-8"), ext)
    
    if nodes:
        chunks = []
        for i, (start_line, end_line, text) in enumerate(nodes):
            tokens = count_tokens(text)
            if tokens > config.chunk_max_tokens:
                # Split large nodes
                sub_chunks = chunk_by_tokens(text, config.chunk_max_tokens, config.chunk_overlap_tokens)
                for j, sub in enumerate(sub_chunks):
                    chunks.append(Chunk(
                        id=None,
                        file_path=str(file_path),
                        chunk_index=len(chunks),
                        content=sub,
                        tokens=count_tokens(sub),
                        language=language,
                        start_line=start_line,
                        end_line=end_line,
                    ))
            else:
                chunks.append(Chunk(
                    id=None,
                    file_path=str(file_path),
                    chunk_index=len(chunks),
                    content=text,
                    tokens=tokens,
                    language=language,
                    start_line=start_line,
                    end_line=end_line,
                ))
        return chunks
    
    # Fallback: token-based chunking
    text_chunks = chunk_by_tokens(content, config.chunk_max_tokens, config.chunk_overlap_tokens)
    chunks = []
    line_offset = 0
    for i, text in enumerate(text_chunks):
        lines = text.count("\n") + 1
        chunks.append(Chunk(
            id=None,
            file_path=str(file_path),
            chunk_index=i,
            content=text,
            tokens=count_tokens(text),
            language=language,
            start_line=line_offset + 1,
            end_line=line_offset + lines,
        ))
        line_offset += lines
    return chunks
```

- [ ] **Step 2: Write test**

```python
# tests/test_chunker.py
import tempfile
from pathlib import Path
from src.rag.chunker import chunk_file, count_tokens
from src.rag.models import IndexConfig

def test_token_counting():
    assert count_tokens("hello world") == 2
    assert count_tokens("") == 0

def test_chunk_python_function():
    code = '''
def hello(name: str) -> str:
    """Say hello."""
    return f"Hello, {name}!"

class Greeter:
    def greet(self, name):
        return hello(name)
'''
    with tempfile.NamedTemporaryFile(suffix=".py", mode="w", delete=False) as f:
        f.write(code)
        f.flush()
        config = IndexConfig(chunk_max_tokens=100, chunk_overlap_tokens=10)
        chunks = chunk_file(Path(f.name), code, config)
        
        # Should find function_definition and class_definition
        assert len(chunks) >= 2
        assert any("def hello" in c.content for c in chunks)
        assert any("class Greeter" in c.content for c in chunks)
        for c in chunks:
            assert c.tokens <= config.chunk_max_tokens
            assert c.language == "python"

def test_chunk_typescript():
    code = '''
export function add(a: number, b: number): number {
    return a + b;
}

export interface User {
    name: string;
    id: number;
}

export class Calculator {
    multiply(x: number, y: number): number {
        return x * y;
    }
}
'''
    with tempfile.NamedTemporaryFile(suffix=".ts", mode="w", delete=False) as f:
        f.write(code)
        f.flush()
        config = IndexConfig(chunk_max_tokens=100, chunk_overlap_tokens=10)
        chunks = chunk_file(Path(f.name), code, config)
        
        assert len(chunks) >= 3
        assert any("function add" in c.content for c in chunks)
        assert any("interface User" in c.content for c in chunks)
        assert any("class Calculator" in c.content for c in chunks)

def test_fallback_chunking():
    # File with no recognized structures
    code = "x = 1\n" * 200  # ~200 lines, no functions
    with tempfile.NamedTemporaryFile(suffix=".txt", mode="w", delete=False) as f:
        f.write(code)
        f.flush()
        config = IndexConfig(chunk_max_tokens=100, chunk_overlap_tokens=10)
        chunks = chunk_file(Path(f.name), code, config)
        
        assert len(chunks) > 1
        for c in chunks:
            assert c.tokens <= config.chunk_max_tokens
```

- [ ] **Step 3: Run test**

Run: `pytest tests/test_chunker.py -v`

- [ ] **Step 4: Commit**

```bash
git add src/rag/chunker.py tests/test_chunker.py
git commit -m "feat(rag): AST-aware chunker with token-based fallback"
```

---

### Task 5: SQLite-Vec Index (Schema + CRUD)

**Files:**
- Create: `src/rag/indexer.py`

**Interfaces:**
- Consumes: `RagPaths`, `IndexConfig`, `Embedder`, `List[Chunk]`
- Produces: SQLite DB with `chunks` table + `vec_chunks` virtual table, `upsert_chunks(chunks)`, `delete_chunks(file_paths)`, `get_all_chunks() -> List[Chunk]`

- [ ] **Step 1: Write src/rag/indexer.py**

```python
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
            # Delete existing
            self.conn.execute(
                "DELETE FROM chunks WHERE file_path = ? AND chunk_index = ?",
                (chunk.file_path, chunk.chunk_index)
            )
            self.conn.execute(
                "DELETE FROM vec_chunks WHERE rowid = (SELECT id FROM chunks WHERE file_path = ? AND chunk_index = ?)",
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
```

- [ ] **Step 2: Write test**

```python
# tests/test_indexer.py
import tempfile
import numpy as np
from pathlib import Path
from src.rag.indexer import VectorIndex
from src.rag.models import IndexConfig, Chunk
from src.rag.paths import RagPaths
from src.rag.embedder import Embedder

@pytest.mark.integration
def test_indexer_crud(tmp_path):
    config = IndexConfig()
    paths = RagPaths.from_root(tmp_path)
    paths.ensure_dirs()
    
    # Need embedder (downloads model)
    from src.rag.embedder import ensure_model
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
```

- [ ] **Step 3: Run test**

Run: `pytest tests/test_indexer.py -v -m integration`

- [ ] **Step 4: Commit**

```bash
git add src/rag/indexer.py tests/test_indexer.py
git commit -m "feat(rag): sqlite-vec index with CRUD operations"
```

---

### Task 6: BM25 Index

**Files:**
- Create: `src/rag/bm25.py`

**Interfaces:**
- Consumes: `List[Chunk]`
- Produces: `BM25Index` with `build(chunks)`, `save(path)`, `load(path)`, `search(query: str, k: int) -> List[tuple(chunk_id, score)]`

- [ ] **Step 1: Write src/rag/bm25.py**

```python
import pickle
from pathlib import Path
from typing import List, Tuple, Optional
from rank_bm25 import BM25Okapi
from .models import Chunk
import tiktoken

ENCODER = tiktoken.get_encoding("cl100k_base")

def tokenize(text: str) -> List[str]:
    # Simple whitespace + punctuation split for BM25
    import re
    return re.findall(r'\b\w+\b', text.lower())

class BM25Index:
    def __init__(self):
        self.bm25: Optional[BM25Okapi] = None
        self.chunk_ids: List[int] = []  # maps index -> chunk.id
    
    def build(self, chunks: List[Chunk]):
        corpus = [tokenize(c.content) for c in chunks]
        self.bm25 = BM25Okapi(corpus)
        self.chunk_ids = [c.id for c in chunks]
    
    def search(self, query: str, k: int = 10) -> List[Tuple[int, float]]:
        if not self.bm25:
            return []
        scores = self.bm25.get_scores(tokenize(query))
        # Top-k indices
        top_indices = sorted(range(len(scores)), key=lambda i: scores[i], reverse=True)[:k]
        return [(self.chunk_ids[i], scores[i]) for i in top_indices if scores[i] > 0]
    
    def save(self, path: Path):
        data = {
            "bm25": self.bm25,
            "chunk_ids": self.chunk_ids,
        }
        with open(path, "wb") as f:
            pickle.dump(data, f)
    
    @classmethod
    def load(cls, path: Path) -> "BM25Index":
        if not path.exists():
            return cls()
        with open(path, "rb") as f:
            data = pickle.load(f)
        idx = cls()
        idx.bm25 = data["bm25"]
        idx.chunk_ids = data["chunk_ids"]
        return idx
```

- [ ] **Step 2: Write test**

```python
# tests/test_bm25.py
import tempfile
from pathlib import Path
from src.rag.bm25 import BM25Index
from src.rag.models import Chunk

def test_bm25_build_and_search():
    chunks = [
        Chunk(id=1, file_path="a.py", chunk_index=0, content="def authenticate_user(username, password): pass", tokens=10, language="python", start_line=1, end_line=1),
        Chunk(id=2, file_path="b.py", chunk_index=0, content="def calculate_total(price, tax): return price * (1 + tax)", tokens=12, language="python", start_line=1, end_line=1),
        Chunk(id=3, file_path="c.py", chunk_index=0, content="class User: pass", tokens=5, language="python", start_line=1, end_line=1),
    ]
    
    idx = BM25Index()
    idx.build(chunks)
    
    # Search for "authenticate"
    results = idx.search("authenticate", k=5)
    assert len(results) == 1
    assert results[0][0] == 1  # chunk id 1
    assert results[0][1] > 0
    
    # Search for "calculate"
    results = idx.search("calculate", k=5)
    assert len(results) == 1
    assert results[0][0] == 2

def test_bm25_save_load(tmp_path):
    chunks = [
        Chunk(id=1, file_path="a.py", chunk_index=0, content="hello world", tokens=2, language="python", start_line=1, end_line=1),
    ]
    idx = BM25Index()
    idx.build(chunks)
    
    save_path = tmp_path / "bm25.pkl"
    idx.save(save_path)
    
    loaded = BM25Index.load(save_path)
    results = loaded.search("hello", k=5)
    assert len(results) == 1
    assert results[0][0] == 1
```

- [ ] **Step 3: Run test**

Run: `pytest tests/test_bm25.py -v`

- [ ] **Step 4: Commit**

```bash
git add src/rag/bm25.py tests/test_bm25.py
git commit -m "feat(rag): BM25 keyword index with persistence"
```

---

### Task 7: File Hashing & Incremental Indexing

**Files:**
- Create: `src/rag/file_indexer.py`

**Interfaces:**
- Consumes: `RagPaths`, `IndexConfig`, `Embedder`, `VectorIndex`, `BM25Index`, `chunker.chunk_file`
- Produces: `FileIndexer` class with `scan() -> List[Path]`, `index_changed_files() -> stats`, `rebuild_all() -> stats`

- [ ] **Step 1: Write src/rag/file_indexer.py**

```python
import hashlib
import json
import os
import fnmatch
from pathlib import Path
from typing import List, Set, Dict, Tuple
from dataclasses import dataclass
from .models import IndexConfig, FileHash
from .paths import RagPaths
from .chunker import chunk_file
from .indexer import VectorIndex
from .bm25 import BM25Index
from .embedder import Embedder

@dataclass
class IndexStats:
    scanned: int = 0
    changed: int = 0
    added: int = 0
    removed: int = 0
    chunks: int = 0
    duration_sec: float = 0.0

class FileIndexer:
    def __init__(self, config: IndexConfig, paths: RagPaths, embedder: Embedder):
        self.config = config
        self.paths = paths
        self.embedder = embedder
        self.vector_index = VectorIndex(config, paths, embedder)
        self.bm25_index = BM25Index()
        self.file_hashes: Dict[str, FileHash] = {}
        self._load_hashes()
    
    def _load_hashes(self):
        if self.paths.file_hashes.exists():
            with open(self.paths.file_hashes) as f:
                data = json.load(f)
            for path, info in data.items():
                self.file_hashes[path] = FileHash(**info)
    
    def _save_hashes(self):
        data = {path: h.__dict__ for path, h in self.file_hashes.items()}
        with open(self.paths.file_hashes, "w") as f:
            json.dump(data, f)
    
    def _compute_hash(self, path: Path) -> FileHash:
        stat = path.stat()
        content = path.read_bytes()
        sha256 = hashlib.sha256(content).hexdigest()
        return FileHash(
            path=str(path),
            sha256=sha256,
            mtime=stat.st_mtime,
            size=stat.st_size,
        )
    
    def _match_patterns(self, path: Path) -> bool:
        rel = path.relative_to(self.paths.root)
        rel_str = str(rel).replace(os.sep, "/")
        
        # Check exclude first
        for pattern in self.config.exclude_patterns:
            if fnmatch.fnmatch(rel_str, pattern) or fnmatch.fnmatch(path.name, pattern):
                return False
        
        # Check include
        for pattern in self.config.include_patterns:
            if fnmatch.fnmatch(rel_str, pattern) or fnmatch.fnmatch(path.name, pattern):
                return True
        return False
    
    def scan(self) -> List[Path]:
        files = []
        for path in self.paths.root.rglob("*"):
            if path.is_file() and self._match_patterns(path):
                files.append(path)
        return files
    
    def index_changed_files(self) -> IndexStats:
        import time
        start = time.time()
        
        all_files = self.scan()
        stats = IndexStats(scanned=len(all_files))
        
        current_hashes: Dict[str, FileHash] = {}
        changed_files: List[Path] = []
        removed_files: Set[str] = set(self.file_hashes.keys())
        
        for path in all_files:
            rel = str(path.relative_to(self.paths.root)).replace(os.sep, "/")
            current_hash = self._compute_hash(path)
            current_hashes[rel] = current_hash
            removed_files.discard(rel)
            
            old = self.file_hashes.get(rel)
            if not old or old.sha256 != current_hash.sha256:
                changed_files.append(path)
        
        stats.changed = len(changed_files)
        stats.removed = len(removed_files)
        
        # Process changed files
        all_chunks = []
        with self.vector_index as idx:
            for path in changed_files:
                rel = str(path.relative_to(self.paths.root)).replace(os.sep, "/")
                content = path.read_text(encoding="utf-8", errors="replace")
                chunks = chunk_file(path, content, self.config)
                # Update file_path to relative for storage
                for c in chunks:
                    c.file_path = rel
                idx.upsert_chunks(chunks)
                all_chunks.extend(chunks)
                self.file_hashes[rel] = current_hashes[rel]
                stats.added += 1
            
            # Remove deleted
            if removed_files:
                idx.delete_chunks(list(removed_files))
                for rel in removed_files:
                    del self.file_hashes[rel]
            
            # Rebuild BM25 from all chunks in DB
            all_db_chunks = idx.get_all_chunks()
            self.bm25_index.build(all_db_chunks)
            self.bm25_index.save(self.paths.bm25_index)
        
        stats.chunks = len(all_db_chunks)
        self._save_hashes()
        stats.duration_sec = time.time() - start
        return stats
    
    def rebuild_all(self) -> IndexStats:
        # Clear everything
        self.file_hashes.clear()
        if self.paths.index_db.exists():
            self.paths.index_db.unlink()
        if self.paths.bm25_index.exists():
            self.paths.bm25_index.unlink()
        if self.paths.file_hashes.exists():
            self.paths.file_hashes.unlink()
        return self.index_changed_files()
```

- [ ] **Step 2: Write test**

```python
# tests/test_file_indexer.py
import tempfile
from pathlib import Path
from src.rag.file_indexer import FileIndexer
from src.rag.models import IndexConfig
from src.rag.paths import RagPaths
from src.rag.embedder import Embedder, ensure_model

@pytest.mark.integration
def test_incremental_indexing(tmp_path):
    config = IndexConfig()
    paths = RagPaths.from_root(tmp_path)
    paths.ensure_dirs()
    ensure_model(config, paths)
    embedder = Embedder(config, paths)
    
    # Create test files
    (tmp_path / "a.py").write_text("def foo(): pass\n")
    (tmp_path / "b.py").write_text("def bar(): pass\n")
    
    indexer = FileIndexer(config, paths, embedder)
    
    # First index
    stats1 = indexer.index_changed_files()
    assert stats1.scanned == 2
    assert stats1.changed == 2
    assert stats1.added == 2
    assert stats1.chunks == 2
    
    # Second index (no changes)
    stats2 = indexer.index_changed_files()
    assert stats2.scanned == 2
    assert stats2.changed == 0
    assert stats2.added == 0
    
    # Modify one file
    (tmp_path / "a.py").write_text("def foo():\n    return 42\n")
    stats3 = indexer.index_changed_files()
    assert stats3.changed == 1
    assert stats3.added == 1
    
    # Delete a file
    (tmp_path / "b.py").unlink()
    stats4 = indexer.index_changed_files()
    assert stats4.changed == 1
    assert stats4.removed == 1

def test_rebuild_all(tmp_path):
    config = IndexConfig()
    paths = RagPaths.from_root(tmp_path)
    paths.ensure_dirs()
    ensure_model(config, paths)
    embedder = Embedder(config, paths)
    
    (tmp_path / "a.py").write_text("def foo(): pass\n")
    indexer = FileIndexer(config, paths, embedder)
    indexer.index_changed_files()
    
    stats = indexer.rebuild_all()
    assert stats.changed == 1
    assert stats.added == 1
```

- [ ] **Step 3: Run test**

Run: `pytest tests/test_file_indexer.py -v -m integration`

- [ ] **Step 4: Commit**

```bash
git add src/rag/file_indexer.py tests/test_file_indexer.py
git commit -m "feat(rag): incremental file indexer with hash tracking"
```

---

### Task 8: Query Engine (Hybrid Search + Token Budget)

**Files:**
- Create: `src/rag/query.py`

**Interfaces:**
- Consumes: `VectorIndex`, `BM25Index`, `Embedder`, `IndexConfig`
- Produces: `QueryEngine` with `search(query: str, k: int, max_tokens: int) -> List[SearchResult]`, `format_results(results, max_tokens) -> str`

- [ ] **Step 1: Write src/rag/query.py**

```python
import time
import numpy as np
from typing import List, Dict
from .models import SearchResult, Chunk, IndexConfig
from .indexer import VectorIndex
from .bm25 import BM25Index
from .embedder import Embedder

class QueryEngine:
    def __init__(self, config: IndexConfig, paths, embedder: Embedder):
        self.config = config
        self.paths = paths
        self.embedder = embedder
        self.vector_index = VectorIndex(config, paths, embedder)
        self.bm25_index = BM25Index.load(paths.bm25_index)
    
    def search(self, query: str, k: int = None, max_tokens: int = None) -> List[SearchResult]:
        k = k or self.config.default_k
        max_tokens = max_tokens or self.config.default_max_tokens
        
        timings = {}
        
        # Vector search
        t0 = time.perf_counter()
        query_vec = self.embedder.embed_one(query)
        with self.vector_index as idx:
            # sqlite-vec KNN
            cur = idx.conn.execute(
                """
                SELECT c.id, c.file_path, c.chunk_index, c.content, c.tokens, c.language, 
                       c.start_line, c.end_line, c.embedding,
                       vec_distance_cosine(vec_chunks.embedding, ?) as dist
                FROM chunks c
                JOIN vec_chunks ON c.id = vec_chunks.rowid
                ORDER BY dist ASC
                LIMIT ?
                """,
                (query_vec.tobytes(), k * 3)  # Get more for hybrid fusion
            )
            vector_results = []
            for row in cur.fetchall():
                chunk = Chunk(
                    id=row[0], file_path=row[1], chunk_index=row[2], content=row[3],
                    tokens=row[4], language=row[5], start_line=row[6], end_line=row[7],
                    embedding=row[8]
                )
                # Convert distance to similarity (cosine: 0=identical, 2=opposite)
                vector_score = 1.0 - (row[9] / 2.0)
                vector_results.append((chunk.id, chunk, vector_score))
        timings["vector_ms"] = (time.perf_counter() - t0) * 1000
        
        # BM25 search
        t0 = time.perf_counter()
        bm25_results = self.bm25_index.search(query, k * 3)
        timings["bm25_ms"] = (time.perf_counter() - t0) * 1000
        
        # Normalize BM25 scores (rough 0-1)
        bm25_max = max((s for _, s in bm25_results), default=1.0)
        bm25_normalized = {cid: s / bm25_max for cid, s in bm25_results}
        
        # Hybrid fusion
        t0 = time.perf_counter()
        alpha = self.config.hybrid_alpha
        combined: Dict[int, SearchResult] = {}
        
        for cid, chunk, vscore in vector_results:
            bscore = bm25_normalized.get(cid, 0.0)
            hscore = alpha * vscore + (1 - alpha) * bscore
            combined[cid] = SearchResult(chunk=chunk, score=hscore, bm25_score=bscore, vector_score=vscore)
        
        # Add BM25-only results
        for cid, bscore in bm25_results:
            if cid not in combined:
                # Fetch chunk from vector index
                with self.vector_index as idx:
                    cur = idx.conn.execute(
                        "SELECT id, file_path, chunk_index, content, tokens, language, start_line, end_line, embedding FROM chunks WHERE id = ?",
                        (cid,)
                    )
                    row = cur.fetchone()
                    if row:
                        chunk = Chunk(id=row[0], file_path=row[1], chunk_index=row[2], content=row[3],
                                     tokens=row[4], language=row[5], start_line=row[6], end_line=row[7], embedding=row[8])
                        vscore = 0.0
                        hscore = (1 - alpha) * (bscore / bm25_max)
                        combined[cid] = SearchResult(chunk=chunk, score=hscore, bm25_score=bscore/bm25_max, vector_score=vscore)
        
        # Sort by hybrid score
        results = sorted(combined.values(), key=lambda r: r.score, reverse=True)
        timings["fusion_ms"] = (time.perf_counter() - t0) * 1000
        
        # Token budget
        t0 = time.perf_counter()
        final_results = []
        total_tokens = 0
        for r in results:
            if total_tokens + r.chunk.tokens > max_tokens:
                break
            final_results.append(r)
            total_tokens += r.chunk.tokens
        timings["budget_ms"] = (time.perf_counter() - t0) * 1000
        
        return final_results, timings, total_tokens
    
    def format_results(self, results: List[SearchResult], timings: dict, total_tokens: int, max_tokens: int) -> str:
        lines = []
        lines.append(f"Search: {timings.get('vector_ms',0)+timings.get('bm25_ms',0)+timings.get('fusion_ms',0):.0f}ms "
                    f"| Vector: {timings.get('vector_ms',0):.0f}ms | BM25: {timings.get('bm25_ms',0):.0f}ms "
                    f"| Fusion: {timings.get('fusion_ms',0):.0f}ms")
        lines.append(f"Tokens: {total_tokens} (budget: {max_tokens})")
        lines.append("")
        
        for i, r in enumerate(results, 1):
            lines.append(f"--- Result {i} (score: {r.score:.2f}, vec: {r.vector_score:.2f}, bm25: {r.bm25_score:.2f}) ---")
            lines.append(f"{r.chunk.file_path}:{r.chunk.start_line}-{r.chunk.end_line}")
            # Show first 200 chars
            preview = r.chunk.content[:200]
            if len(r.chunk.content) > 200:
                preview += "..."
            lines.append(f"```{r.chunk.language or ''}")
            lines.append(preview)
            lines.append("```")
            lines.append("")
        
        return "\n".join(lines)
```

- [ ] **Step 2: Write test**

```python
# tests/test_query.py
import tempfile
from pathlib import Path
from src.rag.query import QueryEngine
from src.rag.models import IndexConfig
from src.rag.paths import RagPaths
from src.rag.embedder import Embedder, ensure_model
from src.rag.file_indexer import FileIndexer

@pytest.mark.integration
def test_query_engine(tmp_path):
    config = IndexConfig()
    paths = RagPaths.from_root(tmp_path)
    paths.ensure_dirs()
    ensure_model(config, paths)
    embedder = Embedder(config, paths)
    
    # Index some files
    (tmp_path / "auth.py").write_text("""
def authenticate(username: str, password: str) -> bool:
    '''Verify user credentials.'''
    return check_password(username, password)

def check_password(user, pwd):
    return hash(pwd) == get_stored_hash(user)
""")
    (tmp_path / "utils.py").write_text("""
def calculate_total(price: float, tax: float) -> float:
    return price * (1 + tax)

def format_currency(amount: float) -> str:
    return f"${amount:.2f}"
""")
    
    indexer = FileIndexer(config, paths, embedder)
    indexer.index_changed_files()
    
    # Query
    engine = QueryEngine(config, paths, embedder)
    results, timings, tokens = engine.search("authenticate user", k=5, max_tokens=1000)
    
    assert len(results) > 0
    assert results[0].chunk.file_path == "auth.py"
    assert "authenticate" in results[0].chunk.content
    assert tokens <= 1000
    
    # Format
    formatted = engine.format_results(results, timings, tokens, 1000)
    assert "auth.py" in formatted
    assert "authenticate" in formatted
```

- [ ] **Step 3: Run test**

Run: `pytest tests/test_query.py -v -m integration`

- [ ] **Step 4: Commit**

```bash
git add src/rag/query.py tests/test_query.py
git commit -m "feat(rag): hybrid query engine with token budgeting"
```

---

### Task 9: CLI Commands

**Files:**
- Create: `src/rag/cli.py`
- Modify: `pyproject.toml` (add entry points)

**Interfaces:**
- Consumes: All previous modules
- Produces: `rag-index`, `rag-query`, `rag-status` console scripts

- [ ] **Step 1: Update pyproject.toml**

```toml
[project.scripts]
rag-index = "src.rag.cli:index_app"
rag-query = "src.rag.cli:query_app"
rag-status = "src.rag.cli:status_app"
rag-init = "src.rag.cli:init_app"
```

- [ ] **Step 2: Write src/rag/cli.py**

```python
import typer
import time
from pathlib import Path
from typing import Optional, List
from rich.console import Console
from rich.table import Table

from .models import IndexConfig
from .paths import RagPaths
from .config import load_config, save_config, ensure_gitignore
from .embedder import Embedder, ensure_model
from .file_indexer import FileIndexer
from .query import QueryEngine
from .indexer import VectorIndex

console = Console()
index_app = typer.Typer(help="Build/update the RAG index")
query_app = typer.Typer(help="Query the RAG index")
status_app = typer.Typer(help="Show index status")
init_app = typer.Typer(help="Initialize RAG in this project")

def get_project_root() -> Path:
    # Walk up to find .git or pyproject.toml
    cwd = Path.cwd()
    for p in [cwd] + list(cwd.parents):
        if (p / ".git").exists() or (p / "pyproject.toml").exists() or (p / "package.json").exists():
            return p
    return cwd

@index_app.callback(invoke_without_command=True)
def index_cmd(
    ctx: typer.Context,
    rebuild: bool = typer.Option(False, "--rebuild", "-r", help="Full rebuild"),
    watch: bool = typer.Option(False, "--watch", "-w", help="Watch for changes"),
    verbose: bool = typer.Option(False, "--verbose", "-v"),
    include: List[str] = typer.Option(None, "--include", help="Glob patterns to include"),
    exclude: List[str] = typer.Option(None, "--exclude", help="Glob patterns to exclude"),
):
    """Index the project (incremental by default)."""
    root = get_project_root()
    config = load_config(root)
    if include:
        config.include_patterns = include
    if exclude:
        config.exclude_patterns = exclude
    if watch:
        config.watch = True
    
    paths = RagPaths.from_root(root)
    ensure_model(config, paths)
    embedder = Embedder(config, paths)
    indexer = FileIndexer(config, paths, embedder)
    
    if rebuild:
        console.print("[yellow]Full rebuild...[/yellow]")
        stats = indexer.rebuild_all()
    else:
        stats = indexer.index_changed_files()
    
    if watch:
        console.print("[green]Watching for changes...[/green]")
        # TODO: implement watch mode with watchdog
        import signal
        signal.signal(signal.SIGINT, lambda *_: exit(0))
        while True:
            time.sleep(2)
            stats = indexer.index_changed_files()
            if stats.changed > 0:
                console.print(f"[cyan]Reindexed {stats.changed} files[/cyan]")
    else:
        _print_stats(stats, verbose)

@query_app.command()
def query_cmd(
    question: str = typer.Argument(..., help="Natural language question"),
    k: int = typer.Option(8, "--k", "-k", help="Number of results"),
    max_tokens: int = typer.Option(4000, "--tokens", "-t", help="Max context tokens"),
    format: str = typer.Option("human", "--format", "-f", help="Output format: human|json"),
    verbose: bool = typer.Option(False, "--verbose", "-v"),
):
    """Query the RAG index."""
    root = get_project_root()
    config = load_config(root)
    paths = RagPaths.from_root(root)
    
    if not paths.index_db.exists():
        console.print("[red]Index not found. Run 'rag-index' first.[/red]")
        raise typer.Exit(1)
    
    embedder = Embedder(config, paths)
    engine = QueryEngine(config, paths, embedder)
    
    t0 = time.perf_counter()
    results, timings, tokens = engine.search(question, k=k, max_tokens=max_tokens)
    total_ms = (time.perf_counter() - t0) * 1000
    
    if format == "json":
        import json
        out = {
            "question": question,
            "results": [
                {
                    "file": r.chunk.file_path,
                    "lines": f"{r.chunk.start_line}-{r.chunk.end_line}",
                    "score": r.score,
                    "vector_score": r.vector_score,
                    "bm25_score": r.bm25_score,
                    "tokens": r.chunk.tokens,
                    "preview": r.chunk.content[:200],
                }
                for r in results
            ],
            "timings_ms": {**timings, "total": total_ms},
            "tokens_used": tokens,
            "token_budget": max_tokens,
        }
        console.print_json(json.dumps(out))
    else:
        console.print(f"[bold]Query:[/bold] {question}")
        console.print(engine.format_results(results, timings, tokens, max_tokens))

@status_app.command()
def status_cmd():
    """Show index status."""
    root = get_project_root()
    config = load_config(root)
    paths = RagPaths.from_root(root)
    
    if not paths.index_db.exists():
        console.print("[yellow]No index found. Run 'rag-index' to create one.[/yellow]")
        return
    
    embedder = Embedder(config, paths)
    with VectorIndex(config, paths, embedder) as idx:
        chunk_count = idx.get_chunk_count()
        version = idx.get_index_version()
    
    size_mb = paths.index_db.stat().st_size / (1024 * 1024)
    
    table = Table(show_header=False)
    table.add_row("Project", root.name)
    table.add_row("Index", f"{paths.index_db} ({size_mb:.1f} MB)")
    table.add_row("Chunks", str(chunk_count))
    table.add_row("Embedding model", f"{config.embedding_model} ({config.embedding_dim} dims)")
    table.add_row("Index version", str(version))
    table.add_row("Config", str(paths.config_file))
    
    console.print(table)

@init_app.command()
def init_cmd(
    force: bool = typer.Option(False, "--force", help="Reinitialize even if exists"),
):
    """Initialize .rag directory and download model."""
    root = get_project_root()
    paths = RagPaths.from_root(root)
    
    if paths.rag_dir.exists() and not force:
        console.print("[yellow].rag already exists. Use --force to reinitialize.[/yellow]")
        return
    
    paths.ensure_dirs()
    config = IndexConfig()
    save_config(config, root)
    ensure_gitignore(root)
    
    console.print(f"[green]Created {paths.rag_dir}[/green]")
    console.print("Downloading embedding model...")
    ensure_model(config, paths)
    console.print("[green]Model downloaded. Run 'rag-index' to build index.[/green]")
```

- [ ] **Step 3: Write test (CLI integration)**

```python
# tests/test_cli.py
import subprocess
import tempfile
from pathlib import Path

def run_cli(cmd, cwd):
    return subprocess.run(cmd, cwd=cwd, capture_output=True, text=True)

@pytest.mark.integration
def test_rag_init_and_index(tmp_path):
    # Create a minimal project
    (tmp_path / "pyproject.toml").write_text("[project]\nname = 'test'\n")
    (tmp_path / "hello.py").write_text("def greet(name): return f'Hello {name}'\n")
    
    # Init
    result = run_cli(["python", "-m", "src.rag.cli", "init"], tmp_path)
    assert result.returncode == 0
    assert (tmp_path / ".rag").exists()
    assert (tmp_path / ".rag" / "config.json").exists()
    
    # Index
    result = run_cli(["python", "-m", "src.rag.cli", "index"], tmp_path)
    assert result.returncode == 0
    assert "Indexing" in result.stdout or "Scanned" in result.stdout
    
    # Status
    result = run_cli(["python", "-m", "src.rag.cli", "status"], tmp_path)
    assert result.returncode == 0
    assert "Chunks" in result.stdout
    
    # Query
    result = run_cli(["python", "-m", "src.rag.cli", "query", "greet function"], tmp_path)
    assert result.returncode == 0
    assert "greet" in result.stdout.lower()
```

- [ ] **Step 4: Run test**

Run: `pytest tests/test_cli.py -v -m integration`

- [ ] **Step 5: Commit**

```bash
git add src/rag/cli.py pyproject.toml tests/test_cli.py
git commit -m "feat(rag): CLI commands (index, query, status, init)"
```

---

### Task 10: OpenCode Skill

**Files:**
- Create: `.opencode/skill/local-rag/skill.json`
- Create: `.opencode/skill/local-rag/tool.py`

**Interfaces:**
- Consumes: `rag-query` CLI (JSON output)
- Produces: OpenCode tool `rag_query` returning structured results

- [ ] **Step 1: Write .opencode/skill/local-rag/skill.json**

```json
{
  "name": "local-rag",
  "description": "Query the project's local RAG index for code/docs",
  "version": "1.0.0",
  "tools": ["rag_query"]
}
```

- [ ] **Step 2: Write .opencode/skill/local-rag/tool.py**

```python
import json
import subprocess
from pathlib import Path
from typing import Dict, Any, List

def rag_query(question: str, max_tokens: int = 4000, k: int = 8) -> Dict[str, Any]:
    """
    Query the local RAG index.
    
    Args:
        question: Natural language question about the codebase
        max_tokens: Maximum tokens to return in context
        k: Number of top results to retrieve
    
    Returns:
        Dict with results, timings, and token info
    """
    # Find project root (where .rag exists)
    cwd = Path.cwd()
    root = cwd
    for p in [cwd] + list(cwd.parents):
        if (p / ".rag" / "index.sqlite").exists():
            root = p
            break
    
    cmd = [
        "python", "-m", "src.rag.cli", "query",
        question,
        "--k", str(k),
        "--tokens", str(max_tokens),
        "--format", "json"
    ]
    
    try:
        result = subprocess.run(
            cmd, cwd=root, capture_output=True, text=True, timeout=30
        )
        if result.returncode != 0:
            return {
                "error": result.stderr.strip() or "RAG query failed",
                "results": [],
                "timings_ms": {},
                "tokens_used": 0,
                "token_budget": max_tokens,
            }
        return json.loads(result.stdout)
    except subprocess.TimeoutExpired:
        return {"error": "Query timed out", "results": []}
    except json.JSONDecodeError:
        return {"error": "Invalid JSON from RAG CLI", "raw_output": result.stdout}
    except FileNotFoundError:
        return {"error": "RAG not initialized. Run 'rag-index --init' in project root."}

# OpenCode tool wrapper
def tool_rag_query(arguments: Dict[str, Any]) -> Dict[str, Any]:
    question = arguments.get("question", "")
    max_tokens = arguments.get("max_tokens", 4000)
    k = arguments.get("k", 8)
    
    if not question:
        return {"error": "question is required"}
    
    return rag_query(question, max_tokens, k)

# Export for OpenCode
TOOLS = {
    "rag_query": {
        "description": "Search the project's local code index",
        "parameters": {
            "type": "object",
            "properties": {
                "question": {"type": "string", "description": "Natural language question"},
                "max_tokens": {"type": "integer", "default": 4000},
                "k": {"type": "integer", "default": 8},
            },
            "required": ["question"],
        },
        "handler": tool_rag_query,
    }
}
```

- [ ] **Step 3: Test skill loads**

Run: `cd /project && python -c "from .opencode.skill.local_rag.tool import tool_rag_query; print('OK')"`

- [ ] **Step 4: Commit**

```bash
git add .opencode/skill/local-rag/skill.json .opencode/skill/local-rag/tool.py
git commit -m "feat(rag): OpenCode skill for local RAG queries"
```

---

### Task 11: Integration Tests & Benchmarks

**Files:**
- Create: `tests/integration/test_full_pipeline.py`
- Create: `scripts/benchmark.py`

**Interfaces:**
- Full end-to-end test on sample project
- Benchmark: indexing speed, query latency, memory

- [ ] **Step 1: Write integration test**

```python
# tests/integration/test_full_pipeline.py
import tempfile
from pathlib import Path
import subprocess

def test_full_pipeline_on_sample_project(tmp_path):
    # Create a realistic sample project structure
    (tmp_path / "pyproject.toml").write_text("[project]\nname = 'sample'\n")
    (tmp_path / "src" / "api").mkdir(parents=True)
    (tmp_path / "src" / "models").mkdir(parents=True)
    (tmp_path / "tests").mkdir()
    
    (tmp_path / "src" / "api" / "auth.py").write_text("""
from src.models.user import User

def login(email: str, password: str) -> User:
    '''Authenticate user and return session.'''
    user = User.find_by_email(email)
    if user and user.check_password(password):
        return user.create_session()
    raise AuthenticationError("Invalid credentials")

class AuthenticationError(Exception):
    pass
""")
    (tmp_path / "src" / "models" / "user.py").write_text("""
class User:
    def __init__(self, email: str, password_hash: str):
        self.email = email
        self.password_hash = password_hash
    
    @classmethod
    def find_by_email(cls, email: str) -> 'User':
        # Query database
        return cls(email, "hashed")
    
    def check_password(self, password: str) -> bool:
        import hashlib
        return hashlib.sha256(password.encode()).hexdigest() == self.password_hash
    
    def create_session(self) -> 'Session':
        return Session(self.email)
""")
    (tmp_path / "README.md").write_text("""# Sample Project

## Authentication
User login via `src/api/auth.py:login()`
""")
    
    # Run init
    result = subprocess.run(["python", "-m", "src.rag.cli", "init"], cwd=tmp_path, capture_output=True, text=True)
    assert result.returncode == 0
    
    # Run index
    result = subprocess.run(["python", "-m", "src.rag.cli", "index"], cwd=tmp_path, capture_output=True, text=True)
    assert result.returncode == 0
    
    # Query
    result = subprocess.run(
        ["python", "-m", "src.rag.cli", "query", "how does login work?", "--format", "json"],
        cwd=tmp_path, capture_output=True, text=True
    )
    assert result.returncode == 0
    import json
    data = json.loads(result.stdout)
    assert len(data["results"]) > 0
    assert any("auth.py" in r["file"] for r in data["results"])
    assert any("login" in r["preview"].lower() for r in data["results"])
    assert data["tokens_used"] <= 4000
```

- [ ] **Step 2: Write benchmark script**

```python
# scripts/benchmark.py
import time
import statistics
from pathlib import Path
from src.rag.models import IndexConfig
from src.rag.paths import RagPaths
from src.rag.embedder import Embedder, ensure_model
from src.rag.file_indexer import FileIndexer
from src.rag.query import QueryEngine

def benchmark_indexing(project_root: Path):
    config = IndexConfig()
    paths = RagPaths.from_root(project_root)
    paths.ensure_dirs()
    ensure_model(config, paths)
    embedder = Embedder(config, paths)
    indexer = FileIndexer(config, paths, embedder)
    
    # Warm up
    indexer.index_changed_files()
    
    # Benchmark
    times = []
    for _ in range(3):
        # Modify a file to trigger reindex
        (project_root / "bench_touch.py").write_text(f"# touch {time.time()}\n")
        start = time.perf_counter()
        stats = indexer.index_changed_files()
        times.append(time.perf_counter() - start)
    
    print(f"Indexing (incremental): {statistics.mean(times):.2f}s ± {statistics.stdev(times):.2f}s")
    print(f"  Files scanned: {stats.scanned}, Changed: {stats.changed}, Chunks: {stats.chunks}")

def benchmark_query(project_root: Path, queries: list):
    config = IndexConfig()
    paths = RagPaths.from_root(project_root)
    ensure_model(config, paths)
    embedder = Embedder(config, paths)
    engine = QueryEngine(config, paths, embedder)
    
    times = []
    for q in queries:
        start = time.perf_counter()
        results, timings, tokens = engine.search(q, k=8, max_tokens=4000)
        elapsed = (time.perf_counter() - start) * 1000
        times.append(elapsed)
        print(f"  '{q[:40]}...': {elapsed:.0f}ms ({len(results)} results, {tokens} tokens)")
    
    print(f"Query latency: {statistics.mean(times):.0f}ms ± {statistics.stdev(times):.0f}ms")

if __name__ == "__main__":
    import sys
    root = Path(sys.argv[1]) if len(sys.argv) > 1 else Path.cwd()
    print(f"Benchmarking {root}")
    benchmark_indexing(root)
    benchmark_query(root, [
        "how does authentication work",
        "database connection pool",
        "API error handling",
        "user session management",
        "password hashing",
    ])
```

- [ ] **Step 3: Run benchmarks on portfolio-site**

Run: `python scripts/benchmark.py /path/to/portfolio-site`

- [ ] **Step 4: Commit**

```bash
git add tests/integration/test_full_pipeline.py scripts/benchmark.py
git commit -m "test(rag): integration tests and benchmark script"
```

---

### Task 12: Documentation & Polish

**Files:**
- Create: `.rag/README.md` (template, copied on init)
- Create: `docs/rag-usage.md`
- Modify: `README.md` (add RAG section)

**Interfaces:**
- User-facing docs

- [ ] **Step 1: Write .rag/README.md template**

```markdown
# Local RAG Index

This directory contains the per-project RAG index. It is **gitignored** and **not committed**.

## Structure
- `index.sqlite` — sqlite-vec vector database
- `bm25_index.pkl` — BM25 keyword index
- `file_hashes.json` — SHA256 hashes for incremental indexing
- `config.json` — index configuration
- `models/all-MiniLM-L6-v2/` — ONNX embedding model (~90MB)

## Commands
```bash
rag-index          # incremental update
rag-index --rebuild  # full rebuild
rag-query "question" # search
rag-status         # show index info
```

## OpenCode Skill
The `local-rag` skill provides a `rag_query` tool for agents.
```

- [ ] **Step 2: Write docs/rag-usage.md**

```markdown
# Local RAG Usage

## Quick Start
```bash
# One-time setup (per machine)
pip install -r requirements-rag.txt

# Per project
cd my-project
rag-index --init   # creates .rag/, downloads model
rag-index          # build index
rag-query "how does X work?"
```

## OpenCode Integration
The `local-rag` skill is automatically available in OpenCode when `.opencode/skill/local-rag/` exists.

```json
// In agent conversation:
{
  "tool": "rag_query",
  "arguments": { "question": "explain the case-card component", "max_tokens": 3000 }
}
```

## Configuration
Edit `.rag/config.json` to customize:
- `include_patterns` / `exclude_patterns` — which files to index
- `hybrid_alpha` — vector vs keyword weight (0.6 default)
- `chunk_max_tokens` — max tokens per chunk (500)
- `default_max_tokens` — context budget for queries (4000)
```

- [ ] **Step 3: Update project README.md** (add RAG section)

- [ ] **Step 4: Commit**

```bash
git add .rag/README.md docs/rag-usage.md README.md
git commit -m "docs(rag): usage docs and .rag README template"
```

---

## Execution Order Summary

| Task | Component | Depends On |
|------|-----------|------------|
| 1 | Scaffold & Models | — |
| 2 | Config & Paths | 1 |
| 3 | Embedder (ONNX) | 1, 2 |
| 4 | Chunker (Tree-sitter) | 1 |
| 5 | SQLite-Vec Index | 1, 2, 3 |
| 6 | BM25 Index | 1 |
| 7 | File Indexer (incremental) | 1, 2, 3, 4, 5, 6 |
| 8 | Query Engine (hybrid) | 1, 2, 3, 5, 6 |
| 9 | CLI | 1-8 |
| 10 | OpenCode Skill | 9 |
| 11 | Integration Tests | 1-9 |
| 12 | Docs | 1-11 |

---

## Estimated Effort

- **Tasks 1-2:** ~30 min (scaffold, config)
- **Tasks 3-4:** ~1 hr (embedder, chunker — model download on first run)
- **Tasks 5-6:** ~45 min (indexes)
- **Task 7:** ~45 min (file indexer + incremental logic)
- **Task 8:** ~45 min (query engine)
- **Task 9:** ~30 min (CLI)
- **Task 10:** ~15 min (skill)
- **Task 11:** ~30 min (tests + benchmarks)
- **Task 12:** ~15 min (docs)

**Total: ~5-6 hours** for complete implementation with tests.

---

## Next Steps

Review this plan. If it captures what you want, choose execution method:

- **Subagent-driven** — fresh subagent per task, reviewer after each. Thorough but slower.
- **Native** — I implement all tasks in this session, single review at end. Faster.

For this plan I recommend **Subagent-driven**, because the components (embedder, chunker, indexer, query) have well-defined interfaces but non-trivial implementations where an independent reviewer catches integration issues early. Does the plan capture what you want, and which approach should we use?