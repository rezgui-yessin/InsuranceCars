import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>
    <div class="container py-5">
      <div class="text-center mb-5">
        <h1 class="display-4 fw-bold mb-3">Insurance Plans</h1>
        <p class="lead text-muted">Choose the perfect coverage for your vehicle</p>
      </div>
      
      <div class="row g-4">
        <div class="col-lg-4">
          <div class="card h-100 border-0 shadow-sm">
            <div class="card-body p-4">
              <div class="text-center mb-4">
                <div class="plan-icon bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 80px; height: 80px;">
                  <i class="bi bi-shield fs-1 text-primary"></i>
                </div>
                <h3 class="fw-bold">Basic</h3>
                <p class="text-muted">Essential coverage</p>
              </div>
              <div class="text-center mb-4">
                <h2 class="fw-bold">$599<small class="text-muted fs-6">/year</small></h2>
              </div>
              <ul class="list-unstyled">
                <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Liability Coverage</li>
                <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Property Damage</li>
                <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>24/7 Support</li>
                <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Roadside Assistance</li>
              </ul>
              <button class="btn btn-outline-primary w-100 mt-4">Select Plan</button>
            </div>
          </div>
        </div>
        
        <div class="col-lg-4">
          <div class="card h-100 border-0 shadow-lg" style="transform: scale(1.05);">
            <div class="card-header bg-primary text-white text-center py-3">
              <span class="badge bg-warning text-dark">Most Popular</span>
            </div>
            <div class="card-body p-4">
              <div class="text-center mb-4">
                <div class="plan-icon bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 80px; height: 80px;">
                  <i class="bi bi-shield-check fs-1 text-white"></i>
                </div>
                <h3 class="fw-bold">Premium</h3>
                <p class="text-muted">Comprehensive protection</p>
              </div>
              <div class="text-center mb-4">
                <h2 class="fw-bold">$1,199<small class="text-muted fs-6">/year</small></h2>
              </div>
              <ul class="list-unstyled">
                <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Everything in Basic</li>
                <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Collision Coverage</li>
                <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Theft Protection</li>
                <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Rental Car Coverage</li>
                <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Glass Repair</li>
              </ul>
              <button class="btn btn-primary w-100 mt-4">Select Plan</button>
            </div>
          </div>
        </div>
        
        <div class="col-lg-4">
          <div class="card h-100 border-0 shadow-sm">
            <div class="card-body p-4">
              <div class="text-center mb-4">
                <div class="plan-icon bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 80px; height: 80px;">
                  <i class="bi bi-shield-fill-check fs-1 text-success"></i>
                </div>
                <h3 class="fw-bold">Full Coverage</h3>
                <p class="text-muted">Complete peace of mind</p>
              </div>
              <div class="text-center mb-4">
                <h2 class="fw-bold">$1,799<small class="text-muted fs-6">/year</small></h2>
              </div>
              <ul class="list-unstyled">
                <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Everything in Premium</li>
                <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Natural Disasters</li>
                <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Vandalism Coverage</li>
                <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Personal Injury</li>
                <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Legal Assistance</li>
                <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Zero Deductible</li>
              </ul>
              <button class="btn btn-outline-primary w-100 mt-4">Select Plan</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
  `,
  styles: [`
    .card {
      transition: all 0.3s ease;
      border-radius: 15px;
    }
    .card:hover {
      transform: translateY(-10px);
    }
    .btn {
      border-radius: 50px;
      font-weight: 600;
      padding: 0.75rem 2rem;
    }
  `]
})
export class PlansComponent {}
