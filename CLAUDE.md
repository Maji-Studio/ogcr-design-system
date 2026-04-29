# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server with HMR
- `npm run build` — type-check the project (`tsc -b`) then produce a production build with Vite. The build will fail on TypeScript errors.
- `npm run lint` — run ESLint over the repo
- `npm run preview` — serve the built `dist/` locally to sanity-check the production output

There is no test runner configured yet.

## Stack & architecture

This is the scaffold for the OGCR design system. It is currently a fresh **Vite + React 19 + TypeScript** project — the design system itself has not been built yet, so most directories you'd expect (components, tokens, stories, docs) do not exist.

A few non-obvious facts about the toolchain that span multiple files:

- **React Compiler is enabled.** `vite.config.ts` wires `@rolldown/plugin-babel` with `reactCompilerPreset()` alongside `@vitejs/plugin-react`. Components are auto-memoized at build time; avoid hand-written `useMemo` / `useCallback` / `React.memo` unless the compiler can't handle the case. Adding Babel to the pipeline makes dev/build noticeably slower than vanilla Vite.
- **TypeScript uses project references.** `tsconfig.json` is a composite root that delegates to `tsconfig.app.json` (browser code under `src/`) and `tsconfig.node.json` (the Vite config itself). Build runs `tsc -b`, so both projects must type-check.
- **Theming is plain CSS custom properties.** `src/index.css` defines tokens (colors, typography, etc.) with a `prefers-color-scheme: dark` override. No Tailwind, CSS-in-JS, or token-generation pipeline. Prefer extending the CSS-variable approach rather than introducing a styling framework without discussion.
- **ESLint flat config** in `eslint.config.js` extends `js.configs.recommended`, `tseslint.configs.recommended`, `reactHooks.configs.flat.recommended`, and `reactRefresh.configs.vite`. `dist/` is globally ignored.

## Notes for future work

- The `README.md` is still the default Vite template and does not describe this project.
- There are no Cursor/Copilot rules and no prior CLAUDE.md guidance to inherit from.
- Because the project is bare, when asked to "add a component" or similar, confirm where it should live before scattering files — early decisions here will become the design system's structure.
