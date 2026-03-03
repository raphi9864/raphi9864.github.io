import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProjectsService } from '../../core/services/projects.service';
import { ProjectCard } from './project-card/project-card';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectCard, RevealDirective],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  private projectsService = inject(ProjectsService);
  projects = toSignal(this.projectsService.getAll(), { initialValue: [] });
}
