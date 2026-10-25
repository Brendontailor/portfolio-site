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