import Link from "next/link";
import { site } from "@/data/site";
import { ArrowUpRight, GithubIcon, MailIcon } from "./icons";
import { BrandMark } from "./brand-mark";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <BrandMark />
          <div>
            <strong>Brendon Tailor</strong>
            <span>Full-stack developer</span>
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
            <span className="visually-hidden"> (abre em nova aba)</span>
          </a>
          <Link href="/#cases">
            Cases
            <ArrowUpRight size={14} />
          </Link>
          <Link href="/termos">
            Termos
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
