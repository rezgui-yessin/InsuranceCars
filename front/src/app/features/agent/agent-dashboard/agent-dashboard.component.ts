import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent, SidebarItem } from '../../../shared/components/sidebar/sidebar.component';
import { PolicyService } from '../../../core/services/policy.service';
import { ClaimService } from '../../../core/services/claim.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-agent-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  templateUrl: './agent-dashboard.component.html',
  styleUrl: './agent-dashboard.component.css'
})
export class AgentDashboardComponent implements OnInit {
  sidebarItems: SidebarItem[] = [
    { label: 'Dashboard', icon: 'speedometer2', route: '/agent/dashboard' },
    { label: 'My Clients', icon: 'people', route: '/agent/clients' },
    { label: 'Policies', icon: 'file-earmark-text', route: '/agent/policies' },
    { label: 'Claims', icon: 'clipboard-check', route: '/agent/claims' },
    { label: 'Commission', icon: 'currency-dollar', route: '/agent/commission' }
  ];

  stats = {
    totalClients: 0,
    activePolicies: 0,
    pendingClaims: 0,
    totalCommission: 0
  };

  recentPolicies: any[] = [];
  recentClaims: any[] = [];
  topClients: any[] = [];

  constructor(
    private authService: AuthService,
    private policyService: PolicyService,
    private claimService: ClaimService
  ) {}

  ngOnInit(): void {
    // In a real app, we would fetch data specific to this agent
    this.loadMockData();
  }

  loadMockData(): void {
    this.stats = {
      totalClients: 24,
      activePolicies: 18,
      pendingClaims: 3,
      totalCommission: 12500
    };

    this.recentPolicies = [
      { id: 101, clientName: 'John Doe', type: 'Comprehensive', amount: 1200, status: 'Active', date: new Date() },
      { id: 102, clientName: 'Jane Smith', type: 'Third Party', amount: 800, status: 'Pending', date: new Date() },
      { id: 103, clientName: 'Bob Wilson', type: 'Comprehensive', amount: 1500, status: 'Active', date: new Date() }
    ];
  }
}
