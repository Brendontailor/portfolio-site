import { highlightCode } from "@/lib/highlight";

type CodeBlockProps = {
  code: string;
  file: string;
  className?: string;
};

export function CodeBlock({ code, file, className = "" }: CodeBlockProps) {
  return (
    <div className={`code-window ${className}`.trim()}>
      <div className="code-window-bar">
        <span className="code-window-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="code-window-file">{file}</span>
        <span className="code-window-lang">UTF-8</span>
      </div>
      <pre className="code-window-body">
        <code
          dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
        />
      </pre>
    </div>
  );
}
