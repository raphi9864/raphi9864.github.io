import { Component, HostListener } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  scrolled = false;

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 80;
  }

  navigate(event: MouseEvent, href: string) {
    event.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;

    const overlay = document.getElementById('page-overlay');
    if (!overlay) { target.scrollIntoView({ behavior: 'smooth' }); return; }

    gsap.timeline()
      .to(overlay, { scaleY: 1, transformOrigin: 'bottom', duration: .38, ease: 'power3.inOut' })
      .to(overlay, {
        scaleY: 0, transformOrigin: 'top', duration: .38, ease: 'power3.inOut',
        onStart: () => target.scrollIntoView({ behavior: 'instant' }),
      });
  }
}
