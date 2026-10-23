import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  GithubIcon,
} from "@/components/icons";
import { cases, getCase, getNextCase } from "@/data/cases";

export const instant = false;

type CasePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return cases.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCase(slug);

  if (!study) {
    return { title: "Case não encontrado" };
  }

  return {
    title: study.title,
    description: study.summary,
    alternates: {
      canonical: `/cases/${study.slug}`,
    },
    openGraph: {
      type: "article",
      url: `/cases/${study.slug}`,
      title: `${study.title} — ${study.kicker}`,
      description: study.summary,
      images: [
        {
          url: study.cover,
          width: 1600,
          height: 1000,
          alt: study.coverAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.title} — ${study.kicker}`,
      description: study.summary,
      images: [study.cover],
    },
  };
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params;
  const study = getCase(slug);

  if (!study) notFound();

  const next = getNextCase(slug);

  return (
    <main id="main" className="case-page" tabIndex={-1}>
      <div className="container">
        <header className="case-hero">
          <Link href="/#cases" className="back-link">
            <ArrowRight size={14} className="back-link-icon" />
            Todos os cases
          </Link>

          <div className="case-hero-meta">
            <span>
              {study.index} / 06
            </span>
            <span>{study.type}</span>
            <span>{study.year}</span>
            <span>{study.status}</span>
          </div>

          <h1>{study.title}</h1>
          <p className="case-hero-kicker">{study.kicker}</p>
          <p className="case-hero-summary">{study.summary}</p>

          <div className="case-hero-foot">
            <div className="case-hero-tags">
              {study.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>

            <div className="case-hero-actions">
              {study.links?.length ? (
                study.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-small btn-ghost"
                  >
                    {link.kind === "repo" ? (
                      <GithubIcon size={14} />
                    ) : null}
                    {link.label}
                    <ArrowUpRight size={14} />
                  </a>
                ))
              ) : (
                <span className="private-note">Sistema privado</span>
              )}
            </div>
          </div>
        </header>

        <div className="case-hero-image">
          <Image
            src={study.cover}
            alt={study.coverAlt}
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="container case-layout">
        <aside className="case-sidebar" aria-label="Resumo do case">
          <div className="meta-row">
            <span>Tipo</span>
            <strong>{study.type}</strong>
          </div>
          <div className="meta-row">
            <span>Papel</span>
            <strong>{study.role}</strong>
          </div>
          <div className="meta-row">
            <span>Ano</span>
            <strong>{study.year}</strong>
          </div>
          <div className="meta-row">
            <span>Status</span>
            <strong>{study.status}</strong>
          </div>
          <div className="meta-row">
            <span>Stack</span>
            <strong>{study.stack[0]?.items.join(" · ")}</strong>
          </div>

          {study.links?.length ? (
            <div className="case-sidebar-links">
              {study.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label}
                  <ArrowUpRight size={14} />
                </a>
              ))}
            </div>
          ) : (
            <p className="case-sidebar-note">Código e dados privados.</p>
          )}
        </aside>

        <article className="case-content">
          <section aria-labelledby="case-context">
            <h2 id="case-context">Contexto</h2>
            <p>{study.context}</p>
          </section>

          <section aria-labelledby="case-problem">
            <h2 id="case-problem">O problema</h2>
            <p>{study.problem}</p>
          </section>

          <section aria-labelledby="case-solution">
            <h2 id="case-solution">A solução</h2>
            <p>{study.solution}</p>
          </section>

          <section aria-labelledby="case-decisions">
            <h2 id="case-decisions">Decisões técnicas</h2>
            <div className="decision-grid">
              {study.decisions.map((decision) => (
                <div key={decision.title} className="decision">
                  <h3>{decision.title}</h3>
                  <p>{decision.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="case-results">
            <h2 id="case-results">O que foi feito</h2>
            <ul className="case-list">
              {study.results.map((result) => (
                <li key={result}>{result}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="case-stack">
            <h2 id="case-stack">Stack</h2>
            <div className="stack-grid">
              {study.stack.map((group) => (
                <div key={group.label} className="stack-item">
                  <h3>{group.label}</h3>
                  <p>{group.items.join(" · ")}</p>
                </div>
              ))}
            </div>
          </section>

          {study.gallery?.length ? (
            <section aria-labelledby="case-gallery">
              <h2 id="case-gallery">Galeria</h2>
              <div className="gallery">
                {study.gallery.map((image) => (
                  <figure
                    key={image.src}
                    className={`gallery-item ${image.aspect === "3 / 4" ? "gallery-item-portrait" : ""}`.trim()}
                  >
                    <div
                      className="gallery-media"
                      style={
                        image.aspect
                          ? { aspectRatio: image.aspect }
                          : undefined
                      }
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 900px) 100vw, 800px"
                        className="object-cover"
                      />
                    </div>
                    <figcaption>{image.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          ) : null}

          <p className="case-note">{study.statusNote}</p>
        </article>
      </div>

      <div className="container">
        <Link href={`/cases/${next.slug}`} className="next-case">
          <span className="next-case-eyebrow">Próximo case</span>
          <div className="next-case-main">
            <div>
              <h2>{next.title}</h2>
              <p>{next.kicker}</p>
            </div>
            <span className="next-case-arrow" aria-hidden="true">
              <ArrowUpRight size={36} />
            </span>
          </div>
        </Link>
      </div>
    </main>
  );
}
