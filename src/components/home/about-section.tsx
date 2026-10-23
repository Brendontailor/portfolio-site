import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function AboutSection() {
  return (
    <section
      id="sobre"
      className="section about-section"
      aria-labelledby="about-title"
    >
      <div className="container">
        <SectionHeading
          id="about-title"
          number="04"
          eyebrow="Sobre"
          title={
            <>
              Quem está por trás{" "}
              <span className="accent">do código.</span>
            </>
          }
          description={
            <p>
              Não sou uma agência nem um currículo em PDF. Sou uma pessoa que
              gosta de entender o problema, desenhar a solução e acompanhar até
              ela funcionar no mundo real.
            </p>
          }
        />

        <div className="about-grid">
          <Reveal className="about-portrait">
            <div className="about-portrait-grid" aria-hidden="true" />
            <div className="about-portrait-top">
              <span className="eyebrow">Brendon Tailor</span>
              <span className="about-portrait-code">BT / 2026</span>
            </div>
            <div className="about-monogram" aria-hidden="true">
              BT
            </div>
            <div className="about-portrait-bottom">
              <span>Full-stack developer</span>
              <span>Monky Soluções</span>
            </div>
          </Reveal>

          <Reveal className="about-bio" delay={110}>
            <p className="about-lede">
              Sou Brendon Tailor, desenvolvedor full-stack e co-fundador da
              Monky Soluções. Gosto de problemas que começam fora da tela: uma
              operação que trava, uma planilha que não fecha, um processo que só
              existe na cabeça de quem faz.
            </p>
            <p>
              Meu trabalho é traduzir isso em sistema — com regra no lugar
              certo, dados consistentes e uma interface que não exige manual.
              Já coloquei uma loja real em operação, estou construindo uma
              plataforma multi-tenant e mantenho um laboratório de algoritmos e
              experimentos.
            </p>

            <div className="about-principles">
              <div className="principle">
                <span>01</span>
                <div>
                  <strong>Entender a operação antes do código.</strong>
                  <p>
                    O melhor sistema é o que resolve o problema certo, não o que
                    usa a stack da moda.
                  </p>
                </div>
              </div>
              <div className="principle">
                <span>02</span>
                <div>
                  <strong>Colocar a regra no lugar certo.</strong>
                  <p>
                    Preço, permissão e validação não podem depender da boa
                    vontade do navegador.
                  </p>
                </div>
              </div>
              <div className="principle">
                <span>03</span>
                <div>
                  <strong>Entregar o que dá para manter.</strong>
                  <p>
                    Código legível, decisão documentada e uma solução que a
                    próxima pessoa consegue evoluir.
                  </p>
                </div>
              </div>
            </div>

            <div className="about-stack" aria-label="Tecnologias do dia a dia">
              <span>TypeScript</span>
              <span>React</span>
              <span>Next.js</span>
              <span>Node.js</span>
              <span>Express</span>
              <span>Prisma</span>
              <span>PostgreSQL</span>
              <span>Tailwind</span>
              <span>Docker</span>
              <span>Git</span>
            </div>

            <div className="about-now">
              <span className="tag">Agora: Monky Food</span>
              <span className="tag">Estudando: arquitetura &amp; IA aplicada</span>
              <span className="tag">Fora da tela: games e café</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
