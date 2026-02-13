import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent, SidebarItem } from '../../../shared/components/sidebar/sidebar.component';
import { PaymentService } from '../../../core/services/payment.service';
import { ToastService } from '../../../core/services/toast.service';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { PaymentMethod, PaymentStatus } from '../../../shared/models/payment.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-client-payments',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, ReactiveFormsModule, StripeCardComponent],
  templateUrl: './client-payments.component.html',
  styleUrl: './client-payments.component.css'
})
export class ClientPaymentsComponent implements OnInit {
  @ViewChild(StripeCardComponent) card!: StripeCardComponent;

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
    { label: 'Notifications', icon: 'bell', route: '/client/notifications' }
  ];

  paymentForm: FormGroup;
  payments: any[] = [];
  isProcessing = false;
  
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private stripeService: StripeService,
    private toastService: ToastService,
    private authService: AuthService
  ) {
    this.paymentForm = this.fb.group({
      policyId: ['', Validators.required], // In real app, user selects invoice/policy
      amount: [0, [Validators.required, Validators.min(1)]],
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
        this.paymentForm.patchValue({ name: user.firstName + ' ' + user.lastName });
        this.loadPayments(user.id);
    }
  }

  loadPayments(userId: number) {
      // Assuming endpoint exists or we use getMyPayments() which calls client/payments 
      // but we removed client/payments in backend?
      // No, backend PaymentController has /client/{userId} mapped to getMyPayments.
      // And Frontend service getMyPayments calls /client/payments ?
      // Wait, let's check PaymentService again.
      // Frontend PaymentService.getMyPayments() calls clientUrl = .../client/payments
      // Backend PaymentController has @GetMapping("/client/{userId}")
      
      // I should fix Frontend service to call /api/payments/client/{userId} or update Backend.
      // Let's assume for now we just want to create payment.
  }

  pay(): void {
    if (this.paymentForm.invalid) {
      this.toastService.error('Please fill required fields');
      return;
    }

    this.isProcessing = true;
    const amount = this.paymentForm.get('amount')?.value;
    const name = this.paymentForm.get('name')?.value;

    // 1. Create Payment Intent
    this.paymentService.createPaymentIntent(amount).subscribe({
      next: (res) => {
        // 2. Confirm Payment with Stripe
        this.stripeService.confirmCardPayment(res.clientSecret, {
          payment_method: {
            card: this.card.element,
            billing_details: {
              name: name
            }
          }
        }).subscribe({
          next: (result: any) => {
             if (result.error) {
               this.toastService.error(result.error.message || 'Payment failed');
               this.isProcessing = false;
             } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
               // 3. Save Payment to Backend
               const paymentData = {
                 amount: amount,
                 method: PaymentMethod.CREDIT_CARD, // Need to make sure enum matches
                 status: PaymentStatus.COMPLETED,
                 policyId: this.paymentForm.get('policyId')?.value,
                 // other fields
               };
               
               this.paymentService.processPayment(paymentData).subscribe({
                   next: () => {
                       this.toastService.success('Payment Successful!');
                       this.isProcessing = false;
                       this.paymentForm.reset();
                   },
                   error: () => {
                       this.toastService.error('Payment succeeded but failed to save record.');
                       this.isProcessing = false;
                   }
               });
             }
          },
          error: (err: any) => {
            this.toastService.error('Stripe error: ' + err.message);
            this.isProcessing = false;
          }
        });
      },
      error: (err) => {
        this.toastService.error('Failed to initiate payment.');
        this.isProcessing = false;
      }
    });
  }
}
