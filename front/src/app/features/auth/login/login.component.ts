import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserRole } from '../../../shared/models/user.model';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.toastService.error('Please fill in all required fields correctly.');
      return;
    }

    this.loading = true;
    this.error = '';

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (user) => {
        this.toastService.success('Login successful! Redirecting...');
        // Redirect based on role
        switch (user.role) {
          case UserRole.ADMIN:
            this.router.navigate(['/admin/dashboard']);
            break;
          case UserRole.AGENT:
            this.router.navigate(['/agent/dashboard']);
            break;
          case UserRole.CLIENT:
            this.router.navigate(['/client/dashboard']);
            break;
          default:
            this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.error = 'Invalid email or password';
        this.loading = false;
        this.toastService.error(this.error);
      }
    });
  }
}
