import Link from "next/link";
import { site } from "@/data/site";
import { ArrowUpRight, GithubIcon, MailIcon } from "./icons";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="brand-mark" aria-hidden="true">
            BT
          </span>
          <div>
            <strong>Brendon Tailor</strong>
            <span>Full-stack developer · Monky Soluções</span>
          </div>
        </div>

        <div className="footer-links">
          <a href={`mailto:${site.email}`}>
            <MailIcon size={14} />
            E-mail
          </a>
          <a href={site.github} target="_blank" rel="noreferrer">
            <GithubIcon size={14} />
            GitHub
          </a>
          <Link href="/#cases">
            Cases
            <ArrowUpRight size={14} />
          </Link>
          <a href="#main">Topo ↑</a>
        </div>

        <p className="footer-note">
          © 2026 Brendon Tailor. Feito com Next.js, TypeScript e café.
        </p>
      </div>
    </footer>
  );
}
