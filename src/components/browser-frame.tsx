import type { ReactNode } from "react";

type BrowserFrameProps = {
  url: string;
  children: ReactNode;
  className?: string;
  label?: string;
};

export function BrowserFrame({
  url,
  children,
  className = "",
  label,
}: BrowserFrameProps) {
  return (
    <div className={`browser-frame ${className}`.trim()}>
      <div className="browser-bar">
        <span className="browser-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="browser-url">{url}</span>
        {label ? <span className="browser-label">{label}</span> : null}
      </div>
      <div className="browser-media">{children}</div>
    </div>
  );
}
