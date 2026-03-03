import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, RevealDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  submitted = false;
  error = false;
  sending = false;

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(20)]],
  });

  onSubmit() {
    if (this.form.invalid) return;

    this.sending = true;
    this.error = false;

    this.http
      .post('https://formspree.io/f/maqdgzbd', this.form.value, {
        headers: { Accept: 'application/json' },
      })
      .subscribe({
        next: () => {
          this.submitted = true;
          this.sending = false;
          this.form.reset();
        },
        error: () => {
          this.error = true;
          this.sending = false;
        },
      });
  }
}
