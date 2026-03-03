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

> `ng` is not installed globally — always use `npx ng` or `node node_modules/@angular/cli/bin/ng.js`.

## Architecture

This is an Angular 21 single-page portfolio application targeting GitHub Pages deployment.

### Angular 21 conventions

- **No NgModules** — all components are standalone (`imports: [...]` inside `@Component`)
- **File naming**: `app.ts` / `app.html` / `app.scss` (not `app.component.ts`)
- **Test runner**: Vitest (not Karma/Jasmine)
- **Strict TypeScript**: `strict`, `strictTemplates`, `noImplicitReturns` all enabled

### Planned folder structure

```
src/app/
├── core/
│   ├── models/          # project.model.ts, stack-item.model.ts
│   └── services/        # projects.service.ts (loads assets/data/projects.json)
├── layout/
│   ├── navbar/          # fixed nav with anchor links
│   └── footer/
├── sections/
│   ├── hero/
│   ├── projects/
│   │   └── project-card/
│   ├── stack/
│   └── contact/         # ReactiveFormsModule → Formspree
└── shared/
    └── directives/
        └── reveal.directive.ts   # IntersectionObserver scroll animation
```

### Data flow

Projects are loaded from `src/assets/data/projects.json` via `ProjectsService` (HttpClient). To add/edit projects, only the JSON file needs to be changed — no component code required. `HttpClient` must be provided in `app.config.ts` via `provideHttpClient()`.

### Styles

Global design tokens are in `src/styles/_variables.scss` (CSS custom properties: `--bg`, `--accent`, `--surface`, etc.). Fonts loaded from Google Fonts: DM Sans, Playfair Display, DM Mono.

### GitHub Pages deployment

- Build with `--base-href "/portfolio/"` (adjust to match the actual repo name)
- A `src/404.html` (identical to `index.html`) is required for SPA routing on GitHub Pages
- Deploy via `angular-cli-ghpages`: `npx angular-cli-ghpages --dir=dist/portfolio/browser`
- Output path: `dist/portfolio/browser`
