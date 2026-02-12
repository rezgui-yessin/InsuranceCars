import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent, SidebarItem } from '../../../shared/components/sidebar/sidebar.component';
import { PolicyService } from '../../../core/services/policy.service';
import { ClaimService } from '../../../core/services/claim.service';
import { PaymentService } from '../../../core/services/payment.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  sidebarItems: SidebarItem[] = [
    { label: 'Dashboard', icon: 'speedometer2', route: '/admin/dashboard' },
    { label: 'Clients', icon: 'people', route: '/admin/clients' },
    { label: 'Agents', icon: 'person-badge', route: '/admin/agents' },
    { label: 'Cars', icon: 'car-front', route: '/admin/cars' },
    { label: 'Policies', icon: 'file-earmark-text', route: '/admin/policies' },
    { label: 'Claims', icon: 'clipboard-check', route: '/admin/claims', badge: '3' },
    { label: 'Payments', icon: 'credit-card', route: '/admin/payments' },
    { label: 'Reports', icon: 'graph-up', route: '/admin/reports' },
    { label: 'Settings', icon: 'gear', route: '/admin/settings' }
  ];

  stats = {
    totalClients: 0,
    totalPolicies: 0,
    pendingClaims: 0,
    totalRevenue: 0
  };

  recentClaims: any[] = [];
  recentPolicies: any[] = [];

  constructor(
    private policyService: PolicyService,
    private claimService: ClaimService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Load policies
    this.policyService.getPolicies().subscribe(policies => {
      this.stats.totalPolicies = policies.length;
      this.recentPolicies = policies.slice(0, 5);
    });

    // Load claims
    this.claimService.getClaims().subscribe(claims => {
      this.stats.pendingClaims = claims.filter(c => c.status === 'PENDING' || c.status === 'UNDER_REVIEW').length;
      this.recentClaims = claims.slice(0, 5);
    });

    // Load payments
    this.paymentService.getPayments().subscribe(payments => {
      this.stats.totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
    });

    // Mock client count
    this.stats.totalClients = 156;
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'ACTIVE': 'success',
      'PENDING': 'warning',
      'APPROVED': 'success',
      'UNDER_REVIEW': 'info',
      'REJECTED': 'danger',
      'EXPIRED': 'secondary'
    };
    return statusMap[status] || 'secondary';
  }
}
