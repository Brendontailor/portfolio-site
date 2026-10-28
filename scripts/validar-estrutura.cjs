// scripts/validar-estrutura.js
// Script para validar estrutura obrigatória do repositório

const fs = require('fs');
const path = require('path');

const ESTRUTURA_OBRIGATORIA = {
  // Arquivos raiz
  'AGENTS.md': 'file',
  'README.md': 'file',
  'CHANGELOG.md': 'file',
  'CONTRIBUTING.md': 'file',
  '.gitignore': 'file',
  '.editorconfig': 'file',

  // Diretórios principais
  'docs': 'dir',
  'memoria': 'dir',
  '.opencode': 'dir',
  'checklists': 'dir',
  'templates': 'dir',
  'exemplos': 'dir',
  'scripts': 'dir',
  '.github': 'dir',

  // Docs obrigatórios
  'docs/ARQUITETURA.md': 'file',
  'docs/CODIGO-LIMPO.md': 'file',
  'docs/SEGURANCA.md': 'file',
  'docs/TESTES.md': 'file',
  'docs/FERRAMENTAS-IA.md': 'file',
  'docs/IA-E-CONTEXTO.md': 'file',
  'docs/DECISOES-TECNICAS.md': 'file',
  'docs/BOOTSTRAP-AMBIENTE.md': 'file',
  'docs/VALIDACAO-DO-REPOSITORIO.md': 'file',

  // Memoria obrigatória
  'memoria/ESTADO-ATUAL.md': 'file',
  'memoria/PLANO-DE-EXECUCAO.md': 'file',
  'memoria/HISTORICO-DE-EXECUCAO.md': 'file',
  'memoria/DECISOES.md': 'file',
  'memoria/PENDENCIAS.md': 'file',
  'memoria/PROXIMO-PASSO.md': 'file',

  // Checklists obrigatórios (9)
  'checklists/INICIO.md': 'file',
  'checklists/DESENVOLVIMENTO.md': 'file',
  'checklists/SEGURANCA.md': 'file',
  'checklists/TESTES.md': 'file',
  'checklists/ROTEIRO-DE-TESTES.md': 'file',
  'checklists/REVISAO-DE-CODIGO.md': 'file',
  'checklists/ENTREGA.md': 'file',
  'checklists/PUBLICACAO.md': 'file',
  'checklists/USO-DE-IA.md': 'file',

  // Templates (12)
  'templates/AGENTS.md': 'file',
  'templates/README.md': 'file',
  'templates/ARQUITETURA.md': 'file',
  'templates/DECISAO-TECNICA.md': 'file',
  'templates/PLANO-IMPLEMENTACAO.md': 'file',
  'templates/ESPECIFICACAO-FUNCIONAL.md': 'file',
  'templates/PLANO-TESTES.md': 'file',
  'templates/AUDITORIA-SEGURANCA.md': 'file',
  'templates/REVISAO-CODIGO.md': 'file',
  'templates/RELATORIO-ENTREGA.md': 'file',
  'templates/REGISTRO-INCIDENTE.md': 'file',
  'templates/DIVIDA-TECNICA.md': 'file',

  // Skills locais (7)
  '.opencode/skills/entrevista-orquestradora/SKILL.md': 'file',
  '.opencode/skills/planejamento-de-tarefas/SKILL.md': 'file',
  '.opencode/skills/analise-de-legado/SKILL.md': 'file',
  '.opencode/skills/revisao-de-interface/SKILL.md': 'file',
  '.opencode/skills/auditoria-de-seguranca/SKILL.md': 'file',
  '.opencode/skills/testes-com-roteiro/SKILL.md': 'file',
  '.opencode/skills/revisao-final/SKILL.md': 'file',

  // Plugin graphify (OPCIONAL - ver OPCIONAIS abaixo)

  // GitHub templates
  '.github/ISSUE_TEMPLATE/bug_report.md': 'file',
  '.github/ISSUE_TEMPLATE/feature_request.md': 'file',
  '.github/ISSUE_TEMPLATE/security_report.md': 'file',
  '.github/PULL_REQUEST_TEMPLATE.md': 'file',

  // Exemplos
  'exemplos/arquitetura-modular/backend/prisma/schema.prisma': 'file',
};

// Itens nao obrigatorios: ausencia gera aviso, nao falha.
// O plugin Graphify e uma integracao opcional; o uso via CLI/skill nao depende dele.
const OPCIONAIS = {
  '.opencode/plugins/graphify.js': 'file',
};

function validarEstrutura() {
  console.log('🔍 Validando estrutura do repositório...\n');

  let erros = 0;
  let avisos = 0;
  const faltando = [];

  for (const [caminho, tipo] of Object.entries(ESTRUTURA_OBRIGATORIA)) {
    const caminhoCompleto = path.join(process.cwd(), caminho);
    const existe = fs.existsSync(caminhoCompleto);

    if (!existe) {
      console.log(`❌ FALTANDO: ${caminho} (${tipo})`);
      faltando.push(caminho);
      erros++;
    } else {
      const stat = fs.statSync(caminhoCompleto);
      const tipoReal = stat.isDirectory() ? 'dir' : 'file';

      if (tipoReal !== tipo) {
        console.log(`⚠️  TIPO INCORRETO: ${caminho} (esperado: ${tipo}, encontrado: ${tipoReal})`);
        avisos++;
      } else {
        console.log(`✅ OK: ${caminho}`);
      }
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`\n📊 Resumo da Validação:`);
  console.log(`   ✅ Encontrados: ${Object.keys(ESTRUTURA_OBRIGATORIA).length - erros}`);
  console.log(`   ❌ Faltando: ${erros}`);
  console.log(`   ⚠️  Avisos: ${avisos}`);

  const opcionaisAusentes = Object.keys(OPCIONAIS).filter(
    (caminho) => !fs.existsSync(path.join(process.cwd(), caminho))
  );
  if (opcionaisAusentes.length > 0) {
    console.log('\nℹ️  Opcionais ausentes (nao bloqueiam):');
    opcionaisAusentes.forEach((item) => console.log(`   - ${item}`));
  }

  if (faltando.length > 0) {
    console.log('\n📋 Itens faltando:');
    faltando.forEach(item => console.log(`   - ${item}`));
  }

  if (erros === 0) {
    console.log('\n🎉 Estrutura válida! Todos os itens obrigatórios estão presentes.');
    process.exit(0);
  } else {
    console.log('\n❌ Validação falhou. Itens obrigatórios faltando.');
    process.exit(1);
  }
}

// Verificar também arquivos de exemplo
function validarExemplos() {
  console.log('\n🔍 Validando exemplos de arquitetura...\n');

  const exemplosObrigatorios = [
    'exemplos/arquitetura-modular/backend/prisma/schema.prisma',
    'exemplos/arquitetura-modular/backend/src/types/usuario.types.ts',
    'exemplos/arquitetura-modular/backend/src/validators/usuarios.validator.ts',
    'exemplos/arquitetura-modular/backend/src/repositories/usuarios.repository.ts',
    'exemplos/arquitetura-modular/backend/src/services/usuarios.service.ts',
    'exemplos/arquitetura-modular/backend/src/controllers/usuarios.controller.ts',
    'exemplos/arquitetura-modular/backend/src/routes/usuarios.routes.ts',
    'exemplos/arquitetura-modular/frontend/src/types/usuario.types.ts',
    'exemplos/arquitetura-modular/frontend/src/services/usuarios.api.ts',
    'exemplos/arquitetura-modular/frontend/src/hooks/useUsuarios.ts',
    'exemplos/arquitetura-modular/frontend/src/pages/Usuarios/Lista.tsx',
  ];

  let exemplosFaltando = 0;

  for (const exemplo of exemplosObrigatorios) {
    const caminhoCompleto = path.join(process.cwd(), exemplo);
    if (!fs.existsSync(caminhoCompleto)) {
      console.log(`❌ Exemplo faltando: ${exemplo}`);
      exemplosFaltando++;
    } else {
      console.log(`✅ Exemplo presente: ${exemplo}`);
    }
  }

  if (exemplosFaltando === 0) {
    console.log('\n🎉 Todos os exemplos de arquitetura estão presentes!');
  } else {
    console.log(`\n⚠️  ${exemplosFaltando} exemplo(s) faltando.`);
  }
}

if (require.main === module) {
  validarEstrutura();
  validarExemplos();
}

module.exports = { validarEstrutura, validarExemplos, ESTRUTURA_OBRIGATORIA, OPCIONAIS };