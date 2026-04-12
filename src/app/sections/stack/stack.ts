import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, switchMap } from 'rxjs';
import { StackCategory } from '../../core/models/stack-item.model';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface LangBar { lang: string; pct: number; color: string; }
interface GhRepo  { languages_url: string; }

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6', JavaScript: '#f7df1e', Java: '#b07219',
  HTML: '#e34c26', CSS: '#563d7c', SCSS: '#c6538c', Shell: '#89e051',
};

const FALLBACK: LangBar[] = [
  { lang: 'TypeScript', pct: 38, color: '#3178c6' },
  { lang: 'JavaScript', pct: 24, color: '#f7df1e' },
  { lang: 'Java',       pct: 18, color: '#b07219' },
  { lang: 'HTML',       pct: 10, color: '#e34c26' },
  { lang: 'CSS',        pct:  7, color: '#563d7c' },
  { lang: 'Shell',      pct:  3, color: '#89e051' },
];

@Component({
  selector: 'app-stack',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './stack.html',
  styleUrl: './stack.scss',
})
export class Stack implements OnInit {
  private http = inject(HttpClient);

  langBars: LangBar[] = [];
  ghStatus = 'Chargement depuis GitHub...';

  categories: StackCategory[] = [
    {
      label: 'Frontend',
      items: [
        { name: 'Angular',      icon: '', level: 75 },
        { name: 'React',        icon: '', level: 70 },
        { name: 'React Native', icon: '', level: 60 },
        { name: 'TypeScript',   icon: '', level: 70 },
        { name: 'HTML / CSS',   icon: '', level: 80 },
        { name: 'Next.js',      icon: '', level: 55 },
      ],
    },
    {
      label: 'Backend',
      items: [
        { name: 'Node.js / Express', icon: '', level: 70 },
        { name: 'Spring Boot',       icon: '', level: 55 },
        { name: 'Java',              icon: '', level: 55 },
        { name: 'REST API',          icon: '', level: 65 },
      ],
    },
    {
      label: 'Infra & Outils',
      items: [
        { name: 'PostgreSQL', icon: '', level: 65 },
        { name: 'Docker',     icon: '', level: 50 },
        { name: 'Git',        icon: '', level: 75 },
        { name: 'Vercel',     icon: '', level: 60 },
        { name: 'Stripe',     icon: '', level: 40 },
        { name: 'Clerk',      icon: '', level: 40 },
        { name: 'Firebase',   icon: '', level: 35 },
      ],
    },
    {
      label: 'Langues',
      items: [
        { name: 'Français — natif',  icon: '', level: 100 },
        { name: 'Anglais — C1',      icon: '', level: 85  },
        { name: 'Espagnol — pro',    icon: '', level: 70  },
        { name: 'Mandarin — A2',     icon: '', level: 25  },
      ],
    },
  ];

  ngOnInit() {
    this.http
      .get<GhRepo[]>('https://api.github.com/users/rapho9864/repos?per_page=30&sort=pushed')
      .pipe(
        switchMap(repos =>
          forkJoin(repos.map(r => this.http.get<Record<string, number>>(r.languages_url)))
        )
      )
      .subscribe({
        next: langMaps => {
          const totals: Record<string, number> = {};
          langMaps.forEach(m =>
            Object.entries(m).forEach(([l, b]) => { totals[l] = (totals[l] || 0) + b; })
          );
          const total = Object.values(totals).reduce((a, b) => a + b, 0);
          const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]).slice(0, 8);
          this.langBars = sorted.map(([lang, bytes]) => ({
            lang,
            pct: Math.round(bytes / total * 100),
            color: LANG_COLORS[lang] || '#888',
          }));
          this.ghStatus = `${langMaps.length} repos · ${Object.keys(totals).length} langages détectés`;
          this.setupBarsAnimation();
        },
        error: () => {
          this.langBars = FALLBACK;
          this.ghStatus = 'Données statiques (GitHub inaccessible)';
          this.setupBarsAnimation();
        },
      });
  }

  private setupBarsAnimation() {
    setTimeout(() => {
      ScrollTrigger.create({
        trigger: '.lang-bars',
        start: 'top 85%',
        once: true,
        onEnter: () => {
          document.querySelectorAll<HTMLElement>('.lang-fill').forEach((fill, i) => {
            gsap.to(fill, {
              width: (fill.dataset['pct'] ?? '0') + '%',
              duration: 1.1,
              delay: i * 0.07,
              ease: 'power3.out',
            });
          });
        },
      });
    }, 100);
  }
}
