import { Component } from '@angular/core';
import { Navbar } from './layout/navbar/navbar';
import { Footer } from './layout/footer/footer';
import { Hero } from './sections/hero/hero';
import { Projects } from './sections/projects/projects';
import { Stack } from './sections/stack/stack';
import { Contact } from './sections/contact/contact';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Navbar, Footer, Hero, Projects, Stack, Contact],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
