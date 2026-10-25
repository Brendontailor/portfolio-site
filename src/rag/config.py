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
        config = IndexConfig()
        for key, value in data.items():
            if hasattr(config, key):
                setattr(config, key, value)
        return config
    return DEFAULT_CONFIG


def save_config(config: IndexConfig, root: Path):
    paths = RagPaths.from_root(root)
    paths.ensure_dirs()
    data = config.to_dict()
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
