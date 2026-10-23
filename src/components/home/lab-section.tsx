import { labItems } from "@/data/lab";
import { ArrowUpRight } from "@/components/icons";
import { CodeBlock } from "@/components/code-block";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function LabSection() {
  return (
    <section
      id="laboratorio"
      className="section lab-section"
      aria-labelledby="lab-title"
    >
      <div className="container">
        <SectionHeading
          id="lab-title"
          number="03"
          eyebrow="Laboratório"
          title={
            <>
              Onde eu afio <span className="accent">a lâmina.</span>
            </>
          }
          description={
            <p>
              Estudos públicos, exercícios privados e projetos pessoais. Um
              lugar para testar ideia, comparar abordagem e mostrar o processo
              — não só o resultado.
            </p>
          }
        />

        <div className="lab-grid">
          {labItems.map((item, index) => {
            const visibilityClass =
              item.visibility === "Público"
                ? "public"
                : item.visibility === "Privado"
                  ? "private"
                  : "personal";

            return (
            <Reveal
              key={item.id}
              className={`lab-card lab-${item.size}`}
              delay={Math.min(index * 70, 240)}
            >
              <CodeBlock code={item.code} file={item.file} />
              <div className="lab-body">
                <div className="lab-kicker">
                  <span>{item.label}</span>
                  <span
                    className={`lab-visibility lab-visibility-${visibilityClass}`}
                  >
                    {item.visibility}
                  </span>
                </div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="lab-tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="lab-meta">
                  <span>
                    {item.id} / {item.size === "featured" ? "estudo" : "nota"}
                  </span>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer">
                      Abrir repositório
                      <ArrowUpRight size={14} />
                    </a>
                  ) : (
                    <span>sem link público</span>
                  )}
                </div>
              </div>
            </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
