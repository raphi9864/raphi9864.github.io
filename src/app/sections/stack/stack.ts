import { Component } from '@angular/core';
import { StackCategory } from '../../core/models/stack-item.model';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-stack',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './stack.html',
  styleUrl: './stack.scss',
})
export class Stack {
  categories: StackCategory[] = [
    {
      label: 'Frontend',
      items: [
        { name: 'Angular',      icon: '⬡',  level: 75 },
        { name: 'React',        icon: '⚛',  level: 70 },
        { name: 'React Native', icon: '📱', level: 60 },
        { name: 'TypeScript',   icon: '✦',  level: 70 },
        { name: 'HTML / CSS',   icon: '#',   level: 80 },
      ],
    },
    {
      label: 'Backend',
      items: [
        { name: 'Node.js / Express', icon: '⬢',  level: 70 },
        { name: 'Spring Boot',       icon: '🌱', level: 55 },
        { name: 'Java',              icon: '☕', level: 55 },
      ],
    },
    {
      label: 'Base de données & Infra',
      items: [
        { name: 'PostgreSQL', icon: '🐘', level: 65 },
        { name: 'Docker',     icon: '🐳', level: 50 },
        { name: 'Git',        icon: '⎇',  level: 75 },
        { name: 'Vercel',     icon: '▲',  level: 60 },
      ],
    },
    {
      label: 'Paiement & Auth',
      items: [
        { name: 'Stripe', icon: '💳', level: 40 },
        { name: 'Clerk',  icon: '🔑', level: 40 },
      ],
    },
  ];
}
