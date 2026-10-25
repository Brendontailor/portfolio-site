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
            elif lang_name == "rust":
                import tree_sitter_rust as tsr
                _TS_LANGUAGES[lang_name] = Language(tsr.language())
            elif lang_name == "go":
                import tree_sitter_go as tsg
                _TS_LANGUAGES[lang_name] = Language(tsg.language())
            elif lang_name == "javascript":
                import tree_sitter_javascript as tsjs
                _TS_LANGUAGES[lang_name] = Language(tsjs.language())
            elif lang_name == "jsx":
                # JSX uses the TypeScript TSX parser since tree_sitter_javascript doesn't have a separate JSX language
                import tree_sitter_typescript as tst
                _TS_LANGUAGES[lang_name] = Language(tst.language_tsx())
            # Add more as needed
        except Exception:
            return None
    return _TS_LANGUAGES.get(lang_name)


def get_parser(ext: str):
    lang = get_tree_sitter_language(ext)
    if not lang:
        return None
    if lang not in _TS_PARSERS:
        parser = Parser(lang)
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


def _split_text_with_line_tracking(text: str, max_tokens: int, overlap_tokens: int) -> List[tuple]:
    """Split text by tokens and return (sub_text, start_line_offset, end_line_offset) for each chunk.

    Line offsets are relative to the start of the input text (0-indexed).
    """
    tokens = ENCODER.encode(text)
    if len(tokens) <= max_tokens:
        lines = text.count("\n")
        return [(text, 0, lines)]

    chunks = []
    start = 0
    while start < len(tokens):
        end = min(start + max_tokens, len(tokens))
        chunk_tokens = tokens[start:end]
        chunk_text = ENCODER.decode(chunk_tokens)

        # Calculate line offsets within the original text
        # We need to find where this chunk starts/ends in the original text
        # Approximate by decoding prefix tokens
        prefix_text = ENCODER.decode(tokens[:start])
        start_line_offset = prefix_text.count("\n")
        chunk_lines = chunk_text.count("\n")
        end_line_offset = start_line_offset + chunk_lines

        chunks.append((chunk_text, start_line_offset, end_line_offset))

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
        ".js": ["function_declaration", "class_declaration", "arrow_function", "function_expression"],
        ".jsx": ["function_declaration", "class_declaration", "arrow_function", "function_expression"],
        ".rs": ["function_item", "struct_item", "enum_item", "impl_item", "trait_item", "mod_item"],
        ".go": ["function_declaration", "type_declaration", "method_declaration"],
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
    language = LANG_MAP.get(ext, ext.lstrip(".") or "text")

    # Try AST chunking first
    nodes = extract_nodes(content.encode("utf-8"), ext)

    if nodes:
        chunks = []
        for start_line, end_line, text in nodes:
            tokens = count_tokens(text)
            if tokens > config.chunk_max_tokens:
                # Split large nodes with proper line tracking
                sub_chunks = _split_text_with_line_tracking(text, config.chunk_max_tokens, config.chunk_overlap_tokens)
                for sub_text, sub_start_offset, sub_end_offset in sub_chunks:
                    chunks.append(Chunk(
                        id=None,
                        file_path=str(file_path),
                        chunk_index=len(chunks),
                        content=sub_text,
                        tokens=count_tokens(sub_text),
                        language=language,
                        start_line=start_line + sub_start_offset,
                        end_line=start_line + sub_end_offset,
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

    # Fallback: token-based chunking with proper line tracking
    # We track line numbers by mapping token positions back to source lines
    tokens = ENCODER.encode(content)
    if len(tokens) <= config.chunk_max_tokens:
        lines = content.count("\n") + 1
        return [Chunk(
            id=None,
            file_path=str(file_path),
            chunk_index=0,
            content=content,
            tokens=len(tokens),
            language=language,
            start_line=1,
            end_line=lines,
        )]

    chunks = []
    start = 0
    # Pre-compute line starts in source for accurate line mapping
    line_starts = [0]
    for i, ch in enumerate(content):
        if ch == "\n":
            line_starts.append(i + 1)

    def byte_offset_to_line(byte_offset: int) -> int:
        """Convert byte offset to 1-indexed line number."""
        # Binary search in line_starts
        lo, hi = 0, len(line_starts) - 1
        while lo <= hi:
            mid = (lo + hi) // 2
            if line_starts[mid] <= byte_offset:
                lo = mid + 1
            else:
                hi = mid - 1
        return hi + 1  # 1-indexed

    while start < len(tokens):
        end = min(start + config.chunk_max_tokens, len(tokens))
        chunk_tokens = tokens[start:end]
        chunk_text = ENCODER.decode(chunk_tokens)

        # Map token positions to byte offsets in source
        # Decode prefix to get byte offset
        prefix_text = ENCODER.decode(tokens[:start])
        start_byte = len(prefix_text.encode("utf-8"))
        end_byte = start_byte + len(chunk_text.encode("utf-8"))

        start_line = byte_offset_to_line(start_byte)
        end_line = byte_offset_to_line(min(end_byte, len(content.encode("utf-8")) - 1))

        chunks.append(Chunk(
            id=None,
            file_path=str(file_path),
            chunk_index=len(chunks),
            content=chunk_text,
            tokens=len(chunk_tokens),
            language=language,
            start_line=start_line,
            end_line=end_line,
        ))

        if end == len(tokens):
            break
        start = end - config.chunk_overlap_tokens

    return chunks
