import { manifesto } from "@/data/site";
import { Reveal } from "@/components/reveal";

export function Manifesto() {
  const titleParts = manifesto.title.split(manifesto.highlight);
  const beforeHighlight = titleParts[0];
  const afterHighlight = titleParts[1] || "";

  return (
    <section className="manifesto-section" aria-labelledby="manifesto-title">
      <div className="container manifesto-grid">
        <Reveal className="manifesto-label">
          <p className="eyebrow">
            <span className="manifesto-quote" aria-hidden="true">“</span>
            {manifesto.kicker}
          </p>
        </Reveal>

        <Reveal className="manifesto-copy" delay={90}>
          <blockquote id="manifesto-title">
            <span className="manifesto-title-line">
              {beforeHighlight}
              <mark className="manifesto-highlight">{manifesto.highlight}</mark>
              <span className="manifesto-title-suffix">{afterHighlight}</span>
            </span>
          </blockquote>
          <p className="manifesto-subtitle">
            {manifesto.subtitle}
          </p>
          <span className="manifesto-signature">
            {manifesto.signature}
          </span>
        </Reveal>
      </div>
    </section>
  );
}