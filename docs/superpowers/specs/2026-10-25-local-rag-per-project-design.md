# Local RAG per Project — Design Document

**Date:** 2026-10-25
**Project:** portfolio-site (template for any project)
**Status:** Approved for implementation

---

## 1. Intent & Why

Create a **local, per-project RAG system** that:
- Indexes only the project's source code and documentation
- Stores the vector index **inside the project folder** (e.g., `.rag/`)
- Does **not** modify OpenCode's global config or other projects
- Provides a CLI (`rag-index`, `rag-query`) + an OpenCode skill for agent integration
- Returns: relevant chunks, source file paths, search latency, token counts

Use case: While working in a project, ask "how does the case-card component work?" and get precise, cited answers from that project's codebase only.

---

## 2. Goals

- [ ] Zero external dependencies at runtime (no vector DB server)
- [ ] One-file index per project (`.rag/index.sqlite`)
- [ ] Incremental indexing (only changed files)
- [ ] Hybrid search: BM25 (keywords) + vector (semantic)
- [ ] Sub-100ms query latency on typical codebase (~5k files)
- [ ] Token-accurate context sizing for LLM consumption
- [ ] OpenCode skill: `/rag "question"` → injects context into agent turn

---

## 3. Non-Goals / Anti-Goals

- ❌ Cross-project search (each project is isolated)
- ❌ Cloud sync or shared indices
- ❌ Replacing OpenCode's native file tools (grep, glob, read)
- ❌ Real-time indexing on every keystroke (explicit `rag-index` command)
- ❌ GUI / dashboard (CLI + skill only)

---

## 4. Constraints

| Constraint | Decision |
|------------|----------|
| Language | Python 3.11+ (best embedding ecosystem) |
| Vector DB | `sqlite-vec` (loadable extension, single file, no server) |
| Embeddings | `sentence-transformers` + ONNX Runtime (local, fast, 384-dim) |
| Model | `all-MiniLM-L6-v2` (384 dims, ~90MB, MIT license) |
| Chunking | Tree-sitter AST-aware (50-500 lines, overlap 50) |
| BM25 | `rank-bm25` (pure Python, fast) |
| Token counting | `tiktoken` (cl100k_base) |
| CLI | `typer` (simple, typed) |
| Config | `.rag/config.json` (per-project, gitignored) |

---

## 5. Architecture

```
project-root/
├── .rag/
│   ├── config.json           # project settings (gitignored)
│   ├── index.sqlite          # sqlite-vec database (gitignored)
│   ├── bm25_index.pkl        # BM25 index (gitignored)
│   └── file_hashes.json      # SHA256 per file for incremental
├── src/
│   └── rag/
│       ├── __init__.py
│       ├── cli.py            # rag-index, rag-query entrypoints
│       ├── indexer.py        # walk, chunk, embed, upsert
│       ├── query.py          # hybrid search + rerank
│       ├── embedder.py       # ONNX embeddings
│       ├── chunker.py        # tree-sitter + fallback
│       ├── bm25.py           # BM25 index build/load
│       ├── tokens.py         # tiktoken utilities
│       └── models.py         # dataclasses
├── .opencode/
│   └── skill/
│       └── local-rag/        # OpenCode skill
└── requirements-rag.txt      # pip deps (optional, for uv/pipx)
```

### Data Model (sqlite-vec)

```sql
-- chunks table
CREATE TABLE chunks (
  id INTEGER PRIMARY KEY,
  file_path TEXT NOT NULL,
  chunk_index INTEGER NOT NULL,
  content TEXT NOT NULL,           -- original text
  tokens INTEGER NOT NULL,         -- tiktoken count
  language TEXT,                   -- from file ext
  start_line INTEGER,
  end_line INTEGER,
  embedding BLOB                   -- sqlite-vec vector (384 dims)
);

-- virtual table for vector search
CREATE VIRTUAL TABLE vec_chunks USING vec0(
  embedding FLOAT[384]
);

-- metadata
CREATE TABLE meta (key TEXT PRIMARY KEY, value TEXT);
```

---

## 6. CLI Interface

### `rag-index` — Build / Update Index

```bash
# Full rebuild
rag-index --rebuild

# Incremental (default): only changed/new files
rag-index

# Options
rag-index --watch              # watch mode (dev)
rag-index --include "*.md"     # glob patterns
rag-index --exclude "test*"    # exclude patterns
rag-index --verbose            # progress + stats
```

Output:
```
Indexing portfolio-site...
  Scanned: 1,247 files
  Changed: 23 files
  Chunks:  3,841 created
  Embeddings: 3,841 / 3,841 (12.3s)
  BM25: built (0.4s)
  Index: .rag/index.sqlite (42 MB)
  Done in 14.1s
```

### `rag-query` — Search

```bash
# Basic query
rag-query "como funciona o case-card?"

# Options
rag-query "authentication" --k 10 --hybrid-weight 0.7
rag-query "prisma schema" --format json
rag-query "hero component" --tokens 4000  # max context tokens
```

Output (default human):
```
Query: "como funciona o case-card?"
Search: 23ms | BM25: 12ms | Vector: 11ms | Rerank: 8ms
Tokens: 1,847 (budget: 4,000)

--- Result 1 (score: 0.91) ---
src/components/case-card.tsx:1-83
```tsx
import { cases } from "@/data/cases";
import { ArrowUpRight } from "@/components/icons";
import { CaseCard } from "@/components/case-card";
...
```

--- Result 2 (score: 0.84) ---
src/components/home/cases-section.tsx:35-62
```tsx
{cases.map((study, index) => {
  const slot = study.featured ? "case-slot featured" ...
```

--- Result 3 (score: 0.78) ---
src/app/globals.css:1040-1281
```css
.case-card { ... }
```

### `rag-status` — Index Info

```bash
rag-status
```
```
Project: portfolio-site
Index: .rag/index.sqlite (42 MB)
Files indexed: 1,247
Chunks: 3,841
Embedding model: all-MiniLM-L6-v2 (384 dims)
Last indexed: 2026-10-25 14:32:11
Config: .rag/config.json
```

---

## 7. OpenCode Skill: `local-rag`

### Location
`.opencode/skill/local-rag/`

### Manifest (skill.json)
```json
{
  "name": "local-rag",
  "description": "Query the project's local RAG index",
  "version": "1.0.0",
  "tools": ["rag_query"]
}
```

### Tool: `rag_query`
```json
{
  "name": "rag_query",
  "description": "Search the project's local code index",
  "parameters": {
    "type": "object",
    "properties": {
      "question": { "type": "string", "description": "Natural language question" },
      "max_tokens": { "type": "integer", "default": 4000 },
      "k": { "type": "integer", "default": 8 }
    },
    "required": ["question"]
  }
}
```

### Agent Usage
When user asks about the codebase, agent invokes:
```json
{
  "tool": "rag_query",
  "arguments": { "question": "como o manifesto é renderizado?", "max_tokens": 3000 }
}
```

Returns structured result → agent synthesizes answer with citations.

---

## 8. Incremental Indexing Logic

1. Walk project root (respect `.gitignore` + `.ragignore`)
2. For each file: compute SHA256, compare to `file_hashes.json`
3. If changed/new: parse → chunk → embed → upsert
4. If deleted: remove from sqlite + BM25
5. Update `file_hashes.json`
6. Rebuild BM25 from all chunks (fast, ~0.5s for 4k chunks)

---

## 9. Chunking Strategy

| Language | Method |
|----------|--------|
| TypeScript/TSX, Python, Rust, Go | Tree-sitter (function/class/interface nodes) |
| JSON, YAML, TOML, CSS | Whole file (usually small) |
| Markdown | Heading-based sections |
| Fallback | RecursiveCharacterTextSplitter (500 lines, 50 overlap) |

Min chunk: 50 chars | Max chunk: 2000 chars (~500 tokens)

---

## 10. Hybrid Search

```
score = α * vector_score + (1-α) * bm25_score
```
Default `α = 0.6` (favor semantic for code).

Top-k from hybrid → optional reranker (bge-reranker-base, +20ms) → return top-N fitting token budget.

---

## 11. Token Budgeting

- User specifies `--tokens 4000` (default)
- Chunks added in score order until budget exhausted
- Each result includes: `file_path`, `lines`, `tokens`, `score`
- Agent sees total tokens used + remaining

---

## 12. Installation / Setup (Per Project)

```bash
# 1. Install deps (once per machine)
uv pip install -r requirements-rag.txt
# or: pipx install -r requirements-rag.txt

# 2. In each project:
cd my-project
rag-index --init   # creates .rag/, downloads model (~90MB)
rag-index          # first full index

# 3. Add to .gitignore
echo ".rag/" >> .gitignore
```

### `requirements-rag.txt`
```
sentence-transformers==3.0.1
onnxruntime==1.18.0
sqlite-vec==0.1.6
rank-bm25==0.2.2
tiktoken==0.7.0
typer==0.12.3
tree-sitter==0.22.0
tree-sitter-typescript==0.21.0
tree-sitter-python==0.21.0
pyyaml==6.0.1
watchdog==3.0.0  # optional, for --watch
```

---

## 13. Configuration (`.rag/config.json`)

```json
{
  "version": 1,
  "embedding_model": "all-MiniLM-L6-v2",
  "embedding_dim": 384,
  "chunk_max_tokens": 500,
  "chunk_overlap_tokens": 50,
  "hybrid_alpha": 0.6,
  "default_k": 8,
  "default_max_tokens": 4000,
  "include_patterns": ["**/*.ts", "**/*.tsx", "**/*.py", "**/*.md", "**/*.json", "**/*.css", "**/*.yml", "**/*.yaml"],
  "exclude_patterns": ["**/node_modules/**", "**/dist/**", "**/build/**", "**/.next/**", "**/*.lock", "**/*.min.*"],
  "watch": false
}
```

---

## 14. Implementation Order

1. **Core library** (`src/rag/`) — indexer, embedder, chunker, query, BM25, tokens
2. **CLI** (`src/rag/cli.py`) — `rag-index`, `rag-query`, `rag-status`
3. **Init script** — downloads model, creates `.rag/`, writes config
4. **OpenCode skill** — tool wrapper around `rag-query`
5. **Tests** — fixture project, query accuracy, latency benchmarks
6. **Docs** — README in `.rag/`, usage examples

---

## 15. Builder Check Notes (My Calls)

| Decision | Rationale |
|----------|-----------|
| Python over Node | Embedding ecosystem maturity; sqlite-vec Python bindings |
| sqlite-vec over Chroma/LanceDB | Single file, no server, truly local |
| all-MiniLM-L6-v2 | 384 dims = small index, fast, good code retrieval |
| Tree-sitter chunking | Preserves semantic boundaries (functions, classes) |
| BM25 + vector hybrid | Keywords (function names) + semantics = best recall |
| `.rag/` in project root | Portable, gitignored, per-project isolation |
| CLI first, skill second | Works without OpenCode; skill is thin wrapper |

---

## 16. Open Questions (None — all decided)

---

## 17. Approval

**Human partner:** Review above. Reply "approved" to proceed to implementation plan, or specify changes.