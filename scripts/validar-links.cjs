// scripts/validar-links.cjs
// Valida links relativos em arquivos Markdown, ignorando blocos e trechos de codigo.
// Uso: node scripts/validar-links.cjs [diretorio-raiz]

const fs = require('fs');
const path = require('path');

const DIRETORIOS_IGNORADOS = new Set(['node_modules', '.git', 'graphify-out', 'dist', 'build', '.next']);

// Artefatos gerados por ferramentas: citados na documentacao, nao versionados.
const ARTEFATOS_GERADOS = new Set(['GRAPH_REPORT.md']);

// Documentos historicos que descrevem estrutura planejada (nao implementada).
const EXCECOES_CITADOS = new Set([path.join('memoria', 'PLANO-TRANSFORMACAO.md')]);

// Arquivos que existem no repo AGENT-BIBLE raiz, referenciados por projetos consumidores
const REFERENCIAS_AGENT_BIBLE_RAIZ = new Set([
  'INDEX.md', 'ORCHESTRATOR.md', 'INTERVIEW.md', 'SKILLS-CATALOG.md',
  'TOOLS-AND-MCP.md', 'SKILLS-SELECTION-MATRIX.md', 'ARCHITECTURE.md',
  'AGENTS.md', 'CHANGELOG.md', 'CONTRIBUTING.md', 'README.md', 'LICENSE'
]);

function removerCodigo(texto) {
  // Remove blocos cercados por ``` ou ~~~ e trechos entre crases simples.
  const semBlocos = texto.replace(/(^|\n)[ \t]*(```|~~~)[\s\S]*?\n[ \t]*\2[^\n]*/g, '\n');
  return semBlocos.replace(/`[^`\n]*`/g, '');
}

function listarTodosMarkdown(dir, encontrados = []) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    if (DIRETORIOS_IGNORADOS.has(item.name)) continue;
    const completo = path.join(dir, item.name);
    if (item.isDirectory()) listarTodosMarkdown(completo, encontrados);
    else if (item.name.endsWith('.md')) encontrados.push(completo);
  }
  return encontrados;
}

function listarMarkdownParaValidar(dir, encontrados = []) {
  // Nao valida links DENTRO de templates (sao templates, nao docs reais)
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    if (DIRETORIOS_IGNORADOS.has(item.name) || item.name === 'templates') continue;
    const completo = path.join(dir, item.name);
    if (item.isDirectory()) listarMarkdownParaValidar(completo, encontrados);
    else if (item.name.endsWith('.md')) encontrados.push(completo);
  }
  return encontrados;
}

function validarLinks(raiz = process.cwd()) {
  // 1. Coletar TODOS os nomes de arquivos .md (incluindo templates) para resolucao de nomes
  const todosArquivos = listarTodosMarkdown(raiz);
  const nomesConhecidos = new Set(todosArquivos.map((f) => path.basename(f)));

  // 2. Arquivos a validar (excluindo templates)
  const arquivos = listarMarkdownParaValidar(raiz);
  const quebrados = [];
  const citadosQuebrados = [];
  let verificados = 0;

  for (const arquivo of arquivos) {
    const bruto = fs.readFileSync(arquivo, 'utf8');

    // 1. Links Markdown relativos
    const conteudo = removerCodigo(bruto);
    for (const match of conteudo.matchAll(/\]\(([^)]+)\)/g)) {
      const alvo = match[1].trim();
      if (!alvo || /^(https?:|mailto:|#|data:)/.test(alvo)) continue;
      verificados++;
      const caminho = decodeURIComponent(alvo.split('#')[0]);
      if (!caminho) continue;
      if (!fs.existsSync(path.resolve(path.dirname(arquivo), caminho))) {
        quebrados.push({
          arquivo: path.relative(raiz, arquivo),
          alvo,
        });
      }
    }

    // 2. Caminhos .md citados entre crases
    if (EXCECOES_CITADOS.has(path.relative(raiz, arquivo))) continue;

    for (const match of bruto.matchAll(/`([^`\n]+\.md)`/g)) {
      const citado = match[1].trim();
      if (/[\s<>[\]{}*:]/.test(citado) || citado.startsWith('http')) continue;
      if (ARTEFATOS_GERADOS.has(citado)) continue;

      const existe = citado.includes('/')
        ? fs.existsSync(path.resolve(raiz, citado.replace(/^\.\//, '')))
        : nomesConhecidos.has(citado);

      if (!existe) {
        // Ignorar referências a arquivos do AGENT-BIBLE raiz (esperado em projetos consumidores)
        if (REFERENCIAS_AGENT_BIBLE_RAIZ.has(citado)) continue;
        citadosQuebrados.push({
          arquivo: path.relative(raiz, arquivo),
          alvo: citado,
        });
      }
    }
  }

  console.log('🔍 Validando links relativos em Markdown...\n');
  for (const { arquivo, alvo } of quebrados) {
    console.log(`❌ QUEBRADO: ${arquivo} -> ${alvo}`);
  }
  for (const { arquivo, alvo } of citadosQuebrados) {
    console.log(`❌ CITADO INEXISTENTE: ${arquivo} -> ${alvo}`);
  }
  console.log(`\n📊 Links verificados: ${verificados} | Quebrados: ${quebrados.length}`);
  console.log(`📄 Arquivos analisados: ${arquivos.length}`);
  console.log(`🔎 Caminhos .md citados inexistentes: ${citadosQuebrados.length}`);
  return quebrados.concat(citadosQuebrados);
}

if (require.main === module) {
  const quebrados = validarLinks(process.argv[2] || process.cwd());
  if (quebrados.length > 0) {
    console.log('\n❌ Validacao de links falhou.');
    process.exit(1);
  }
  console.log('\n🎉 Nenhum link relativo quebrado.');
}

module.exports = { validarLinks, removerCodigo };