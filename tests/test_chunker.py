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