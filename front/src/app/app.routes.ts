import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { UserRole } from './shared/models/user.model';

export const routes: Routes = [
  // Landing Pages
  {
    path: '',
    loadComponent: () => import('./features/landing/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./features/landing/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'plans',
    loadComponent: () => import('./features/landing/plans/plans.component').then(m => m.PlansComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/landing/contact/contact.component').then(m => m.ContactComponent)
  },

  // Auth Routes
  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'auth/forgot-password',
    loadComponent: () => import('./features/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
  },

  // Admin Routes
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { role: UserRole.ADMIN },
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
      },
      {
        path: 'clients',
        loadComponent: () => import('./features/admin/admin-placeholders').then(m => m.ClientsComponent)
      },
      {
        path: 'agents',
        loadComponent: () => import('./features/admin/admin-placeholders').then(m => m.AgentsComponent)
      },
      {
        path: 'cars',
        loadComponent: () => import('./features/admin/admin-placeholders').then(m => m.CarsComponent)
      },
      {
        path: 'policies',
        loadComponent: () => import('./features/admin/admin-placeholders').then(m => m.PoliciesComponent)
      },
      {
        path: 'claims',
        loadComponent: () => import('./features/admin/admin-placeholders').then(m => m.ClaimsComponent)
      },
      {
        path: 'payments',
        loadComponent: () => import('./features/admin/admin-placeholders').then(m => m.PaymentsComponent)
      },
      {
        path: 'reports',
        loadComponent: () => import('./features/admin/admin-placeholders').then(m => m.ReportsComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/admin/admin-placeholders').then(m => m.SettingsComponent)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // Client Routes
  {
    path: 'client',
    canActivate: [authGuard, roleGuard],
    data: { role: UserRole.CLIENT },
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/client/client-dashboard/client-dashboard.component').then(m => m.ClientDashboardComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./features/client/client-placeholders').then(m => m.ProfileComponent)
      },
      {
        path: 'cars',
        loadComponent: () => import('./features/client/client-cars/client-cars.component').then(m => m.ClientCarsComponent)
      },
      {
        path: 'policies',
        loadComponent: () => import('./features/client/client-placeholders').then(m => m.ClientPoliciesComponent)
      },
      {
        path: 'buy-insurance',
        loadComponent: () => import('./features/client/client-placeholders').then(m => m.BuyInsuranceComponent)
      },
      {
        path: 'submit-claim',
        loadComponent: () => import('./features/client/client-placeholders').then(m => m.SubmitClaimComponent)
      },
      {
        path: 'claims',
        loadComponent: () => import('./features/client/client-placeholders').then(m => m.ClientClaimsComponent)
      },
      {
        path: 'documents',
        loadComponent: () => import('./features/client/client-placeholders').then(m => m.DocumentsComponent)
      },
      {
        path: 'payments',
        loadComponent: () => import('./features/client/client-payments/client-payments.component').then(m => m.ClientPaymentsComponent)
      },
      {
        path: 'notifications',
        loadComponent: () => import('./features/client/client-placeholders').then(m => m.NotificationsComponent)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // Agent Routes
  {
    path: 'agent',
    canActivate: [authGuard, roleGuard],
    data: { role: UserRole.AGENT },
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/agent/agent-dashboard/agent-dashboard.component').then(m => m.AgentDashboardComponent)
      },
      {
        path: 'clients',
        loadComponent: () => import('./features/agent/agent-placeholders').then(m => m.AgentClientsComponent)
      },
      {
        path: 'policies',
        loadComponent: () => import('./features/agent/agent-placeholders').then(m => m.AgentPoliciesComponent)
      },
      {
        path: 'claims',
        loadComponent: () => import('./features/agent/agent-placeholders').then(m => m.AgentClaimsComponent)
      },
      {
        path: 'commission',
        loadComponent: () => import('./features/agent/agent-placeholders').then(m => m.CommissionComponent)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // Fallback
  { path: '**', redirectTo: '' }
];
