# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development server (http://localhost:4200)
npx ng serve

# Production build
npx ng build

# Watch mode (development)
npx ng build --watch --configuration development

# Run unit tests (Vitest)
npx ng test

# Generate a component
npx ng generate component sections/my-section --standalone

# Deploy to GitHub Pages (after adding the deploy script)
npm run deploy
```

> `ng` is not installed globally â€” always use `npx ng` or `node node_modules/@angular/cli/bin/ng.js`.

## Architecture

This is an Angular 21 single-page portfolio application targeting GitHub Pages deployment.

### Angular 21 conventions

- **No NgModules** â€” all components are standalone (`imports: [...]` inside `@Component`)
- **File naming**: `app.ts` / `app.html` / `app.scss` (not `app.component.ts`)
- **Test runner**: Vitest (not Karma/Jasmine)
- **Strict TypeScript**: `strict`, `strictTemplates`, `noImplicitReturns` all enabled

### Planned folder structure

```
src/app/
â”œâ”€â”€ core/
â”‚   â”œâ”€â”€ models/          # project.model.ts, stack-item.model.ts
â”‚   â””â”€â”€ services/        # projects.service.ts (loads assets/data/projects.json)
â”œâ”€â”€ layout/
â”‚   â”œâ”€â”€ navbar/          # fixed nav with anchor links
â”‚   â””â”€â”€ footer/
â”œâ”€â”€ sections/
â”‚   â”œâ”€â”€ hero/
â”‚   â”œâ”€â”€ projects/
â”‚   â”‚   â””â”€â”€ project-card/
â”‚   â”œâ”€â”€ stack/
â”‚   â””â”€â”€ contact/         # ReactiveFormsModule â†’ Formspree
â””â”€â”€ shared/
    â””â”€â”€ directives/
        â””â”€â”€ reveal.directive.ts   # IntersectionObserver scroll animation
```

### Data flow

Projects are loaded from `public/data/projects.json` via `ProjectsService` (HttpClient). Static assets go in `public/` (Angular 21 convention â€” served at root). To add/edit projects, only the JSON file needs to be changed. `provideHttpClient()` is already in `app.config.ts`.

### Styles

Global design tokens are in `src/styles/_variables.scss` (CSS custom properties: `--bg`, `--accent`, `--surface`, etc.). Fonts loaded from Google Fonts: DM Sans, Playfair Display, DM Mono.

### GitHub Pages deployment

- `baseHref: "/portfolio/"` is set in `angular.json` under `configurations.production` â€” **do NOT pass `--base-href` as a CLI argument** (Git Bash on Windows converts `/portfolio/` to `C:/Program Files/Git/portfolio/`, breaking the build)
- Deploy: `npm run deploy` (runs `ng build && npx angular-cli-ghpages --dir=dist/portfolio/browser`)
- Output path: `dist/portfolio/browser`
- A `public/404.html` (SPA redirect script) is required for GitHub Pages routing


---

# Claude Project Instructions

## Skills disponibles

Avant toute tÃ¢che frontend, lire les skills correspondants dans `.claude/skills/` :

| Skill | Fichier | Quand l'utiliser |
|-------|---------|-----------------|
| **Frontend Design** | `frontend-design.md` | Tout composant UI, page, layout, design system |
| **shadcn/ui** | `shadcn-ui.md` | Tout projet utilisant shadcn/ui ou Radix UI |
| **Web Accessibility** | `web-accessibility.md` | Tout Ã©lÃ©ment interactif, formulaire, navigation |
| **Web Design Guidelines** | `web-design-guidelines.md` | Spacing, typo, responsive, performance, UX patterns |

## Workflow Claude Code

**Toujours dÃ©composer en Ã©tapes validÃ©es une par une.**
Proposer un checkpoint avant chaque action lourde (agent, gÃ©nÃ©ration massive, deploy).

## Stack par dÃ©faut

- Framework : Next.js (App Router) ou Vite + React
- Styling : Tailwind CSS v3 + shadcn/ui
- Forms : react-hook-form + zod
- State : Zustand ou React Query selon besoin
- Deploy : Vercel

## Conventions de code

- TypeScript strict â€” pas de `any` sans justification
- Composants : PascalCase, fichiers kebab-case
- Hooks custom dans `hooks/`, utils dans `lib/`
- Pas de logique dans les composants UI â€” extraire dans des hooks
- `cn()` obligatoire pour les className conditionnels

