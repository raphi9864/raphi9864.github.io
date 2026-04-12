import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Directive({ selector: '[appReveal]', standalone: true })
export class RevealDirective implements OnInit, OnDestroy {
  @Input() revealDelay = 0;

  private st?: ScrollTrigger;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit() {
    const el = this.el.nativeElement;

    this.st = ScrollTrigger.create({
      trigger: el,
      start: 'top 87%',
      once: true,
      onEnter: () => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.85,
          ease: 'power3.out',
          delay: this.revealDelay / 1000,
        });
      },
    });
  }

  ngOnDestroy() {
    this.st?.kill();
  }
}
