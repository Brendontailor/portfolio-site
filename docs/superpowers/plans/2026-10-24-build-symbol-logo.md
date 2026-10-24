# Build Symbol Logo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the portfolio's BT logo and text favicon with a consistent terminal-prompt symbol.

**Architecture:** Add a small shared React SVG component and use it in the desktop/mobile header and footer. Keep the favicon as a standalone SVG with the same lime tile and dark prompt mark; leave the decorative BT in the About portrait unchanged.

**Tech Stack:** Next.js 16.4.2 App Router, React 19, TypeScript, global CSS, SVG.

**Spec:** `docs/superpowers/specs/2026-10-24-build-symbol-logo-design.md`

## Global Constraints

- Use the existing colors `#C8FF4D` and `#08090A`.
- Use vector SVG; add no dependencies or rasterized text.
- Keep the logo's existing layout, size, name, copy, palette, and navigation.
- Do not change the BT in the About portrait or unrelated content.
- Do not deploy or push as part of implementing the logo.

## Review Focus

- At 16–32 px, the chevron and cursor remain recognizable — inspect the emitted favicon SVG at browser favicon scale.
- Desktop header and footer show the same mark — compare rendered SVG geometry and colors.
- The mobile menu uses the same mark — open the menu at a narrow viewport and inspect it.
- The decorative mark does not duplicate the adjacent accessible name — verify the SVG is hidden from assistive technology.
- The asset change introduces no build, lint, or browser-console errors — run the project's checks and inspect console output.

---

### Task 1: Shared logo mark and favicon

**Files:**
- Create: `src/components/brand-mark.tsx`
- Modify: `src/components/site-header.tsx` (desktop and mobile brand)
- Modify: `src/components/site-footer.tsx`
- Modify: `src/app/globals.css` (`.brand-mark` styles)
- Modify: `src/app/icon.svg`

**Interfaces:**
- Produces: `BrandMark`, a decorative inline SVG React component with no props; size and placement remain controlled by the existing `.brand-mark` CSS class.
- The standalone favicon uses the same silhouette and colors as `BrandMark`.

- [ ] **Step 1: Implement the shared prompt mark**

Create `BrandMark` as an `aria-hidden="true"`, `focusable="false"` SVG. Use a rounded lime square (`#C8FF4D`) and a dark `#08090A` terminal prompt made from a chevron and short cursor line. Replace the three header/footer `BT` spans with this component. Preserve the visible brand name and existing 30px mark footprint.

- [ ] **Step 2: Align existing mark styles**

Update only `.brand-mark` declarations needed for an SVG element (`display`, dimensions, and existing background/color handling); retain the existing hover transition and overall 30px size.

- [ ] **Step 3: Update the favicon SVG**

Replace text in `src/app/icon.svg` with the same lime rounded tile and dark prompt glyph, sized on its existing 64×64 viewBox. Keep the source self-contained and text-free.

- [ ] **Step 4: Run static checks**

Run `npm run lint` and `npm run build`; both must exit successfully. Run `git diff --check`; it must report no whitespace errors.

- [ ] **Step 5: Verify the rendered identity**

Run the production build locally and inspect the homepage in a browser at desktop and mobile widths. Confirm header, opened mobile menu, and footer all show the same symbol; inspect `/icon.svg`; verify the SVG is decorative and the browser console has no errors.
