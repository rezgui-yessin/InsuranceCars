import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent, ReactiveFormsModule],
  template: `
    <app-navbar></app-navbar>
    <div class="container py-5">
      <h1 class="display-4 fw-bold text-center mb-5">Contact Us</h1>
      <div class="row">
        <div class="col-lg-6 mb-4">
          <div class="card border-0 shadow-sm p-4">
            <h3 class="fw-bold mb-4">Get in Touch</h3>
            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
              <div class="mb-3">
                <label class="form-label">Name</label>
                <input type="text" class="form-control" formControlName="name">
              </div>
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" formControlName="email">
              </div>
              <div class="mb-3">
                <label class="form-label">Message</label>
                <textarea class="form-control" rows="5" formControlName="message"></textarea>
              </div>
              <button type="submit" class="btn btn-primary w-100" [disabled]="contactForm.invalid">Send Message</button>
            </form>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card border-0 shadow-sm p-4 mb-4">
            <h4 class="fw-bold mb-3"><i class="bi bi-geo-alt text-primary me-2"></i>Address</h4>
            <p>123 Insurance Street<br>City, State 12345</p>
          </div>
          <div class="card border-0 shadow-sm p-4 mb-4">
            <h4 class="fw-bold mb-3"><i class="bi bi-telephone text-primary me-2"></i>Phone</h4>
            <p>+1 (555) 123-4567</p>
          </div>
          <div class="card border-0 shadow-sm p-4">
            <h4 class="fw-bold mb-3"><i class="bi bi-envelope text-primary me-2"></i>Email</h4>
            <p>info&#64;autosure.com</p>
          </div>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
  `
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      alert('Message sent! We will get back to you soon.');
      this.contactForm.reset();
    }
  }
}
