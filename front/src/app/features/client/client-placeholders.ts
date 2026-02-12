// Client placeholder components
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent, SidebarItem } from '../../shared/components/sidebar/sidebar.component';

const clientSidebarItems: SidebarItem[] = [
  { label: 'Dashboard', icon: 'speedometer2', route: '/client/dashboard' },
  { label: 'My Profile', icon: 'person', route: '/client/profile' },
  { label: 'My Cars', icon: 'car-front', route: '/client/cars' },
  { label: 'My Policies', icon: 'file-earmark-text', route: '/client/policies' },
  { label: 'Buy Insurance', icon: 'cart-plus', route: '/client/buy-insurance' },
  { label: 'Submit Claim', icon: 'clipboard-plus', route: '/client/submit-claim' },
  { label: 'Track Claims', icon: 'clipboard-check', route: '/client/claims' },
  { label: 'Documents', icon: 'folder', route: '/client/documents' },
  { label: 'Payments', icon: 'credit-card', route: '/client/payments' },
  { label: 'Notifications', icon: 'bell', route: '/client/notifications' }
];

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `<div class="container-fluid"><div class="row"><div class="col-2"><app-sidebar [items]="sidebarItems" title="My Account"></app-sidebar></div><div class="col-10 p-4"><h2>My Profile</h2><p>Manage your profile information here.</p></div></div></div>`
})
export class ProfileComponent {
  sidebarItems = clientSidebarItems;
}

@Component({
  selector: 'app-client-cars',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `<div class="container-fluid"><div class="row"><div class="col-2"><app-sidebar [items]="sidebarItems" title="My Account"></app-sidebar></div><div class="col-10 p-4"><h2>My Cars</h2><p>View and manage your registered vehicles.</p></div></div></div>`
})
export class ClientCarsComponent {
  sidebarItems = clientSidebarItems;
}

@Component({
  selector: 'app-client-policies',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `<div class="container-fluid"><div class="row"><div class="col-2"><app-sidebar [items]="sidebarItems" title="My Account"></app-sidebar></div><div class="col-10 p-4"><h2>My Policies</h2><p>View all your insurance policies.</p></div></div></div>`
})
export class ClientPoliciesComponent {
  sidebarItems = clientSidebarItems;
}

@Component({
  selector: 'app-buy-insurance',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `<div class="container-fluid"><div class="row"><div class="col-2"><app-sidebar [items]="sidebarItems" title="My Account"></app-sidebar></div><div class="col-10 p-4"><h2>Buy Insurance</h2><p>Purchase a new insurance policy.</p></div></div></div>`
})
export class BuyInsuranceComponent {
  sidebarItems = clientSidebarItems;
}

@Component({
  selector: 'app-submit-claim',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `<div class="container-fluid"><div class="row"><div class="col-2"><app-sidebar [items]="sidebarItems" title="My Account"></app-sidebar></div><div class="col-10 p-4"><h2>Submit Claim</h2><p>File a new insurance claim.</p></div></div></div>`
})
export class SubmitClaimComponent {
  sidebarItems = clientSidebarItems;
}

@Component({
  selector: 'app-client-claims',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `<div class="container-fluid"><div class="row"><div class="col-2"><app-sidebar [items]="sidebarItems" title="My Account"></app-sidebar></div><div class="col-10 p-4"><h2>My Claims</h2><p>Track your insurance claims.</p></div></div></div>`
})
export class ClientClaimsComponent {
  sidebarItems = clientSidebarItems;
}

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `<div class="container-fluid"><div class="row"><div class="col-2"><app-sidebar [items]="sidebarItems" title="My Account"></app-sidebar></div><div class="col-10 p-4"><h2>My Documents</h2><p>View and upload documents.</p></div></div></div>`
})
export class DocumentsComponent {
  sidebarItems = clientSidebarItems;
}

@Component({
  selector: 'app-client-payments',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `<div class="container-fluid"><div class="row"><div class="col-2"><app-sidebar [items]="sidebarItems" title="My Account"></app-sidebar></div><div class="col-10 p-4"><h2>Payment History</h2><p>View your payment history and invoices.</p></div></div></div>`
})
export class ClientPaymentsComponent {
  sidebarItems = clientSidebarItems;
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `<div class="container-fluid"><div class="row"><div class="col-2"><app-sidebar [items]="sidebarItems" title="My Account"></app-sidebar></div><div class="col-10 p-4"><h2>Notifications</h2><p>View your notifications and alerts.</p></div></div></div>`
})
export class NotificationsComponent {
  sidebarItems = clientSidebarItems;
}
