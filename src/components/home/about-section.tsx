import Image from "next/image";
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
            <div className="about-portrait-image" aria-hidden="true">
              <Image
                src="/images/brendon-portrait.jpg"
                alt="Brendon Tailor, desenvolvedor full-stack"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="about-portrait-bottom">
              <span>Full-stack developer</span>
              <span>Brasil · remoto</span>
            </div>
          </Reveal>

          <Reveal className="about-bio" delay={110}>
            <p className="about-lede">
              Sou desenvolvedor full-stack e ex-militar, com 7 anos de serviço.
              Atualmente, curso Análise e Desenvolvimento de Sistemas (ADS) no
              Senac, aprofundando minha formação em tecnologia enquanto desenvolvo
              soluções para problemas reais.
            </p>
            <p>
              Minha trajetória combina disciplina, formação técnica e experiência
              prática. Trabalho da arquitetura à implementação, construindo
              sistemas que integram interfaces, APIs, bancos de dados, automações
              e inteligência artificial.
            </p>
            <p>
              Meu foco é transformar processos complexos em software confiável,
              modular e preparado para crescer. Valorizo código organizado,
              decisões técnicas fundamentadas, segurança e soluções que funcionem
              na operação real.
            </p>
            <p>
              Cada projeto do meu portfólio representa um desafio diferente, com
              problemas concretos, decisões de engenharia e soluções desenvolvidas
              para atender a necessidades específicas.
            </p>
            <p className="about-closing">
              Disciplina para executar. Conhecimento para evoluir. Tecnologia para
              resolver problemas reais.
            </p>
            <p>
              Stack do dia a dia: TypeScript, React, Next.js, Node.js, Express,
              Prisma, PostgreSQL, Tailwind, Docker, Git.
            </p>
            <p>
              Git & GitHub: workflow com Conventional Commits, branches por feature,
              PRs com revisão, GitHub Actions para CI/CD (lint, type-check, testes,
              build, deploy preview), semantic-release para versionamento automático
              e changelog. Experiência com monorepos, submodules e migração de histórico.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}