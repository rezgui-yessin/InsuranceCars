// Agent placeholder components
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent, SidebarItem } from '../../shared/components/sidebar/sidebar.component';

const agentSidebarItems: SidebarItem[] = [
  { label: 'Dashboard', icon: 'speedometer2', route: '/agent/dashboard' },
  { label: 'My Clients', icon: 'people', route: '/agent/clients' },
  { label: 'Policies', icon: 'file-earmark-text', route: '/agent/policies' },
  { label: 'Claims', icon: 'clipboard-check', route: '/agent/claims' },
  { label: 'Commission', icon: 'currency-dollar', route: '/agent/commission' }
];

@Component({
  selector: 'app-agent-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-2">
          <app-sidebar [items]="sidebarItems" title="Agent Portal"></app-sidebar>
        </div>
        <div class="col-10 p-4">
          <h2 class="fw-bold mb-4">Agent Dashboard</h2>
          <div class="row g-4">
            <div class="col-md-3">
              <div class="card border-0 shadow-sm">
                <div class="card-body">
                  <h6 class="text-muted">My Clients</h6>
                  <h3 class="fw-bold">24</h3>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="card border-0 shadow-sm">
                <div class="card-body">
                  <h6 class="text-muted">Active Policies</h6>
                  <h3 class="fw-bold">45</h3>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="card border-0 shadow-sm">
                <div class="card-body">
                  <h6 class="text-muted">Pending Claims</h6>
                  <h3 class="fw-bold">3</h3>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="card border-0 shadow-sm">
                <div class="card-body">
                  <h6 class="text-muted">This Month Commission</h6>
                  <h3 class="fw-bold">$2,450</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AgentDashboardComponent {
  sidebarItems = agentSidebarItems;
}

@Component({
  selector: 'app-agent-clients',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `<div class="container-fluid"><div class="row"><div class="col-2"><app-sidebar [items]="sidebarItems" title="Agent Portal"></app-sidebar></div><div class="col-10 p-4"><h2>My Clients</h2><p>Manage your assigned clients.</p></div></div></div>`
})
export class AgentClientsComponent {
  sidebarItems = agentSidebarItems;
}

@Component({
  selector: 'app-agent-policies',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `<div class="container-fluid"><div class="row"><div class="col-2"><app-sidebar [items]="sidebarItems" title="Agent Portal"></app-sidebar></div><div class="col-10 p-4"><h2>Policies</h2><p>Create and manage policies.</p></div></div></div>`
})
export class AgentPoliciesComponent {
  sidebarItems = agentSidebarItems;
}

@Component({
  selector: 'app-agent-claims',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `<div class="container-fluid"><div class="row"><div class="col-2"><app-sidebar [items]="sidebarItems" title="Agent Portal"></app-sidebar></div><div class="col-10 p-4"><h2>Claims</h2><p>Review and update claims.</p></div></div></div>`
})
export class AgentClaimsComponent {
  sidebarItems = agentSidebarItems;
}

@Component({
  selector: 'app-commission',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `<div class="container-fluid"><div class="row"><div class="col-2"><app-sidebar [items]="sidebarItems" title="Agent Portal"></app-sidebar></div><div class="col-10 p-4"><h2>Commission Overview</h2><p>View your commission and earnings.</p></div></div></div>`
})
export class CommissionComponent {
  sidebarItems = agentSidebarItems;
}
