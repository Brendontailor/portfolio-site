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
    label: "Full Stack",
    items: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "APIs REST",
      "Python",
      "PostgreSQL",
      "MySQL",
      "Git/GitHub",
    ],
  },
  {
    label: "Infra e automação",
    items: [
      "Docker",
      "Prisma",
      "GitHub Actions",
      "GitHub Codespaces",
      "GitHub Copilot",
      "Vercel",
      "n8n",
      "Vitest",
    ],
  },
  {
    label: "Operação e Suporte",
    items: [
      "IXCsoft",
      "The Dude",
      "UNM",
      "Controle de agendas, rotas e ordens de serviço",
      "Diagnóstico de falhas de conectividade",
    ],
  },
  {
    label: "Redes e Telecom",
    items: [
      "Fibra óptica",
      "Redes",
      "MikroTik",
      "PPPoE/IP",
      "ONUs/ONTs",
      "Análise de potência RX/TX",
    ],
  },
  {
    label: "Informática",
    items: [
      "Montagem e manutenção de desktops e notebooks",
      "Substituição de componentes",
      "Instalação e formatação de sistemas operacionais",
    ],
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

const jobs = [
  {
    role: "Suporte Técnico N1/N2 / Coordenação de Agendas e Serviços",
    company: "RGSUL Internet",
    period: "06/2026 – Atual · Pelotas/RS",
    bullets: [
      "Gestão de agendas, organização de rotas e despacho de ordens de serviço para as equipes técnicas de campo.",
      "Atendimento a clientes residenciais e corporativos, com diagnóstico inicial de falhas de conectividade.",
      "Abertura e acompanhamento de chamados no IXCsoft, com registro das informações e encaminhamento às áreas responsáveis.",
      "Monitoramento de rede com The Dude e UNM; provisionamento e acompanhamento de ONUs/ONTs, incluindo análise de potência RX/TX.",
    ],
  },
  {
    role: "Auxiliar Administrativo / Secretaria",
    company: "Exército Brasileiro",
    period: "03/2019 – 02/2026",
    bullets: [
      "Atendimento, gestão de documentos, protocolos e demandas administrativas.",
      "Acompanhamento de solicitações e tramitação de processos, com atenção à precisão e ao cumprimento de prazos.",
      "Atuação em ambiente de alta responsabilidade, seguindo procedimentos internos e trabalhando em equipe.",
    ],
  },
];

const courses = [
  {
    role: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
    company: "Senac Pelotas",
    period: "2025 – Atual (4º semestre)",
  },
  {
    role: "Curso de Fibra Óptica do Zero",
    company: "Fiberschool",
    period: "Concluído",
  },
];

const certificates = [
  {
    role: "GitHub Copilot",
    company: "Escola Virtual Gov · Enap",
    period: "2026 · 8h · nota 93,33",
  },
  {
    role: "GitHub Actions",
    company: "Escola Virtual Gov · Enap",
    period: "2026 · 4h · nota 100",
  },
  {
    role: "GitHub Codespaces",
    company: "Escola Virtual Gov · Enap",
    period: "2026 · 3h · nota 100",
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
            <h1>Brendon Tailor dos Santos Cavalheiro</h1>
            <p className="cv-role">
              Desenvolvedor Full Stack · React, Next.js, Node.js, PostgreSQL
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
            Desenvolvedor Full Stack em formação, graduando em Análise e
            Desenvolvimento de Sistemas no Senac (4º semestre), com cinco
            sistemas publicados no portfólio — incluindo um sistema de pedidos em
            operação para um cliente real e uma PWA de planejamento de visitas no
            ar. Estudo programação na graduação e construo aplicações completas,
            do modelo de dados à interface, com React, Next.js, Node.js,
            TypeScript, PostgreSQL e Prisma. Trago sete anos de experiência
            administrativa no Exército e atuação em suporte técnico N1/N2, com
            disciplina, atendimento ao cliente e resolução de problemas.
            Disponível para trabalho remoto (CLT ou PJ) e estágio.
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
            {jobs.map((job) => (
              <div key={job.company} className="cv-job">
                <h3>{job.role}</h3>
                <p className="cv-job-meta">
                  {job.company} · {job.period}
                </p>
                <ul>
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <div>
            <section className="cv-section">
              <h2>Formação</h2>
              {courses.map((course) => (
                <div key={course.role} className="cv-job">
                  <h3>{course.role}</h3>
                  <p className="cv-job-meta">
                    {course.company} · {course.period}
                  </p>
                </div>
              ))}
            </section>

            <section className="cv-section">
              <h2>Cursos e certificações</h2>
              {certificates.map((certificate) => (
                <div key={certificate.role} className="cv-job">
                  <h3>{certificate.role}</h3>
                  <p className="cv-job-meta">
                    {certificate.company} · {certificate.period}
                  </p>
                </div>
              ))}
            </section>

            <section className="cv-section">
              <h2>Idiomas</h2>
              <p>Português — nativo. Inglês — leitura técnica (documentação e código).</p>
            </section>

            <section className="cv-section">
              <h2>Disponibilidade</h2>
              <p>
                Imediata · remoto ou presencial · disponível para viagens · CLT,
                PJ ou estágio · CNH AB.
              </p>
            </section>

            <section className="cv-section">
              <h2>Referências</h2>
              <p>
                9º Batalhão de Infantaria Motorizado (Exército Brasileiro) ·
                Seção Administrativa · (53) 3026-5200.
              </p>
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
