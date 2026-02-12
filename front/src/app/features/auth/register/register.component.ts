import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="auth-container">
      <div class="container">
        <div class="row justify-content-center align-items-center min-vh-100">
          <div class="col-lg-6 col-md-8">
            <div class="auth-card card border-0 shadow-lg">
              <div class="card-body p-5">
                <div class="text-center mb-4">
                  <div class="logo-circle mb-3">
                    <i class="bi bi-person-plus"></i>
                  </div>
                  <h2 class="fw-bold">Create Account</h2>
                  <p class="text-muted">Join AutoSure today</p>
                </div>

                <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
                  <div class="row">
                    <div class="col-md-12 mb-3">
                      <label class="form-label">Full Name</label>
                      <input type="text" class="form-control" formControlName="fullName" placeholder="John Doe">
                    </div>
                  </div>
                  
                  <div class="mb-3">
                    <label class="form-label">Email Address</label>
                    <input type="email" class="form-control" formControlName="email" placeholder="john&#64;example.com">
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Phone Number</label>
                    <input type="tel" class="form-control" formControlName="phone" placeholder="+1 (555) 123-4567">
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input type="password" class="form-control" formControlName="password" placeholder="Minimum 6 characters">
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Confirm Password</label>
                    <input type="password" class="form-control" formControlName="confirmPassword" placeholder="Re-enter password">
                  </div>

                  <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="terms" formControlName="terms">
                    <label class="form-check-label" for="terms">
                      I agree to the Terms and Conditions
                    </label>
                  </div>

                  <button type="submit" class="btn btn-primary w-100 py-3 mb-3" [disabled]="registerForm.invalid || loading">
                    @if (loading) {
                      <span class="spinner-border spinner-border-sm me-2"></span>
                      Creating Account...
                    } @else {
                      <i class="bi bi-person-plus me-2"></i>
                      Create Account
                    }
                  </button>

                  <div class="text-center">
                    <p class="mb-0">
                      Already have an account? 
                      <a routerLink="/auth/login" class="text-decoration-none fw-bold">Sign In</a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
    }
    .auth-card {
      border-radius: 20px;
    }
    .logo-circle {
      width: 80px;
      height: 80px;
      margin: 0 auto;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 2.5rem;
    }
    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      border-radius: 50px;
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.loading = true;
    const { fullName, email, phone, password } = this.registerForm.value;

    this.authService.register({ fullName, email, phone }, password).subscribe({
      next: () => {
        alert('Registration successful! Please login.');
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        this.loading = false;
        alert('Registration failed. Please try again.');
      }
    });
  }
}
