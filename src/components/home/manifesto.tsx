import { manifesto } from "@/data/site";
import { Reveal } from "@/components/reveal";

export function Manifesto() {
  return (
    <section className="manifesto-section" aria-labelledby="manifesto-title">
      <div className="container manifesto-grid">
        <Reveal className="manifesto-label">
          <p className="eyebrow">Manifesto</p>
          <span className="manifesto-mark" aria-hidden="true">
            “
          </span>
        </Reveal>

        <Reveal className="manifesto-copy" delay={90}>
          <blockquote id="manifesto-title">{manifesto}</blockquote>
          <p>
            Não é sobre saber tudo. É sobre aprender rápido, testar, corrigir e
            entregar algo que funcione. O resto é consequência.
          </p>
          <span className="manifesto-signature">— Brendon Tailor</span>
        </Reveal>
      </div>
    </section>
  );
}
