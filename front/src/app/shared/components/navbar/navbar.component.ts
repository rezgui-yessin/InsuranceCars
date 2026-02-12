import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
<nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
  <div class="container">
    <a class="navbar-brand fw-bold text-primary" routerLink="/">
      <i class="bi bi-shield-check me-2"></i>
      AutoSure
    </a>
    <button 
      class="navbar-toggler" 
      type="button" 
      (click)="toggleNavbar()"
      [attr.aria-expanded]="!isCollapsed">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" [class.show]="!isCollapsed">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        @if (!currentUser) {
          <li class="nav-item">
            <a class="nav-link" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/about" routerLinkActive="active">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/plans" routerLinkActive="active">Plans</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/contact" routerLinkActive="active">Contact</a>
          </li>
          <li class="nav-item">
            <a class="btn btn-primary ms-lg-3" routerLink="/auth/login">
              <i class="bi bi-box-arrow-in-right me-1"></i>
              Login
            </a>
          </li>
        } @else {
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
              <i class="bi bi-person-circle me-1"></i>
              {{ currentUser.fullName }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" [routerLink]="[currentUser.role.toLowerCase(), 'dashboard']">
                <i class="bi bi-speedometer2 me-2"></i>Dashboard
              </a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#" (click)="logout()">
                <i class="bi bi-box-arrow-right me-2"></i>Logout
              </a></li>
            </ul>
          </li>
        }
      </ul>
    </div>
  </div>
</nav>
  `,
  styles: [`
.navbar-brand {
  font-size: 1.5rem;
  transition: transform 0.2s ease;
}

.navbar-brand:hover {
  transform: scale(1.05);
}

.nav-link {
  font-weight: 500;
  transition: color 0.2s ease;
  padding: 0.5rem 1rem;
}

.nav-link:hover {
  color: var(--bs-primary) !important;
}

.nav-link.active {
  color: var(--bs-primary) !important;
}

.btn-primary {
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(13, 110, 253, 0.3);
}

.dropdown-menu {
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: none;
  margin-top: 0.5rem;
}

.dropdown-item {
  padding: 0.7rem 1.5rem;
  transition: all 0.2s ease;
}

.dropdown-item:hover {
  background-color: rgba(13, 110, 253, 0.1);
  color: var(--bs-primary);
  padding-left: 2rem;
}
  `]
})
export class NavbarComponent implements OnInit {
  currentUser: User | null = null;
  isCollapsed = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  toggleNavbar(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
