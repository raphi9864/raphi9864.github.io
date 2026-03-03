import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private http = inject(HttpClient);
  private readonly dataUrl = 'data/projects.json';

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.dataUrl);
  }

  getFeatured(): Observable<Project[]> {
    return this.getAll().pipe(
      map(projects => projects.filter(p => p.featured))
    );
  }
}
