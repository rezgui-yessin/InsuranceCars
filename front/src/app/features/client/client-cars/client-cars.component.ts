import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SidebarComponent, SidebarItem } from '../../../shared/components/sidebar/sidebar.component';
import { CarService } from '../../../core/services/car.service';
import { ToastService } from '../../../core/services/toast.service';
import { AuthService } from '../../../core/services/auth.service';
import { Car } from '../../../shared/models/car.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client-cars',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './client-cars.component.html',
  styleUrl: './client-cars.component.css'
})
export class ClientCarsComponent implements OnInit {
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

  cars$: Observable<Car[]>;
  showAddCarForm = false;
  carForm: FormGroup;
  selectedFile: File | null = null;
  currentUser: any;

  constructor(
    private carService: CarService, 
    private fb: FormBuilder,
    private toastService: ToastService,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.getCurrentUser();
    // Assuming we can get 'my cars' or allow filtering. 
    // If backend doesn't support "my cars" specifically, we might get all cars if the endpoint isn't secured properly.
    // Ideally, we use getMyCars() which we will fix to point to the right place or use logic.
    this.cars$ = this.carService.getMyCars(); 
    
    this.carForm = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      plateNumber: ['', Validators.required],
      vin: ['', Validators.required],
      clientId: [this.currentUser?.id] // Automatically associate with current user if needed by backend
    });
  }

  ngOnInit() {}

  toggleAddCarForm() {
    this.showAddCarForm = !this.showAddCarForm;
    if (!this.showAddCarForm) {
      this.carForm.reset();
      this.selectedFile = null;
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    if (this.carForm.invalid) {
      this.toastService.error('Please fill all required fields correctly.');
      return;
    }

    const carData = {
      ...this.carForm.value,
      clientId: this.currentUser?.id // Ensure ID is sent
    };

    this.carService.createCar(carData, this.selectedFile || undefined).subscribe({
      next: (newCar) => {
        this.toastService.success('Car added successfully!');
        this.cars$ = this.carService.getMyCars(); // Refresh list
        this.toggleAddCarForm();
      },
      error: (err) => {
        console.error(err);
        this.toastService.error('Failed to add car. Please try again.');
      }
    });
  }

  deleteCar(id: number) {
    if(confirm('Are you sure you want to delete this car?')) {
      this.carService.deleteCar(id).subscribe({
        next: () => {
          this.toastService.success('Car deleted successfully.');
          this.cars$ = this.carService.getMyCars();
        },
        error: (err) => {
          this.toastService.error('Failed to delete car.');
        }
      });
    }
  }
}
