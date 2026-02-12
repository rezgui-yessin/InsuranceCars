import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
<footer class="footer bg-dark text-white pt-5 pb-4 mt-5">
  <div class="container">
    <div class="row">
      <div class="col-lg-4 col-md-6 mb-4">
        <h5 class="text-primary mb-3">
          <i class="bi bi-shield-check me-2"></i>
          AutoSure
        </h5>
        <p class="text-light">
          Your trusted partner for comprehensive car insurance coverage. 
          Protecting your journey, every mile of the way.
        </p>
        <div class="social-links mt-3">
          <a href="#" class="text-white me-3"><i class="bi bi-facebook fs-5"></i></a>
          <a href="#" class="text-white me-3"><i class="bi bi-twitter fs-5"></i></a>
          <a href="#" class="text-white me-3"><i class="bi bi-instagram fs-5"></i></a>
          <a href="#" class="text-white"><i class="bi bi-linkedin fs-5"></i></a>
        </div>
      </div>
      
      <div class="col-lg-2 col-md-6 mb-4">
        <h6 class="text-uppercase mb-3">Quick Links</h6>
        <ul class="list-unstyled">
          <li class="mb-2"><a routerLink="/" class="text-light text-decoration-none">Home</a></li>
          <li class="mb-2"><a routerLink="/about" class="text-light text-decoration-none">About Us</a></li>
          <li class="mb-2"><a routerLink="/plans" class="text-light text-decoration-none">Plans</a></li>
          <li class="mb-2"><a routerLink="/contact" class="text-light text-decoration-none">Contact</a></li>
        </ul>
      </div>
      
      <div class="col-lg-3 col-md-6 mb-4">
        <h6 class="text-uppercase mb-3">Services</h6>
        <ul class="list-unstyled">
          <li class="mb-2"><a href="#" class="text-light text-decoration-none">Car Insurance</a></li>
          <li class="mb-2"><a href="#" class="text-light text-decoration-none">Claims Processing</a></li>
          <li class="mb-2"><a href="#" class="text-light text-decoration-none">24/7 Support</a></li>
          <li class="mb-2"><a href="#" class="text-light text-decoration-none">Policy Renewal</a></li>
        </ul>
      </div>
      
      <div class="col-lg-3 col-md-6 mb-4">
        <h6 class="text-uppercase mb-3">Contact Info</h6>
        <ul class="list-unstyled text-light">
          <li class="mb-2">
            <i class="bi bi-geo-alt me-2"></i>
            123 Insurance St, City, State
          </li>
          <li class="mb-2">
            <i class="bi bi-telephone me-2"></i>
            +1 (555) 123-4567
          </li>
          <li class="mb-2">
            <i class="bi bi-envelope me-2"></i>
            info&#64;autosure.com
          </li>
          <li class="mb-2">
            <i class="bi bi-clock me-2"></i>
            Mon - Fri: 9AM - 6PM
          </li>
        </ul>
      </div>
    </div>
    
    <hr class="bg-secondary my-4">
    
    <div class="row">
      <div class="col-md-6 text-center text-md-start">
        <p class="mb-0 text-light">
          &copy; {{ currentYear }} AutoSure. All rights reserved.
        </p>
      </div>
      <div class="col-md-6 text-center text-md-end">
        <a href="#" class="text-light text-decoration-none me-3">Privacy Policy</a>
        <a href="#" class="text-light text-decoration-none">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>
  `,
  styles: [`
.footer {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

.footer h5, .footer h6 {
  font-weight: 600;
}

.footer a {
  transition: all 0.3s ease;
}

.footer a:hover {
  color: var(--bs-primary) !important;
  transform: translateX(5px);
  display: inline-block;
}

.social-links a {
  transition: all 0.3s ease;
  display: inline-block;
}

.social-links a:hover {
  transform: translateY(-3px);
  color: var(--bs-primary) !important;
}

.footer ul li {
  transition: all 0.2s ease;
}

.footer ul li:hover {
  padding-left: 5px;
}
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
