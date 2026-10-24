# Recruiter-Focused Full-Stack Cases Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Help full-stack recruiters evaluate selected live work and understand each case's high-level modules, technologies, and the developer's contribution without disclosing private implementation details.

**Architecture:** Add curated, high-level module descriptions to case data and render them on case pages alongside existing decisions and grouped stack. Keep each portfolio card's internal case link intact and add a separate external action only for data links with `kind: "live"`; do not nest anchors.

**Tech Stack:** Next.js 16.4.2 App Router, React 19, TypeScript, global CSS, existing case data.

**Spec:** `docs/superpowers/specs/2026-10-24-recruiter-full-stack-cases-design.md`

## Global Constraints

- Preserve the existing stack, visual identity, and confirmed content; add no new dependency.
- Do not invent architecture, public URLs, metrics, results, or access permissions.
- Do not publish private source code, credentials, secrets, personal/customer data, private admin URLs, non-public API routes, IPs, detailed database schema, or internal infrastructure topology.
- Module descriptions must be high-level and curated from confirmed case material; screenshots must use public, synthetic, or suitably redacted data.
- Only show an external project action when the case has an explicitly approved `kind: "live"` link; repositories remain distinct.
- Do not deploy or push as part of implementation.

## Review Focus

- A repository link or a case with no approved live URL must not get a “live project” action — inspect rendered links for a `kind: "repo"` case and a case without live links.
- Live-site and case links must not be nested or ambiguous — inspect DOM structure and keyboard tab order on a card with a live URL.
- Architecture content must remain high-level and supported by case notes — review each module label/responsibility against `context`, `solution`, and `decisions`; remove anything not evidenced.
- Private cases must not expose private destinations or customer data — inspect generated case HTML and the rendered detail view for forbidden values/content.
- Module lists and card actions must remain usable on small screens — verify at 375px and 768px, including focusable link names.

---

### Task 1: Curated module maps on case pages

**Files:**
- Modify: `src/data/cases.ts` (`CaseStudy` type and individual case entries)
- Modify: `src/app/cases/[slug]/page.tsx` (module section)
- Modify: `src/app/globals.css` (module layout and responsive styles)

**Interfaces:**
- Produces: required `CaseStudy.architecture` with `summary: string` and `modules: { name: string; responsibility: string }[]` for each of the six cases.
- The case page consumes this field to render a concise “Módulos do sistema” section for every case.

- [ ] **Step 1: Add only evidence-backed module summaries**

Add the required `architecture` shape to `CaseStudy` and provide a concise summary plus at least two evidence-backed modules for each of the six cases. Derive only from existing `context`, `solution`, `decisions`, and `results`; preserve explicit authorship/role. Keep wording abstract; do not add internal routes, detailed schema, customer records, or implementation secrets. If any proposed detail is unsupported, omit that detail and describe the known module boundary instead.

- [ ] **Step 2: Render the module section conditionally**

On the case detail page, render “Módulos do sistema” after “A solução” and before “Decisões técnicas” for all six cases. Show its summary and module names/responsibilities with semantic headings/lists; retain current role, stack, result, gallery, and status sections.

- [ ] **Step 3: Style the section responsively**

Use existing case-page tokens and grid conventions. Confirm module descriptions wrap without horizontal overflow at 375px and 768px.

- [ ] **Step 4: Verify data and page output**

Run `npm run lint` and `npm run build`. Open cases representing client work, multi-tenant SaaS, and internal tools in the production browser; confirm each module section renders. Review all six module descriptions against source case text and verify the existing role and access restrictions remain visible.

### Task 2: Public live links on homepage case cards

**Files:**
- Modify: `src/components/home/cases-section.tsx` (wrap card and sibling actions)
- Modify: `src/app/globals.css` (home-card external action styles)
- Reuse: `CaseStudy.links` from `src/data/cases.ts`

**Interfaces:**
- Consumes: existing `CaseStudy.links?: CaseLink[]`, filtering strictly to `kind === "live"`.
- The detail-page action and card action remain separate links; never render an external anchor inside the existing full-card `<Link>`.

- [ ] **Step 1: Add a sibling external action for live URLs**

Keep the current “Ver case” card link. At the case-card entry level, render a separate external link for each explicitly approved `kind: "live"` link, retaining its curated label, `target="_blank"`, and `rel="noreferrer"`. Do not render repository links as live-site actions. Cases without `kind: "live"` retain only the case link.

- [ ] **Step 2: Style and check card interactions**

Style the external action consistently with existing buttons and accents. Verify that the DOM has sibling anchors (not nested links), visible labels distinguish “Ver case” from visiting the external site, and both links are keyboard reachable.

- [ ] **Step 3: Verify homepage output and responsive behavior**

Run `npm run lint`, `npm run build`, and `git diff --check`. In the production browser, check a live-linked case, a repository-only case, and a case with no external link; verify only the live-linked case receives the external action, and check layouts at 375px and 768px with no console errors.
