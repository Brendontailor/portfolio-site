import { site } from "@/data/site";
import { ArrowUpRight, GithubIcon } from "@/components/icons";
import { CopyEmail } from "@/components/copy-email";
import { Reveal } from "@/components/reveal";

export function ContactSection() {
  return (
    <section
      id="contato"
      className="contact-section"
      tabIndex={-1}
      aria-labelledby="contact-title"
    >
      <div className="contact-glow" aria-hidden="true" />
      <div className="container contact-grid">
        <Reveal className="contact-copy">
          <p className="eyebrow">
            <span className="eyebrow-number">05</span>
            <span className="eyebrow-slash">/</span>
            Contato
          </p>
          <h2 id="contact-title">
            Vamos construir algo que{" "}
            <span className="accent">funcione de verdade?</span>
          </h2>
          <p className="contact-lede">
            Se você tem uma operação, uma ideia ou um sistema que precisa sair
            do papel, me chama. Eu respondo.
          </p>

          <div className="contact-actions">
            <a href={`mailto:${site.email}`} className="btn btn-primary">
              Enviar um e-mail
              <ArrowUpRight size={16} />
            </a>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="btn btn-ghost">
              <span className="visually-hidden">Ligar </span>
              {site.phone}
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              <GithubIcon size={16} />
              GitHub
              <span className="visually-hidden"> (abre em nova aba)</span>
            </a>
          </div>

          <div className="contact-meta">
            <CopyEmail email={site.email} />
            <span>
              <span className="status-dot" aria-hidden="true" />
              {site.availability}
            </span>
            <span>{site.location}</span>
            <span>{site.phone}</span>
          </div>
        </Reveal>

        <Reveal className="contact-aside" delay={120}>
          <div className="contact-card">
            <p className="eyebrow">O que eu procuro</p>
            <ul>
              <li>Produtos digitais com problema real</li>
              <li>SaaS, sistemas internos e integrações</li>
              <li>Times pequenos, decisões próximas</li>
            </ul>
            <p className="contact-card-note">
              Se o seu projeto não se encaixa, ainda vale conversar. Eu gosto de
              entender o problema antes de dizer não.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
