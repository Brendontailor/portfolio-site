import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { cases } from "../src/data/cases.ts";
import { knowledgeLayers } from "../src/data/knowledge.ts";
import { labItems } from "../src/data/lab.ts";

const publicDir = join(process.cwd(), "public");
const errors = [];
const warnings = [];
const referenced = new Set();

function requireText(value, label) {
  if (typeof value !== "string" || value.trim() === "") {
    errors.push(`${label} está vazio`);
  }
}

function requirePublicFile(src, label) {
  if (typeof src !== "string" || !src.startsWith("/")) {
    errors.push(`${label} deve começar com "/" (recebido: ${src})`);
    return;
  }

  referenced.add(src);

  if (!existsSync(join(publicDir, src))) {
    errors.push(`${label} aponta para arquivo inexistente: ${src}`);
  }
}

function requireUniqueIds(items, label) {
  const seen = new Set();

  for (const item of items) {
    requireText(item.id, `${label} com id ausente`);
    if (seen.has(item.id)) {
      errors.push(`${label} com id duplicado: ${item.id}`);
    }
    seen.add(item.id);
  }
}

requireUniqueIds(knowledgeLayers, "knowledgeLayers");

for (const layer of knowledgeLayers) {
  requireText(layer.title, `Camada ${layer.id} sem título`);
  requireText(layer.description, `Camada ${layer.id} sem descrição`);
  if (!Array.isArray(layer.items) || layer.items.length === 0) {
    errors.push(`Camada ${layer.id} sem itens`);
  }
}

requireUniqueIds(labItems, "labItems");

for (const item of labItems) {
  requireText(item.name, `Item ${item.id} sem nome`);
  requireText(item.description, `Item ${item.id} sem descrição`);
  requireText(item.file, `Item ${item.id} sem arquivo`);
  requireText(item.label, `Item ${item.id} sem rótulo`);
  if (item.href && !item.href.startsWith("https://")) {
    errors.push(`Item ${item.id} tem href não público: ${item.href}`);
  }
}

const slugs = new Set();

cases.forEach((study, position) => {
  const expectedIndex = String(position + 1).padStart(2, "0");
  const label = `Case ${study.slug ?? position + 1}`;

  if (!study.slug || !/^[a-z0-9-]+$/.test(study.slug)) {
    errors.push(`${label} tem slug inválido`);
  }

  if (slugs.has(study.slug)) {
    errors.push(`Slug duplicado: ${study.slug}`);
  }
  slugs.add(study.slug);

  if (study.index !== expectedIndex) {
    errors.push(
      `${label} tem index "${study.index}", esperado "${expectedIndex}"`,
    );
  }

  for (const field of [
    "title",
    "kicker",
    "type",
    "status",
    "year",
    "role",
    "summary",
    "context",
    "problem",
    "solution",
    "statusNote",
  ]) {
    requireText(study[field], `${label}.${field}`);
  }

  if (!Array.isArray(study.tags) || study.tags.length === 0) {
    errors.push(`${label} sem tags`);
  }

  if (!Array.isArray(study.results) || study.results.length === 0) {
    errors.push(`${label} sem resultados`);
  }

  if (!Array.isArray(study.decisions) || study.decisions.length === 0) {
    errors.push(`${label} sem decisões técnicas`);
  }

  if (!Array.isArray(study.stack) || study.stack.length === 0) {
    errors.push(`${label} sem stack`);
  }

  if (!study.architecture?.modules?.length) {
    errors.push(`${label} sem módulos de arquitetura`);
  }

  requirePublicFile(study.cover, `${label}.cover`);
  requireText(study.coverAlt, `${label}.coverAlt`);

  const ogImage = `/og/${study.slug}.jpg`;
  if (!existsSync(join(publicDir, ogImage))) {
    errors.push(`${label} sem imagem social: ${ogImage}`);
  }

  (study.gallery ?? []).forEach((image, imageIndex) => {
    requirePublicFile(image.src, `${label}.gallery[${imageIndex}].src`);
    requireText(image.alt, `${label}.gallery[${imageIndex}].alt`);
    requireText(image.caption, `${label}.gallery[${imageIndex}].caption`);
  });

  (study.links ?? []).forEach((link) => {
    requireText(link.label, `${label}.link.label`);
    if (!link.href?.startsWith("https://")) {
      errors.push(`${label} tem link não público: ${link.href}`);
    }
  });
});

const imagesDir = join(publicDir, "images");

if (existsSync(imagesDir)) {
  for (const file of readdirSync(imagesDir)) {
    if (!referenced.has(`/images/${file}`)) {
      warnings.push(`Imagem sem referência: /images/${file}`);
    }
  }
}

for (const warning of warnings) {
  console.warn(`aviso: ${warning}`);
}

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`erro: ${error}`);
  }
  console.error(`\nFalha — ${errors.length} erro(s).`);
  process.exit(1);
}

console.log(
  `OK — ${cases.length} cases, ${knowledgeLayers.length} camadas, ${labItems.length} itens de laboratório.`,
);
