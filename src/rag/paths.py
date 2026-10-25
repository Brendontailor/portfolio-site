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