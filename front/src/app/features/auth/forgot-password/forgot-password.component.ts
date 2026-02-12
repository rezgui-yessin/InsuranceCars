import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="auth-container">
      <div class="container">
        <div class="row justify-content-center align-items-center min-vh-100">
          <div class="col-lg-5 col-md-7">
            <div class="auth-card card border-0 shadow-lg">
              <div class="card-body p-5">
                <div class="text-center mb-4">
                  <div class="logo-circle mb-3">
                    <i class="bi bi-key"></i>
                  </div>
                  <h2 class="fw-bold">Forgot Password?</h2>
                  <p class="text-muted">Enter your email to reset your password</p>
                </div>

                <form [formGroup]="forgotForm" (ngSubmit)="onSubmit()">
                  <div class="mb-3">
                    <label class="form-label">Email Address</label>
                    <input type="email" class="form-control" formControlName="email" placeholder="Enter your email">
                  </div>

                  <button type="submit" class="btn btn-primary w-100 py-3 mb-3" [disabled]="forgotForm.invalid">
                    <i class="bi bi-envelope me-2"></i>
                    Send Reset Link
                  </button>

                  <div class="text-center">
                    <a routerLink="/auth/login" class="text-decoration-none">
                      <i class="bi bi-arrow-left me-1"></i>
                      Back to Login
                    </a>
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
export class ForgotPasswordComponent {
  forgotForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotForm.valid) {
      alert('Password reset link sent to your email!');
      this.forgotForm.reset();
    }
  }
}
