"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "./icons";

type CopyEmailProps = {
  email: string;
};

export function CopyEmail({ email }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      className="copy-email"
      onClick={handleCopy}
      aria-label={
        copied ? "E-mail copiado" : `Copiar o e-mail ${email}`
      }
    >
      <span>{email}</span>
      {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
      <span className="copy-email-feedback" aria-live="polite">
        {copied ? "Copiado" : ""}
      </span>
    </button>
  );
}
