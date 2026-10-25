import { knowledgeLayers } from "@/data/knowledge";
import { ArrowUpRight } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function KnowledgeSection() {
  return (
    <section
      id="conhecimento"
      className="section knowledge-section"
      aria-labelledby="knowledge-title"
    >
      <div className="container">
        <SectionHeading
          id="knowledge-title"
          number="02"
          eyebrow="Conhecimento"
          title={
            <>
              O que eu sei <span className="accent">construir.</span>
            </>
          }
          description={
            <p>
              Não é uma lista de tecnologias. É o que entra em jogo para tirar
              um sistema do papel e mantê-lo de pé depois que a novidade passa.
            </p>
          }
        />

        <div className="knowledge-layout">
          <Reveal className="knowledge-sticky">
            <p className="eyebrow">Mapa de trabalho</p>
            <div className="knowledge-big" aria-hidden="true">
              09
            </div>
            <p className="knowledge-big-label">camadas que se conectam</p>
            <p className="knowledge-note">
              Fundamentos, regra de negócio, arquitetura, dados, infraestrutura
              e IA. Cada camada existe porque algum problema real pediu.
            </p>
            <a href="#contato" className="text-link">
              Vamos conversar
              <ArrowUpRight size={15} />
            </a>
          </Reveal>

          <div className="knowledge-list">
            {knowledgeLayers.map((layer, index) => (
              <Reveal
                key={layer.id}
                className="knowledge-row"
                delay={Math.min(index * 35, 220)}
              >
                <span className="knowledge-num">{layer.id}</span>
                <div className="knowledge-content">
                  <h3>{layer.title}</h3>
                  <p>{layer.description}</p>
                  <div className="chips">
                    {layer.items.map((item) => (
                      <span key={item} className="chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
