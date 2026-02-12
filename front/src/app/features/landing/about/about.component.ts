import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>
    <div class="container py-5">
      <h1 class="display-4 fw-bold text-center mb-5">About AutoSure</h1>
      <div class="row align-items-center mb-5">
        <div class="col-lg-6">
          <h2 class="fw-bold mb-4">Your Trusted Insurance Partner</h2>
          <p class="lead">AutoSure has been protecting drivers for over 20 years with comprehensive car insurance solutions.</p>
          <p>We believe in providing transparent, affordable, and reliable insurance coverage that gives you peace of mind on every journey.</p>
        </div>
        <div class="col-lg-6">
          <img src="assets/images/team.jpg" alt="Team" class="img-fluid rounded shadow" style="max-height: 400px; width: 100%; object-fit: cover;">
        </div>
      </div>
    </div>
    <app-footer></app-footer>
  `
})
export class AboutComponent {}
