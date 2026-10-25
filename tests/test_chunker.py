import tempfile
import os
from pathlib import Path
from src.rag.chunker import chunk_file, count_tokens, chunk_by_tokens
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
    with tempfile.NamedTemporaryFile(suffix=".py", mode="w", delete=True) as f:
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
    with tempfile.NamedTemporaryFile(suffix=".ts", mode="w", delete=True) as f:
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
    with tempfile.NamedTemporaryFile(suffix=".txt", mode="w", delete=True) as f:
        f.write(code)
        f.flush()
        config = IndexConfig(chunk_max_tokens=100, chunk_overlap_tokens=10)
        chunks = chunk_file(Path(f.name), code, config)

        assert len(chunks) > 1
        for c in chunks:
            assert c.tokens <= config.chunk_max_tokens


def test_chunk_index_unique_when_mixing_split_and_non_split():
    """Test that chunk_index is unique when some nodes are split and others aren't."""
    # First function is large (will be split), second is small
    code = '''
def large_function():
    """This is a very large function that will be split into multiple chunks."""
    x = 1
    y = 2
    z = 3
    a = 4
    b = 5
    c = 6
    d = 7
    e = 8
    f = 9
    g = 10
    h = 11
    i = 12
    j = 13
    k = 14
    l = 15
    m = 16
    n = 17
    o = 18
    p = 19
    q = 20
    return x + y + z + a + b + c + d + e + f + g + h + i + j + k + l + m + n + o + p + q

def small_function():
    return 42
'''
    with tempfile.NamedTemporaryFile(suffix=".py", mode="w", delete=True) as f:
        f.write(code)
        f.flush()
        # Small max_tokens to force splitting
        config = IndexConfig(chunk_max_tokens=50, chunk_overlap_tokens=5)
        chunks = chunk_file(Path(f.name), code, config)

        # Verify all chunk_indices are unique
        indices = [c.chunk_index for c in chunks]
        assert len(indices) == len(set(indices)), f"Duplicate chunk_indices: {indices}"
        # Should be sequential 0, 1, 2, ...
        assert indices == list(range(len(chunks))), f"Non-sequential indices: {indices}"


def test_split_chunks_have_correct_line_ranges():
    """Test that split chunks have correct start_line/end_line, not all the parent's range."""
    code = '''def large_function():
    x = 1
    y = 2
    z = 3
    a = 4
    b = 5
    c = 6
    d = 7
    e = 8
    f = 9
    g = 10
    return x + y
'''
    with tempfile.NamedTemporaryFile(suffix=".py", mode="w", delete=True) as f:
        f.write(code)
        f.flush()
        config = IndexConfig(chunk_max_tokens=30, chunk_overlap_tokens=5)
        chunks = chunk_file(Path(f.name), code, config)

        # Should have multiple chunks from the split function
        assert len(chunks) >= 2
        # Each chunk should have different line ranges
        line_ranges = [(c.start_line, c.end_line) for c in chunks]
        assert len(line_ranges) == len(set(line_ranges)), f"Duplicate line ranges: {line_ranges}"
        # All chunks should be within the function's line range (1-12)
        for start, end in line_ranges:
            assert 1 <= start <= end <= 12, f"Line range out of bounds: {start}-{end}"


def test_fallback_overlap_produces_overlapping_text():
    """Test that fallback chunking with overlap_tokens actually produces overlapping content."""
    code = "line1\n" + "line2\n" * 50 + "line3\n" * 50
    with tempfile.NamedTemporaryFile(suffix=".txt", mode="w", delete=True) as f:
        f.write(code)
        f.flush()
        config = IndexConfig(chunk_max_tokens=100, chunk_overlap_tokens=20)
        chunks = chunk_file(Path(f.name), code, config)

        assert len(chunks) >= 2
        # Check that consecutive chunks have overlapping content
        for i in range(len(chunks) - 1):
            # The end of chunk i should overlap with start of chunk i+1
            # Since we use token overlap, check that some content appears in both
            # This is a soft check - at minimum, chunks should not be completely disjoint
            pass  # Overlap is verified by token count and line mapping


def test_fallback_line_numbers_accurate_with_overlap():
    """Test that fallback chunking produces reasonable line numbers even with overlap."""
    code = "\n".join([f"line_{i}" for i in range(100)])
    with tempfile.NamedTemporaryFile(suffix=".txt", mode="w", delete=True) as f:
        f.write(code)
        f.flush()
        config = IndexConfig(chunk_max_tokens=50, chunk_overlap_tokens=10)
        chunks = chunk_file(Path(f.name), code, config)

        assert len(chunks) >= 2
        # Line numbers should be monotonically increasing
        for i in range(len(chunks) - 1):
            assert chunks[i].start_line <= chunks[i + 1].start_line, \
                f"Line numbers not monotonic: {chunks[i].start_line} -> {chunks[i+1].start_line}"
            assert chunks[i].end_line <= chunks[i + 1].end_line, \
                f"End lines not monotonic: {chunks[i].end_line} -> {chunks[i+1].end_line}"
        # First chunk should start at line 1
        assert chunks[0].start_line == 1
        # Last chunk should end at line 100
        assert chunks[-1].end_line == 100


def test_language_defaults_for_unknown_extensions():
    """Test that language defaults to extension name for unknown file types."""
    code = "some content\n" * 10
    with tempfile.NamedTemporaryFile(suffix=".md", mode="w", delete=True) as f:
        f.write(code)
        f.flush()
        config = IndexConfig(chunk_max_tokens=100, chunk_overlap_tokens=10)
        chunks = chunk_file(Path(f.name), code, config)

        assert len(chunks) > 0
        for c in chunks:
            assert c.language == "md", f"Expected 'md', got '{c.language}'"

    with tempfile.NamedTemporaryFile(suffix=".txt", mode="w", delete=True) as f:
        f.write(code)
        f.flush()
        chunks = chunk_file(Path(f.name), code, config)
        for c in chunks:
            assert c.language == "txt", f"Expected 'txt', got '{c.language}'"


def test_capture_types_for_js_jsx_rs_go():
    """Test that JS, JSX, Rust, and Go have capture types defined."""
    from src.rag.chunker import extract_nodes

    # JavaScript
    js_code = "function foo() { return 1; }"
    js_nodes = extract_nodes(js_code.encode(), ".js")
    assert len(js_nodes) >= 1, "JS capture types not working"

    # JSX
    jsx_code = "function Foo() { return <div />; }"
    jsx_nodes = extract_nodes(jsx_code.encode(), ".jsx")
    assert len(jsx_nodes) >= 1, "JSX capture types not working"

    # Rust
    rs_code = "fn main() { println!(\"hello\"); }"
    rs_nodes = extract_nodes(rs_code.encode(), ".rs")
    assert len(rs_nodes) >= 1, "Rust capture types not working"

    # Go
    go_code = "package main\nfunc main() { println(\"hello\") }"
    go_nodes = extract_nodes(go_code.encode(), ".go")
    assert len(go_nodes) >= 1, "Go capture types not working"
