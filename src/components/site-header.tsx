"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { ArrowUpRight, CloseIcon, MenuIcon } from "./icons";
import { BrandMark } from "./brand-mark";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <div className="container header-inner">
          <Link href="/" className="brand" aria-label="Brendon Tailor — início">
            <BrandMark />
            <span className="brand-text">
              <span className="brand-name">Brendon Tailor</span>
              <span className="brand-role">full-stack developer</span>
            </span>
          </Link>

          <nav className="nav" aria-label="Navegação principal">
            {site.nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <Link href="/#contato" className="header-cta">
              Contato
              <ArrowUpRight size={14} />
            </Link>
            <button
              type="button"
              className="menu-button"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`mobile-menu ${open ? "open" : ""}`}
        aria-hidden={!open}
      >
        <div className="container mobile-menu-inner">
          <div className="mobile-menu-top">
            <Link href="/" className="brand" onClick={() => setOpen(false)}>
              <BrandMark />
              <span className="brand-text">
                <span className="brand-name">Brendon Tailor</span>
                <span className="brand-role">full-stack developer</span>
              </span>
            </Link>
            <button
              type="button"
              className="menu-button"
              aria-label="Fechar menu"
              onClick={() => setOpen(false)}
            >
              <CloseIcon size={22} />
            </button>
          </div>

          <nav className="mobile-nav" aria-label="Navegação mobile">
            {site.nav.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                <span className="mobile-nav-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{item.label}</span>
                <ArrowUpRight size={20} />
              </Link>
            ))}
            <Link href="/#contato" onClick={() => setOpen(false)}>
              <span className="mobile-nav-index">05</span>
              <span>Contato</span>
              <ArrowUpRight size={20} />
            </Link>
          </nav>

          <div className="mobile-menu-footer">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={site.github} target="_blank" rel="noreferrer">
              GitHub
              <ArrowUpRight size={14} />
            </a>
            <span>{site.location}</span>
          </div>
        </div>
      </div>
    </>
  );
}
