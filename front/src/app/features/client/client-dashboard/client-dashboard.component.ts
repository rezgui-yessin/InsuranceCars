import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent, SidebarItem } from '../../../shared/components/sidebar/sidebar.component';
import { AuthService } from '../../../core/services/auth.service';
import { PolicyService } from '../../../core/services/policy.service';
import { ClaimService } from '../../../core/services/claim.service';
import { CarService } from '../../../core/services/car.service';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.css'
})
export class ClientDashboardComponent implements OnInit {
  currentUser: User | null = null;
  
  sidebarItems: SidebarItem[] = [
    { label: 'Dashboard', icon: 'speedometer2', route: '/client/dashboard' },
    { label: 'My Profile', icon: 'person', route: '/client/profile' },
    { label: 'My Cars', icon: 'car-front', route: '/client/cars' },
    { label: 'My Policies', icon: 'file-earmark-text', route: '/client/policies' },
    { label: 'Buy Insurance', icon: 'cart-plus', route: '/client/buy-insurance' },
    { label: 'Submit Claim', icon: 'clipboard-plus', route: '/client/submit-claim' },
    { label: 'Track Claims', icon: 'clipboard-check', route: '/client/claims' },
    { label: 'Documents', icon: 'folder', route: '/client/documents' },
    { label: 'Payments', icon: 'credit-card', route: '/client/payments' },
    { label: 'Notifications', icon: 'bell', route: '/client/notifications', badge: '2' }
  ];

  stats = {
    activePolicies: 0,
    totalCars: 0,
    pendingClaims: 0,
    nextPayment: 0
  };

  myPolicies: any[] = [];
  myClaims: any[] = [];

  constructor(
    private authService: AuthService,
    private policyService: PolicyService,
    private claimService: ClaimService,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    if (!this.currentUser) return;

    // Load policies
    this.policyService.getPoliciesByClientId(this.currentUser.id).subscribe(policies => {
      this.myPolicies = policies;
      this.stats.activePolicies = policies.filter(p => p.status === 'ACTIVE').length;
      const nextPolicy = policies.find(p => p.status === 'ACTIVE');
      this.stats.nextPayment = nextPolicy ? nextPolicy.price : 0;
    });

    // Load claims
    this.claimService.getClaimsByClientId(this.currentUser.id).subscribe(claims => {
      this.myClaims = claims;
      this.stats.pendingClaims = claims.filter(c => c.status === 'PENDING' || c.status === 'UNDER_REVIEW').length;
    });

    // Load cars
    this.carService.getMyCars().subscribe(cars => {
      this.stats.totalCars = cars.length;
    });
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'ACTIVE': 'success',
      'PENDING': 'warning',
      'APPROVED': 'success',
      'UNDER_REVIEW': 'info',
      'REJECTED': 'danger',
      'EXPIRED': 'secondary',
      'PAID': 'success'
    };
    return statusMap[status] || 'secondary';
  }
}
