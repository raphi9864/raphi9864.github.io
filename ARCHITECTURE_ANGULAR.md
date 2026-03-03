# Architecture Angular — Portfolio Hub

## Structure du projet

```
portfolio/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── models/
│   │   │   │   ├── project.model.ts
│   │   │   │   └── stack-item.model.ts
│   │   │   └── services/
│   │   │       ├── projects.service.ts     ← données projets (JSON local)
│   │   │       └── scroll.service.ts       ← IntersectionObserver partagé
│   │   │
│   │   ├── layout/
│   │   │   ├── navbar/
│   │   │   │   ├── navbar.component.ts
│   │   │   │   ├── navbar.component.html
│   │   │   │   └── navbar.component.scss
│   │   │   └── footer/
│   │   │       ├── footer.component.ts
│   │   │       └── footer.component.html
│   │   │
│   │   ├── sections/
│   │   │   ├── hero/
│   │   │   │   ├── hero.component.ts
│   │   │   │   ├── hero.component.html
│   │   │   │   └── hero.component.scss
│   │   │   ├── projects/
│   │   │   │   ├── projects.component.ts
│   │   │   │   ├── projects.component.html
│   │   │   │   ├── project-card/
│   │   │   │   │   ├── project-card.component.ts
│   │   │   │   │   └── project-card.component.html
│   │   │   ├── stack/
│   │   │   │   ├── stack.component.ts
│   │   │   │   └── stack.component.html
│   │   │   └── contact/
│   │   │       ├── contact.component.ts
│   │   │       └── contact.component.html
│   │   │
│   │   ├── shared/
│   │   │   ├── directives/
│   │   │   │   └── reveal.directive.ts     ← animation scroll réutilisable
│   │   │   └── components/
│   │   │       └── tech-pill/
│   │   │           └── tech-pill.component.ts
│   │   │
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   └── app.routes.ts
│   │
│   ├── assets/
│   │   ├── data/
│   │   │   └── projects.json               ← tes projets en JSON (facile à éditer)
│   │   ├── cv/
│   │   │   └── cv-johndoe.pdf
│   │   └── images/
│   │       └── projects/
│   │
│   ├── styles/
│   │   ├── _variables.scss                 ← tokens de design centralisés
│   │   ├── _typography.scss
│   │   ├── _animations.scss
│   │   └── styles.scss                     ← imports globaux
│   │
│   └── index.html
│
├── angular.json
├── package.json
└── README.md
```

---

## Fichiers clés — code complet

### `src/styles/_variables.scss`
```scss
:root {
  --bg:          #10131a;
  --surface:     #1a1f2e;
  --border:      rgba(255,255,255,0.07);
  --accent:      #4F8EF7;
  --accent-dim:  #{rgba(#4F8EF7, 0.12)};
  --green:       #3dd68c;
  --text:        #c8cdd8;
  --text-dim:    #5a6070;
  --text-bright: #eef0f5;

  --font-sans:   'DM Sans', sans-serif;
  --font-serif:  'Playfair Display', serif;
  --font-mono:   'DM Mono', monospace;

  --radius:      12px;
  --transition:  0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

### `src/app/core/models/project.model.ts`
```typescript
export interface Project {
  id:          string;
  title:       string;
  description: string;
  type:        string;           // 'Application web' | 'API REST' | 'Projet perso'
  status:      'live' | 'wip' | 'archived';
  stack:       string[];
  links: {
    demo?:   string;
    github?: string;
    docs?:   string;
  };
  featured:    boolean;
}
```

---

### `src/assets/data/projects.json`
```json
[
  {
    "id": "dashboard-analytics",
    "title": "Dashboard Analytics",
    "description": "Interface de visualisation de données temps réel pour le suivi de KPIs e-commerce.",
    "type": "Application web",
    "status": "live",
    "stack": ["Angular", "Node.js", "PostgreSQL", "Chart.js"],
    "links": {
      "demo": "https://...",
      "github": "https://github.com/..."
    },
    "featured": true
  }
]
```
> ✅ **Astuce** : toute mise à jour de projet = éditer ce JSON, pas du code Angular.

---

### `src/app/core/services/projects.service.ts`
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private readonly dataUrl = 'assets/data/projects.json';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.dataUrl);
  }

  getFeatured(): Observable<Project[]> {
    return this.getAll().pipe(
      // filter featured only
      map(projects => projects.filter(p => p.featured))
    );
  }
}
```

---

### `src/app/shared/directives/reveal.directive.ts`
```typescript
import { Directive, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';

@Directive({ selector: '[appReveal]', standalone: true })
export class RevealDirective implements OnInit, OnDestroy {
  @Input() revealDelay = 0;   // ex: [revealDelay]="200"

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit() {
    const el = this.el.nativeElement;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.6s ease ${this.revealDelay}ms, transform 0.6s ease ${this.revealDelay}ms`;

    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.opacity = '1';
        el.style.transform = 'none';
        this.observer.disconnect();
      }
    }, { threshold: 0.12 });

    this.observer.observe(el);
  }

  ngOnDestroy() { this.observer?.disconnect(); }
}
```

**Usage dans un template :**
```html
<div appReveal [revealDelay]="0">...</div>
<div appReveal [revealDelay]="150">...</div>
<div appReveal [revealDelay]="300">...</div>
```

---

### `src/app/sections/projects/project-card/project-card.component.ts`
```typescript
import { Component, Input } from '@angular/core';
import { Project } from '../../../core/models/project.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  template: `
    <a [href]="project.links.demo || project.links.github" class="project-card">
      <div class="project-meta">
        <span class="project-type">{{ project.type }}</span>
        <span class="project-status" [class]="'status-' + project.status">
          {{ project.status === 'live' ? '● Live' : '◐ En cours' }}
        </span>
      </div>
      <h3 class="project-title">{{ project.title }}</h3>
      <p class="project-desc">{{ project.description }}</p>
      <div class="project-stack">
        <span *ngFor="let tech of project.stack" class="tech-pill">{{ tech }}</span>
      </div>
    </a>
  `
})
export class ProjectCardComponent {
  @Input() project!: Project;
}
```

---

### `src/app/sections/contact/contact.component.ts`
```typescript
import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName:  ['', Validators.required],
    email:     ['', [Validators.required, Validators.email]],
    message:   ['', [Validators.required, Validators.minLength(20)]]
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.form.invalid) return;
    // → Envoyer vers Formspree ou EmailJS (service tiers, GitHub Pages compatible)
    // Formspree : POST https://formspree.io/f/YOUR_ID
    console.log(this.form.value);
  }
}
```

---

### `src/app/app.routes.ts`
```typescript
import { Routes } from '@angular/router';

// Portfolio = one-page, pas besoin de routing multi-pages
// On garde le router pour une éventuelle page projet détaillée
export const routes: Routes = [
  { path: '', loadComponent: () => import('./app.component').then(m => m.AppComponent) },
  {
    path: 'project/:id',
    loadComponent: () => import('./sections/projects/project-detail/project-detail.component')
      .then(m => m.ProjectDetailComponent)
    // lazy-loaded, seulement si tu veux des pages dédiées par projet
  },
  { path: '**', redirectTo: '' }
];
```

---

## Déploiement sur GitHub Pages

### 1. Installer `angular-cli-ghpages`
```bash
npm install -g angular-cli-ghpages
```

### 2. Configurer `angular.json`
```json
"outputPath": "dist/portfolio/browser"
```

### 3. Build + Deploy en une commande
```bash
ng build --base-href "https://TON-USERNAME.github.io/portfolio/" \
&& npx angular-cli-ghpages --dir=dist/portfolio/browser
```

### 4. GitHub → Settings → Pages
- Source : branch `gh-pages`
- Ton site est live sur `https://TON-USERNAME.github.io/portfolio/`

> ⚠️ Ajoute un fichier `404.html` identique à `index.html` dans `src/` pour que le routing Angular fonctionne sur GitHub Pages (refresh de page).

---

## Commandes utiles

```bash
ng new portfolio --standalone --style=scss --routing=true
cd portfolio

# Démarrage local
ng serve

# Générer un composant
ng g c sections/hero --standalone

# Build production
ng build --configuration=production

# Déployer sur GitHub Pages
ng build --base-href "/portfolio/" && npx angular-cli-ghpages --dir=dist/portfolio/browser
```
