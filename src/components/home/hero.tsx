import Image from "next/image";
import { site } from "@/data/site";
import { ArrowDown, ArrowUpRight } from "@/components/icons";
import { BrowserFrame } from "@/components/browser-frame";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-eyebrow">
            <span className="status-dot" aria-hidden="true" />
            {site.availability}
            <span className="hero-eyebrow-sep">/</span>
            {site.location}
          </p>

          <h1 id="hero-title">
            <span className="hero-line">Sistemas que</span>
            <span className="hero-line">
              resolvem <span className="accent">problemas reais.</span>
            </span>
          </h1>

          <p className="hero-lede">
            <strong>Brendon Tailor</strong> — desenvolvedor full-stack que entrega sistemas
            completos: do modelo de dados à interface, da arquitetura à operação.
            <br />
            Cinco cases reais comprovam: SaaS multi-tenant, plataformas white-label,
            PWA offline com mapas, conciliação de bases e e-commerce editorial.
          </p>

          <div className="hero-actions">
            <a href="#cases" className="btn btn-primary">
              Ver os 5 cases
              <ArrowUpRight size={16} />
            </a>
            <a href="#contato" className="btn btn-ghost">
              Falar comigo
            </a>
          </div>

          <div className="hero-meta">
            {site.stats.map((stat) => (
              <div key={stat.label} className="hero-meta-item">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>

          <a href="#cases" className="hero-scroll">
            Role para ver os cases
            <ArrowDown size={14} />
          </a>
        </div>

        <div className="hero-visual-wrap">
          <div
            className="hero-visual"
            role="img"
            aria-label="Prévia de projetos reais"
          >
            <div className="hero-visual-glow" aria-hidden="true" />

            <div className="hero-main-frame">
              <BrowserFrame url="monky.food" label="CASE 02">
                <div className="hero-main-media">
                  <Image
                    src="/images/case-monky-food.webp"
                    alt="Vitrine da Sah Açaí & Cia, primeira operação da Monky Food"
                    fill
                    loading="eager"
                    fetchPriority="high"
                    sizes="(max-width: 900px) 100vw, 46vw"
                    className="object-cover"
                  />
                </div>
              </BrowserFrame>
            </div>

            <div className="hero-sub-frame">
              <div className="hero-sub-top">
                <span>Cliente real</span>
                <span>01</span>
              </div>
              <div className="hero-sub-media">
                <Image
                  src="/images/case-sah-acai.webp"
                  alt="Copo de açaí da Sah Açaí & Cia"
                  fill
                  sizes="(max-width: 900px) 45vw, 18vw"
                  className="object-cover"
                />
              </div>
              <div className="hero-sub-bottom">
                <span>Sah Açaí &amp; Cia</span>
                <span>food retail</span>
              </div>
            </div>

            <div className="hero-terminal" aria-hidden="true">
              <div className="hero-terminal-bar">
                <span className="hero-terminal-dot" />
                ~/brendon
              </div>
              <div className="hero-terminal-body">
                <p>
                  <span className="terminal-prompt">$</span> whoami
                </p>
                <p className="terminal-out">brendon.tailor</p>
                <p>
                  <span className="terminal-prompt">$</span> stack
                </p>
                <p className="terminal-out">react · node · postgres</p>
                <p>
                  <span className="terminal-prompt">$</span>{" "}
                  <span className="terminal-cursor" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
