import { Component } from '@angular/core';

@Component({
  selector: 'app-marquee',
  standalone: true,
  templateUrl: './marquee.html',
  styleUrl: './marquee.scss',
})
export class Marquee {
  techs = [
    'Angular', 'React', 'Spring Boot', 'Node.js', 'PostgreSQL',
    'TypeScript', 'Docker', 'Next.js', 'React Native', 'Stripe', 'Vercel', 'Git',
  ];
}
