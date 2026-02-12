import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // Image assets mapped for use with absolute paths
  heroImage = '/assets/images/happy-customer-buying-brand-new-car-local-car-dealership.jpg';
  aboutImage = '/assets/images/car-insurance-coverage-accident-benefits.jpg';
  trustImage = '/assets/images/GettyImages-1328171458-5b2c06f6aaf241388c8718208fb65540.jpg';

  services = [
    {
      title: 'Car Protection',
      description: 'Comprehensive coverage against accidents and theft.',
      image: '/assets/images/car-technician-with-stethoscope-car-showroom.jpg',
      icon: 'shield-check'
    },
    {
      title: 'Fast Claims',
      description: 'Quick, hassle-free claim processing in 24 hours.',
      image: '/assets/images/insurance-agent-working-site-car-accident-claim-process-people-car-insurance-claim.jpg',
      icon: 'lightning-charge'
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock assistance whenever you need us.',
      image: '/assets/images/online-car-insurance-application.jpg',
      icon: 'headset'
    },
    {
      title: 'Flexible Plans',
      description: 'Customizable insurance plans that fit your budget.',
      image: '/assets/images/Car1.jpg',
      icon: 'sliders'
    }
  ];

  ourCars = [
    { image: '/assets/images/Car.jpg', title: 'Luxury Sedans' },
    { image: '/assets/images/Car1.jpg', title: 'Sport Performance' },
    { image: '/assets/images/Bike.jpg', title: 'Motorbikes' },
    { image: '/assets/images/happy-customer-buying-brand-new-car-local-car-dealership.jpg', title: 'Family SUVs' }
  ];

  plans = [
    { 
      name: 'Basic', 
      price: '$29', 
      period: '/mo',
      features: ['Liability Coverage', '24/7 Support', 'Mobile App Access'], 
      image: '/assets/images/Car.jpg' 
    },
    { 
      name: 'Premium', 
      price: '$59', 
      period: '/mo',
      features: ['Full Coverage', 'Roadside Assistance', 'Rental Car Reimbursement', 'Zero Deductible'], 
      image: '/assets/images/Car1.jpg', 
      recommended: true 
    },
    { 
      name: 'Full Coverage', 
      price: '$99', 
      period: '/mo',
      features: ['All Premium Features', 'Personal Injury Protection', 'Gap Insurance', 'Global Coverage'], 
      image: '/assets/images/Bike.jpg' 
    }
  ];
}
