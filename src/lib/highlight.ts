const KEYWORDS = new Set([
  "const",
  "let",
  "var",
  "function",
  "return",
  "if",
  "else",
  "for",
  "while",
  "class",
  "def",
  "match",
  "case",
  "switch",
  "break",
  "continue",
  "import",
  "from",
  "new",
  "super",
  "None",
  "True",
  "False",
  "async",
  "await",
  "extends",
  "interface",
  "type",
  "in",
  "of",
  "not",
  "and",
  "or",
  "self",
  "this",
  "void",
  "public",
  "private",
  "func",
  "delta",
]);

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function findComment(line: string) {
  let quote: string | null = null;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];

    if (quote) {
      if (char === "\\") {
        index += 1;
        continue;
      }
      if (char === quote) quote = null;
      continue;
    }

    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }

    if (char === "/" && line[index + 1] === "/") return index;
    if (char === "#") return index;
  }

  return -1;
}

function highlightLine(line: string) {
  const strings: string[] = [];
  let output = escapeHtml(line);

  output = output.replace(
    /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g,
    (match) => {
      const index = strings.push(match) - 1;
      return `\u0000${index}\u0000`;
    },
  );

  output = output.replace(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g, (match) =>
    KEYWORDS.has(match)
      ? `<span class="tok-keyword">${match}</span>`
      : match,
  );

  output = output.replace(
    /\b(\d+(?:\.\d+)?)\b/g,
    '<span class="tok-number">$1</span>',
  );

  output = output.replace(
    /\u0000(\d+)\u0000/g,
    (_, index: string) =>
      `<span class="tok-string">${strings[Number(index)]}</span>`,
  );

  return output;
}

export function highlightCode(code: string) {
  return code
    .split("\n")
    .map((line) => {
      const commentIndex = findComment(line);

      if (commentIndex >= 0) {
        const codePart = line.slice(0, commentIndex);
        const comment = line.slice(commentIndex);
        return `${highlightLine(codePart)}<span class="tok-comment">${escapeHtml(comment)}</span>`;
      }

      return highlightLine(line);
    })
    .join("\n");
}
