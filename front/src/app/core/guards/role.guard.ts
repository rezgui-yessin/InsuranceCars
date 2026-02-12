import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../../shared/models/user.model';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredRole = route.data['role'] as UserRole;
  const currentUser = authService.getCurrentUser();

  if (!currentUser) {
    router.navigate(['/auth/login']);
    return false;
  }

  if (currentUser.role === requiredRole) {
    return true;
  }

  // Redirect to appropriate dashboard based on user role
  switch (currentUser.role) {
    case UserRole.ADMIN:
      router.navigate(['/admin/dashboard']);
      break;
    case UserRole.AGENT:
      router.navigate(['/agent/dashboard']);
      break;
    case UserRole.CLIENT:
      router.navigate(['/client/dashboard']);
      break;
    default:
      router.navigate(['/']);
  }

  return false;
};
