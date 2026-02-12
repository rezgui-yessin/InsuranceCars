// Generic placeholder components for all routes
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent, SidebarItem } from '../../shared/components/sidebar/sidebar.component';

// Admin Components
@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `<div class="container-fluid"><div class="row"><div class="col-2"><app-sidebar [items]="sidebarItems" title="Admin Panel"></app-sidebar></div><div class="col-10 p-4"><h2>Clients Management</h2><p>Manage all clients here.</p></div></div></div>`
})
export class ClientsComponent {
  sidebarItems: SidebarItem[] = [
    { label: 'Dashboard', icon: 'speedometer2', route: '/admin/dashboard' },
    { label: 'Clients', icon: 'people', route: '/admin/clients' },
    { label: 'Agents', icon: 'person-badge', route: '/admin/agents' },
    { label: 'Cars', icon: 'car-front', route: '/admin/cars' },
    { label: 'Policies', icon: 'file-earmark-text', route: '/admin/policies' },
    { label: 'Claims', icon: 'clipboard-check', route: '/admin/claims' },
    { label: 'Payments', icon: 'credit-card', route: '/admin/payments' },
    { label: 'Reports', icon: 'graph-up', route: '/admin/reports' },
    { label: 'Settings', icon: 'gear', route: '/admin/settings' }
  ];
}

@Component({
  selector: 'app-agents',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `<div class="container-fluid"><div class="row"><div class="col-2"><app-sidebar [items]="sidebarItems" title="Admin Panel"></app-sidebar></div><div class="col-10 p-4"><h2>Agents Management</h2><p>Manage all agents here.</p></div></div></div>`
})
export class AgentsComponent {
  sidebarItems: SidebarItem[] = [
    { label: 'Dashboard', icon: 'speedometer2', route: '/admin/dashboard' },
    { label: 'Clients', icon: 'people', route: '/admin/clients' },
    { label: 'Agents', icon: 'person-badge', route: '/admin/agents' },
    { label: 'Cars', icon: 'car-front', route: '/admin/cars' },
    { label: 'Policies', icon: 'file-earmark-text', route: '/admin/policies' },
    { label: 'Claims', icon: 'clipboard-check', route: '/admin/claims' },
    { label: 'Payments', icon: 'credit-card', route: '/admin/payments' },
    { label: 'Reports', icon: 'graph-up', route: '/admin/reports' },
    { label: 'Settings', icon: 'gear', route: '/admin/settings' }
  ];
}

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `<div class="container-fluid"><div class="row"><div class="col-2"><app-sidebar [items]="sidebarItems" title="Admin Panel"></app-sidebar></div><div class="col-10 p-4"><h2>Cars Management</h2><p>Manage all cars here.</p></div></div></div>`
})
export class CarsComponent {
  sidebarItems: SidebarItem[] = [
    { label: 'Dashboard', icon: 'speedometer2', route: '/admin/dashboard' },
    { label: 'Clients', icon: 'people', route: '/admin/clients' },
    { label: 'Agents', icon: 'person-badge', route: '/admin/agents' },
    { label: 'Cars', icon: 'car-front', route: '/admin/cars' },
    { label: 'Policies', icon: 'file-earmark-text', route: '/admin/policies' },
    { label: 'Claims', icon: 'clipboard-check', route: '/admin/claims' },
    { label: 'Payments', icon: 'credit-card', route: '/admin/payments' },
    { label: 'Reports', icon: 'graph-up', route: '/admin/reports' },
    { label: 'Settings', icon: 'gear', route: '/admin/settings' }
  ];
}

@Component({
  selector: 'app-policies',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `<div class="container-fluid"><div class="row"><div class="col-2"><app-sidebar [items]="sidebarItems" title="Admin Panel"></app-sidebar></div><div class="col-10 p-4"><h2>Policies Management</h2><p>Manage all policies here.</p></div></div></div>`
})
export class PoliciesComponent {
  sidebarItems: SidebarItem[] = [
    { label: 'Dashboard', icon: 'speedometer2', route: '/admin/dashboard' },
    { label: 'Clients', icon: 'people', route: '/admin/clients' },
    { label: 'Agents', icon: 'person-badge', route: '/admin/agents' },
    { label: 'Cars', icon: 'car-front', route: '/admin/cars' },
    { label: 'Policies', icon: 'file-earmark-text', route: '/admin/policies' },
    { label: 'Claims', icon: 'clipboard-check', route: '/admin/claims' },
    { label: 'Payments', icon: 'credit-card', route: '/admin/payments' },
    { label: 'Reports', icon: 'graph-up', route: '/admin/reports' },
    { label: 'Settings', icon: 'gear', route: '/admin/settings' }
  ];
}

@Component({
  selector: 'app-claims',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `<div class="container-fluid"><div class="row"><div class="col-2"><app-sidebar [items]="sidebarItems" title="Admin Panel"></app-sidebar></div><div class="col-10 p-4"><h2>Claims Management</h2><p>Manage all claims here.</p></div></div></div>`
})
export class ClaimsComponent {
  sidebarItems: SidebarItem[] = [
    { label: 'Dashboard', icon: 'speedometer2', route: '/admin/dashboard' },
    { label: 'Clients', icon: 'people', route: '/admin/clients' },
    { label: 'Agents', icon: 'person-badge', route: '/admin/agents' },
    { label: 'Cars', icon: 'car-front', route: '/admin/cars' },
    { label: 'Policies', icon: 'file-earmark-text', route: '/admin/policies' },
    { label: 'Claims', icon: 'clipboard-check', route: '/admin/claims' },
    { label: 'Payments', icon: 'credit-card', route: '/admin/payments' },
    { label: 'Reports', icon: 'graph-up', route: '/admin/reports' },
    { label: 'Settings', icon: 'gear', route: '/admin/settings' }
  ];
}

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `<div class="container-fluid"><div class="row"><div class="col-2"><app-sidebar [items]="sidebarItems" title="Admin Panel"></app-sidebar></div><div class="col-10 p-4"><h2>Payments Management</h2><p>Manage all payments here.</p></div></div></div>`
})
export class PaymentsComponent {
  sidebarItems: SidebarItem[] = [
    { label: 'Dashboard', icon: 'speedometer2', route: '/admin/dashboard' },
    { label: 'Clients', icon: 'people', route: '/admin/clients' },
    { label: 'Agents', icon: 'person-badge', route: '/admin/agents' },
    { label: 'Cars', icon: 'car-front', route: '/admin/cars' },
    { label: 'Policies', icon: 'file-earmark-text', route: '/admin/policies' },
    { label: 'Claims', icon: 'clipboard-check', route: '/admin/claims' },
    { label: 'Payments', icon: 'credit-card', route: '/admin/payments' },
    { label: 'Reports', icon: 'graph-up', route: '/admin/reports' },
    { label: 'Settings', icon: 'gear', route: '/admin/settings' }
  ];
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `<div class="container-fluid"><div class="row"><div class="col-2"><app-sidebar [items]="sidebarItems" title="Admin Panel"></app-sidebar></div><div class="col-10 p-4"><h2>Reports</h2><p>View and generate reports here.</p></div></div></div>`
})
export class ReportsComponent {
  sidebarItems: SidebarItem[] = [
    { label: 'Dashboard', icon: 'speedometer2', route: '/admin/dashboard' },
    { label: 'Clients', icon: 'people', route: '/admin/clients' },
    { label: 'Agents', icon: 'person-badge', route: '/admin/agents' },
    { label: 'Cars', icon: 'car-front', route: '/admin/cars' },
    { label: 'Policies', icon: 'file-earmark-text', route: '/admin/policies' },
    { label: 'Claims', icon: 'clipboard-check', route: '/admin/claims' },
    { label: 'Payments', icon: 'credit-card', route: '/admin/payments' },
    { label: 'Reports', icon: 'graph-up', route: '/admin/reports' },
    { label: 'Settings', icon: 'gear', route: '/admin/settings' }
  ];
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `<div class="container-fluid"><div class="row"><div class="col-2"><app-sidebar [items]="sidebarItems" title="Admin Panel"></app-sidebar></div><div class="col-10 p-4"><h2>Settings</h2><p>Configure system settings here.</p></div></div></div>`
})
export class SettingsComponent {
  sidebarItems: SidebarItem[] = [
    { label: 'Dashboard', icon: 'speedometer2', route: '/admin/dashboard' },
    { label: 'Clients', icon: 'people', route: '/admin/clients' },
    { label: 'Agents', icon: 'person-badge', route: '/admin/agents' },
    { label: 'Cars', icon: 'car-front', route: '/admin/cars' },
    { label: 'Policies', icon: 'file-earmark-text', route: '/admin/policies' },
    { label: 'Claims', icon: 'clipboard-check', route: '/admin/claims' },
    { label: 'Payments', icon: 'credit-card', route: '/admin/payments' },
    { label: 'Reports', icon: 'graph-up', route: '/admin/reports' },
    { label: 'Settings', icon: 'gear', route: '/admin/settings' }
  ];
}
