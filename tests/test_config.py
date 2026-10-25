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