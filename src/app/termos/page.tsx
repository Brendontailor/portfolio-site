import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Termos e Condições",
  description: "Termos e condições de uso do portfólio de Brendon Tailor",
  robots: "noindex, nofollow",
};

export default function TermosPage() {
  return (
    <main id="main" className="legal-page" tabIndex={-1}>
      <div className="container">
        <Link href="/" className="back-link">
          <ArrowRight size={14} className="back-link-icon" />
          Voltar ao portfólio
        </Link>

        <header className="legal-hero">
          <h1>Termos e Condições</h1>
          <p className="legal-updated">Atualizado em 27 de outubro de 2026</p>
        </header>

        <article className="legal-content">
          <section>
            <h2>1. Uso do site</h2>
            <p>
              Este portfólio é um site pessoal de demonstração de projetos e habilidades.
              O acesso é livre e não requer cadastro. Não há área restrita, coleta de
              dados sensíveis nem funcionalidades transacionais.
            </p>
          </section>

          <section>
            <h2>2. Propriedade intelectual</h2>
            <p>
              O conteúdo deste site (textos, imagens, código de exemplo, estrutura)
              é de autoria de <strong>Brendon Tailor</strong>, salvo indicação contrária
              nos cases colaborativos. Os cases de clientes e produtos próprios
              têm código e dados privados — apenas a descrição pública é exibida aqui.
            </p>
          </section>

          <section>
            <h2>3. Links externos</h2>
            <p>
              O site contém links para projetos ao vivo, repositórios públicos e
              perfis profissionais (GitHub, e-mail). Não me responsabilizo pelo
              conteúdo, disponibilidade ou políticas de terceiros.
            </p>
          </section>

          <section>
            <h2>4. Isenção de responsabilidade</h2>
            <p>
              As informações são apresentadas &ldquo;como estão&rdquo;, sem garantias de
              completude, atualidade ou adequação a qualquer finalidade específica.
              Decisões baseadas no conteúdo deste portfólio são por conta e risco
              do visitante.
            </p>
          </section>

          <section>
            <h2>5. Privacidade</h2>
            <p>
              Este site não utiliza cookies de rastreamento, analytics de terceiros
              nem formulários de captação de dados. O único dado processado
              eventualmente é o endereço de e-mail se você clicar no link de contato
              (abre o cliente de e-mail padrão).
            </p>
          </section>

          <section>
            <h2>6. Alterações</h2>
            <p>
              Estes termos podem ser atualizados a qualquer momento. A data no
              topo reflete a última revisão. O uso contínuo do site após alterações
              constitui aceitação.
            </p>
          </section>

          <section>
            <h2>7. Contato</h2>
            <p>
              Dúvidas sobre estes termos:{" "}
              <a href="mailto:brendontailor040@gmail.com">brendontailor040@gmail.com</a>
            </p>
          </section>
        </article>

        <footer className="legal-foot">
          <p>© 2026 Brendon Tailor. Feito com Next.js, TypeScript e café.</p>
        </footer>
      </div>
    </main>
  );
}