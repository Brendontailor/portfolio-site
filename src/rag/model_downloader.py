import urllib.request
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