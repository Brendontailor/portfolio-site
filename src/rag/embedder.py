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
        self._session: ort.InferenceSession | None = None
        self._tokenizer: Tokenizer | None = None
        self._dim = config.embedding_dim
    
    def _load(self):
        if self._session is not None:
            return
        model_path = get_model_path(self.config.embedding_model, self.paths.model_dir)
        tokenizer_path = model_path.parent / "tokenizer.json"
        
        try:
            self._session = ort.InferenceSession(
                str(model_path),
                providers=["CPUExecutionProvider"]
            )
        except Exception as e:
            raise RuntimeError(f"Failed to load ONNX model from {model_path}: {e}") from e
        
        try:
            self._tokenizer = Tokenizer.from_file(str(tokenizer_path))
        except Exception as e:
            raise RuntimeError(f"Failed to load tokenizer from {tokenizer_path}: {e}") from e
        
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
        token_type_ids = np.array([e.type_ids for e in encodings], dtype=np.int64)
        
        # Run ONNX
        outputs = self._session.run(
            None,
            {
                "input_ids": input_ids, 
                "attention_mask": attention_mask,
                "token_type_ids": token_type_ids
            }
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