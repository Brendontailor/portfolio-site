"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { ArrowUpRight, CloseIcon, MenuIcon } from "./icons";
import { BrandMark } from "./brand-mark";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

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

  const closeMenu = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const menu = menuRef.current;
    if (!menu) return;

    const getFocusable = () =>
      Array.from(
        menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      );

    menu.querySelector<HTMLElement>(".menu-button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab") return;

      const items = getFocusable();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first || !menu.contains(active)) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (active === last || !menu.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, closeMenu]);

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
              ref={triggerRef}
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
        ref={menuRef}
        id="mobile-menu"
        className={`mobile-menu ${open ? "open" : ""}`}
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
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
              onClick={closeMenu}
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
              <span className="visually-hidden"> (abre em nova aba)</span>
            </a>
            <span>{site.location}</span>
          </div>
        </div>
      </div>
    </>
  );
}
