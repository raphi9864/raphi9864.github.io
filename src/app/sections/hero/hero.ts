import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements AfterViewInit {
  @ViewChild('heroW1') heroW1!: ElementRef<HTMLSpanElement>;
  @ViewChild('heroW2') heroW2!: ElementRef<HTMLSpanElement>;

  ngAfterViewInit() {
    const splitChars = (el: HTMLElement) => {
      const text = el.textContent ?? '';
      el.innerHTML = text.split('').map(c =>
        `<span style="display:inline-block;opacity:0;transform:translateY(100%) skewX(-8deg)">${c}</span>`
      ).join('');
      return el.querySelectorAll('span');
    };

    const chars1 = splitChars(this.heroW1.nativeElement);
    const chars2 = splitChars(this.heroW2.nativeElement);

    gsap.timeline({ delay: 0.1 })
      .to('.hero-eyebrow',  { opacity: 1, y: 0, duration: .5, ease: 'power2.out' })
      .to(chars1, { opacity: 1, y: 0, skewX: 0, duration: .55, stagger: .03, ease: 'expo.out' }, '-=.1')
      .to('.zap-bar',       { scaleX: 1, duration: .5, ease: 'expo.out' }, '-=.15')
      .to(chars2, { opacity: 1, y: 0, skewX: 0, duration: .6, stagger: .035, ease: 'expo.out' }, '-=.5')
      .to('.hero-role',     { opacity: 1, duration: .5, ease: 'power2.out' }, '-=.25')
      .to('.hero-desc',     { opacity: 1, duration: .45, ease: 'power2.out' }, '-=.2')
      .to('.hero-actions',  { opacity: 1, duration: .4, ease: 'power2.out' }, '-=.2')
      .to('.stats-row',     { opacity: 1, y: 0, duration: .5, ease: 'power2.out' }, '-=.15')
      .call(() => this.animateCounters());
  }

  private animateCounters() {
    document.querySelectorAll<HTMLElement>('.stat-num[data-target]').forEach(el => {
      const target = +(el.dataset['target'] ?? 0);
      const suffix = el.dataset['suffix'] ?? '';
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target,
        duration: 1.3,
        ease: 'power2.out',
        onUpdate: () => { el.textContent = Math.ceil(obj.v) + suffix; },
      });
    });
  }
}
