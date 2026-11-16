import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, GithubIcon } from "@/components/icons";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Currículo",
  description:
    "Currículo de Brendon Tailor, desenvolvedor full-stack: React, Next.js, Node.js, TypeScript e PostgreSQL.",
  alternates: {
    canonical: "/cv",
  },
};

const skills = [
  {
    label: "Frontend",
    items: ["React 19", "Next.js (App Router)", "TypeScript", "JavaScript", "Tailwind CSS"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express", "APIs REST", "Prisma", "JWT e cookies HttpOnly"],
  },
  {
    label: "Dados",
    items: ["PostgreSQL", "Neon", "Modelagem relacional", "Migrações"],
  },
  {
    label: "Infra e qualidade",
    items: ["Docker", "Git e GitHub", "GitHub Actions", "Vercel", "Vitest"],
  },
  {
    label: "Automação e IA",
    items: ["n8n", "Webhooks", "Integrações", "Google GenAI"],
  },
];

const projects = [
  {
    name: "Sah Açaí & Cia",
    role: "Sistema de pedidos e painel financeiro · cliente real",
    bullets: [
      "Pedido validado e recalculado no servidor, persistido antes do envio ao WhatsApp.",
      "Painel com lançamentos manuais, custos de embalagem e indicadores da operação.",
    ],
  },
  {
    name: "Monky Food",
    role: "SaaS multi-tenant white-label · produto próprio",
    bullets: [
      "Isolamento de dados por empresa e resolução da loja por domínio.",
      "Migração incremental da primeira operação sem parar a loja.",
    ],
  },
  {
    name: "RoutePilot",
    role: "PWA de planejamento de visitas · produto próprio",
    bullets: [
      "122.919 endereços, 11 regiões operacionais e busca tolerante a acentos.",
      "Operação offline com IndexedDB e Service Worker.",
    ],
  },
  {
    name: "PortCont",
    role: "Conciliação de bases · produto próprio",
    bullets: [
      "Leitura de PDF, XLSX, XLS e CSV com normalização dos registros.",
      "Comparação fuzzy com separação dos casos que exigem revisão humana.",
    ],
  },
  {
    name: "AgendaFlow",
    role: "Agendamentos com automações no n8n · projeto acadêmico",
    bullets: [
      "Confirmação, aviso interno e lembrete de 24 horas disparados pelo n8n.",
      "Agendamento gravado antes do webhook, com timeout curto e lembrete sem duplicidade.",
    ],
  },
  {
    name: "Dropzone",
    role: "E-commerce de streetwear · colaboração",
    bullets: [
      "Frontend da vitrine, catálogo, carrinho, favoritos e sessão de cliente.",
      "Integração com módulos de autenticação, administração e recursos de IA.",
    ],
  },
];

export default function CvPage() {
  return (
    <main id="main" className="cv-page" tabIndex={-1}>
      <div className="cv-toolbar">
        <Link href="/" className="back-link">
          <ArrowRight size={14} className="back-link-icon" />
          Voltar ao portfólio
        </Link>
        <a href={site.cv} download className="btn btn-primary btn-small">
          Baixar PDF
          <ArrowUpRight size={14} />
        </a>
      </div>

      <article className="cv-sheet">
        <header className="cv-head">
          <div>
            <h1>{site.name}</h1>
            <p className="cv-role">
              Desenvolvedor Full-Stack — React, Next.js, Node.js e PostgreSQL
            </p>
          </div>
          <ul className="cv-contact">
            <li>{site.email}</li>
            <li>{site.phone}</li>
            <li>Pelotas / RS · remoto</li>
            <li>
              <a href={site.linkedin}>linkedin.com/in/brendon-tailor-404144284</a>
            </li>
            <li>
              <a href={site.github}>github.com/Brendontailor</a>
            </li>
            <li>
              <a href={site.url}>portfolio-site-brendont.vercel.app</a>
            </li>
          </ul>
        </header>

        <section className="cv-section">
          <h2>Perfil</h2>
          <p>
            Desenvolvedor full-stack em formação (ADS, Senac Pelotas) com 7 anos
            de experiência administrativa no Exército Brasileiro. Construo
            sistemas completos — modelagem de dados, API, interface e operação —
            com foco em confiabilidade e clareza de regras. Seis projetos
            publicados, incluindo um sistema de pedidos em operação para um
            cliente real e uma plataforma SaaS multi-tenant.
          </p>
        </section>

        <section className="cv-section">
          <h2>Competências</h2>
          <dl className="cv-skills">
            {skills.map((group) => (
              <div key={group.label}>
                <dt>{group.label}</dt>
                <dd>{group.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="cv-section">
          <h2>Projetos</h2>
          <div className="cv-projects">
            {projects.map((project) => (
              <div key={project.name} className="cv-project">
                <div className="cv-project-head">
                  <h3>{project.name}</h3>
                  <span>{project.role}</span>
                </div>
                <ul>
                  {project.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="cv-columns">
          <section className="cv-section">
            <h2>Experiência</h2>
            <div className="cv-job">
              <h3>Auxiliar Administrativo</h3>
              <p className="cv-job-meta">Exército Brasileiro · 03/2019 – 02/2026</p>
              <ul>
                <li>Atendimento ao público e suporte a colaboradores.</li>
                <li>Gestão, organização e arquivamento de documentos.</li>
                <li>Elaboração e controle de relatórios, ofícios e correspondências.</li>
                <li>Operação de sistemas corporativos e cumprimento de prazos.</li>
              </ul>
            </div>
          </section>

          <div>
            <section className="cv-section">
              <h2>Formação</h2>
              <div className="cv-job">
                <h3>Análise e Desenvolvimento de Sistemas</h3>
                <p className="cv-job-meta">Senac Pelotas · 2025 – em andamento</p>
                <p>3º semestre de 6.</p>
              </div>
            </section>

            <section className="cv-section">
              <h2>Idiomas</h2>
              <p>Português — nativo.</p>
            </section>

            <section className="cv-section">
              <h2>Disponibilidade</h2>
              <p>Imediata · CLT ou PJ · remoto ou híbrido em Pelotas.</p>
            </section>
          </div>
        </div>

        <footer className="cv-foot">
          <span>
            Portfólio: <a href={site.url}>{site.url.replace("https://", "")}</a>
          </span>
          <a href={site.github}>
            <GithubIcon size={12} /> {site.github.replace("https://", "")}
          </a>
        </footer>
      </article>
    </main>
  );
}
