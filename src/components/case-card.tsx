import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/data/cases";
import { ArrowUpRight } from "./icons";

type CaseCardProps = {
  study: CaseStudy;
  priority?: boolean;
  sizes?: string;
};

export function CaseCard({
  study,
  priority = false,
  sizes = "(max-width: 900px) 100vw, 50vw",
}: CaseCardProps) {
  const featured = Boolean(study.featured);
  const wide = Boolean(study.wide);

  return (
    <Link
      href={`/cases/${study.slug}`}
      className={`case-card ${featured ? "case-card-featured" : ""} ${wide ? "case-card-wide" : ""}`.trim()}
      aria-label={`Ver o case ${study.title}`}
    >
      <div className="case-media">
        <Image
          src={study.cover}
          alt={study.coverAlt}
          fill
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          sizes={sizes}
          className="case-cover"
        />
        <div className="case-media-top">
          <span className="case-index">{study.index}</span>
          <span className="case-status">
            <span className="case-status-dot" aria-hidden="true" />
            {study.status}
          </span>
        </div>
      </div>

      <div className="case-body">
        <div className="case-meta">
          <span>{study.type}</span>
          <span>{study.year}</span>
        </div>
        <h3>{study.title}</h3>
        <p className="case-kicker">{study.kicker}</p>
        <p className="case-summary">{study.summary}</p>
        <div className="case-tags">
          {study.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <span className="case-link">
          Ver case
          <ArrowUpRight size={16} />
        </span>
      </div>
    </Link>
  );
}
