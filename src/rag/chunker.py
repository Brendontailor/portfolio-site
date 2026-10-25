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
                    chunk_index=i,
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