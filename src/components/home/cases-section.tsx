import { cases } from "@/data/cases";
import { ArrowUpRight } from "@/components/icons";
import { CaseCard } from "@/components/case-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function CasesSection() {
  return (
    <section
      id="cases"
      className="section cases-section"
      aria-labelledby="cases-title"
    >
      <div className="container">
        <SectionHeading
          id="cases-title"
          number="01"
          eyebrow="Cases"
          title={
            <>
              Trabalho que existe{" "}
              <span className="accent">fora do portfólio.</span>
            </>
          }
          description={
            <p>
              Seis recortes de produtos reais: cliente, SaaS, dados, mapa e
              colaboração. Cada case mostra o contexto, a decisão e o que foi
              construído — sem expor código ou dados.
            </p>
          }
        />

        <div className="cases-grid">
          {cases.map((study, index) => {
            const slot = study.featured
              ? "case-slot featured"
              : study.wide
                ? "case-slot wide"
                : "case-slot";

            return (
              <Reveal
                key={study.slug}
                className={slot}
                delay={Math.min(index * 70, 280)}
              >
                <CaseCard
                  study={study}
                  priority={index === 0}
                  sizes={
                    study.featured
                      ? "(max-width: 900px) 100vw, 58vw"
                      : study.wide
                        ? "(max-width: 900px) 100vw, 66vw"
                        : "(max-width: 900px) 100vw, 50vw"
                  }
                />
              </Reveal>
            );
          })}
        </div>

        <Reveal className="cases-footnote">
          <p>
            As imagens são capturas reais das interfaces e fotos dos produtos.
            Nenhum dado sensível de cliente é exibido.
          </p>
          <a
            href="https://github.com/Brendontailor/portfolio"
            target="_blank"
            rel="noreferrer"
          >
            Vitrine no GitHub
            <ArrowUpRight size={14} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
