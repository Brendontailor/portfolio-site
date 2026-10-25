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
              <span>Brasil · remoto</span>
            </div>
          </Reveal>

          <Reveal className="about-bio" delay={110}>
            <p className="about-lede">
              Desenvolvo sistemas full-stack há anos — do zero à operação real.
              Minha especialidade: transformar operações caóticas em software que
              roda sem supervisão constante.
            </p>
            <p>
              Cada case deste portfólio prova um ângulo diferente:
            </p>
            <ul className="proof-list">
              <li><strong>Sah Açaí & Cia</strong> — loja real pedindo pelo WhatsApp; backend valida preço, estoque e entrega link só depois de gravar o pedido no PostgreSQL.</li>
              <li><strong>Monky Food</strong> — plataforma white-label multi-tenant: uma base, isolamento por <code>empresaId</code>, vitrine resolve pelo domínio, painel pela sessão.</li>
              <li><strong>RoutePilot</strong> — PWA offline com 120k endereços locais, busca fuzzy, regiões por polígono, rota com revisão humana e impressão A4.</li>
              <li><strong>PortCont</strong> — conciliação de bases: PDF, XLSX, CSV entram no mesmo pipeline; fuzzy matching separa o certo do &ldquo;parecido&rdquo; pra revisão humana.</li>
              <li><strong>Dropzone</strong> — e-commerce editorial com catálogo, carrinho, favoritos, auth, admin, avaliações, WhatsApp e módulos de IA (colaboração com Leonardo Rosler).</li>
            </ul>
            <p>
              Stack do dia a dia: TypeScript, React, Next.js, Node.js, Express, Prisma, PostgreSQL, Tailwind, Docker, Git.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
