// Client functional components
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent, SidebarItem } from '../../shared/components/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { CarService } from '../../core/services/car.service';
import { PolicyService } from '../../core/services/policy.service';
import { ClaimService } from '../../core/services/claim.service';
import { PaymentService } from '../../core/services/payment.service';
import { ToastService } from '../../core/services/toast.service';
import { Car } from '../../shared/models/car.model';
import { Policy, PolicyType, PolicyStatus } from '../../shared/models/policy.model';
import { Claim, ClaimStatus } from '../../shared/models/claim.model';
import { Payment } from '../../shared/models/payment.model';
import { User } from '../../shared/models/user.model';
import { Observable, map } from 'rxjs';

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
  imports: [CommonModule, RouterModule, SidebarComponent, ReactiveFormsModule, FormsModule],
  template: `
    <div class="container-fluid p-0">
      <div class="row g-0">
        <div class="col-lg-2 col-md-3">
          <app-sidebar [items]="sidebarItems" title="My Account"></app-sidebar>
        </div>
        <div class="col-lg-10 col-md-9 p-4">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>My Profile</h2>
            <button class="btn btn-primary" (click)="toggleEdit()" *ngIf="!isEditing">Edit Profile</button>
            <button class="btn btn-secondary" (click)="toggleEdit()" *ngIf="isEditing">Cancel</button>
          </div>

          <div class="card shadow-sm">
            <div class="card-body">
              <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label class="form-label">Full Name</label>
                    <input type="text" class="form-control" formControlName="fullName" [readonly]="!isEditing">
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control" formControlName="email" readonly>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label class="form-label">Phone</label>
                    <input type="tel" class="form-control" formControlName="phone" [readonly]="!isEditing">
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Driving License</label>
                    <input type="text" class="form-control" formControlName="drivingLicense" [readonly]="!isEditing">
                  </div>
                </div>
                <div class="mb-3">
                  <label class="form-label">Address</label>
                  <textarea class="form-control" formControlName="address" rows="3" [readonly]="!isEditing"></textarea>
                </div>

                <div *ngIf="isEditing" class="d-flex gap-2">
                  <button type="submit" class="btn btn-success" [disabled]="profileForm.invalid">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProfileComponent implements OnInit {
  sidebarItems = clientSidebarItems;
  profileForm: FormGroup;
  isEditing = false;
  
  constructor(private fb: FormBuilder, private authService: AuthService, private toastService: ToastService) {
    this.profileForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      drivingLicense: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.profileForm.patchValue(user);
      }
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.authService.updateProfile(this.profileForm.value).subscribe({
        next: () => {
          this.isEditing = false;
          this.toastService.success('Profile updated successfully!');
        },
        error: () => this.toastService.error('Failed to update profile.')
      });
    }
  }
}

@Component({
  selector: 'app-client-cars-deprecated',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, FormsModule, ReactiveFormsModule],
  template: `
    <div class="container-fluid p-0">
      <div class="row g-0">
        <div class="col-lg-2 col-md-3">
          <app-sidebar [items]="sidebarItems" title="My Account"></app-sidebar>
        </div>
        <div class="col-lg-10 col-md-9 p-4">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>My Cars</h2>
            <button class="btn btn-primary" (click)="showAddCarForm = !showAddCarForm">
              {{ showAddCarForm ? 'Cancel' : 'Add New Car' }}
            </button>
          </div>

          <div *ngIf="showAddCarForm" class="card mb-4 p-3 bg-light">
            <h4>Add New Vehicle</h4>
            <form [formGroup]="carForm" (ngSubmit)="addCar()">
              <div class="row">
                <div class="col-md-4 mb-2">
                  <input type="text" class="form-control" placeholder="Brand" formControlName="brand">
                </div>
                <div class="col-md-4 mb-2">
                  <input type="text" class="form-control" placeholder="Model" formControlName="model">
                </div>
                 <div class="col-md-4 mb-2">
                  <input type="number" class="form-control" placeholder="Year" formControlName="year">
                </div>
                <div class="col-md-4 mb-2">
                  <input type="text" class="form-control" placeholder="Plate Number" formControlName="plateNumber">
                </div>
                <div class="col-md-4 mb-2">
                  <input type="text" class="form-control" placeholder="VIN" formControlName="vin">
                </div>
                <div class="col-md-12 mt-2">
                   <button type="submit" class="btn btn-success" [disabled]="carForm.invalid">Register Car</button>
                </div>
              </div>
            </form>
          </div>

          <div class="row" *ngIf="cars$ | async as cars">
            <div class="col-md-6 col-lg-4 mb-4" *ngFor="let car of cars">
              <div class="card h-100">
                <img [src]="car.imageUrl || 'assets/images/car-placeholder.png'" class="card-img-top" alt="Car Image" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                  <h5 class="card-title">{{car.year}} {{car.brand}} {{car.model}}</h5>
                  <p class="card-text">
                    <strong>Plate:</strong> {{car.plateNumber}}<br>
                    <strong>VIN:</strong> {{car.vin}}
                  </p>
                  <button class="btn btn-outline-primary btn-sm">View Details</button>
                </div>
              </div>
            </div>
            <div class="col-12" *ngIf="cars.length === 0">
               <p class="alert alert-info">No cars registered yet.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ClientCarsComponentDeprecated implements OnInit {
  sidebarItems = clientSidebarItems;
  cars$: Observable<Car[]>;
  showAddCarForm = false;
  carForm: FormGroup;

  constructor(private carService: CarService, private fb: FormBuilder) {
    this.cars$ = this.carService.getCars();
    this.carForm = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      plateNumber: ['', Validators.required],
      vin: ['', Validators.required]
    });
  }

  ngOnInit() {}

  addCar() {
    if (this.carForm.valid) {
      this.carService.createCar(this.carForm.value).subscribe(() => {
        this.cars$ = this.carService.getCars();
        this.showAddCarForm = false;
        this.carForm.reset();
        alert('Car added successfully');
      });
    }
  }
}

@Component({
  selector: 'app-client-policies',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `
    <div class="container-fluid p-0">
      <div class="row g-0">
        <div class="col-lg-2 col-md-3">
          <app-sidebar [items]="sidebarItems" title="My Account"></app-sidebar>
        </div>
        <div class="col-lg-10 col-md-9 p-4">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>My Policies</h2>
            <button class="btn btn-primary" routerLink="/client/buy-insurance">Buy New Policy</button>
          </div>

          <div class="table-responsive" *ngIf="policies$ | async as policies">
            <table class="table table-hover shadow-sm bg-white rounded">
              <thead class="table-light">
                <tr>
                  <th>Policy #</th>
                  <th>Car</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let policy of policies">
                  <td>{{policy.policyNumber}}</td>
                  <td>{{policy.carInfo}}</td>
                  <td><span class="badge bg-secondary">{{policy.type}}</span></td>
                  <td>
                    <span class="badge" [ngClass]="{
                      'bg-success': policy.status === 'ACTIVE',
                      'bg-warning': policy.status === 'PENDING',
                      'bg-danger': policy.status === 'EXPIRED'
                    }">{{policy.status}}</span>
                  </td>
                  <td>{{policy.startDate | date:'mediumDate'}}</td>
                  <td>{{policy.endDate | date:'mediumDate'}}</td>
                  <td>\${{policy.price}}</td>
                  <td>
                    <button class="btn btn-sm btn-info text-white">Details</button>
                  </td>
                </tr>
              </tbody>
            </table>
             <div class="alert alert-info" *ngIf="policies.length === 0">
                No policies found.
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ClientPoliciesComponent {
  sidebarItems = clientSidebarItems;
  policies$: Observable<Policy[]>;
  constructor(private policyService: PolicyService) {
    this.policies$ = this.policyService.getPolicies();
  }
}

@Component({
  selector: 'app-buy-insurance',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, FormsModule, ReactiveFormsModule],
  template: `
    <div class="container-fluid p-0">
      <div class="row g-0">
        <div class="col-lg-2 col-md-3">
          <app-sidebar [items]="sidebarItems" title="My Account"></app-sidebar>
        </div>
        <div class="col-lg-10 col-md-9 p-4">
          <h2>Buy Insurance</h2>
          <p class="text-muted">Get coverage for your vehicle in minutes.</p>
          
          <div class="card shadow-sm mt-4">
            <div class="card-body p-4">
              <form [formGroup]="buyForm" (ngSubmit)="onSubmit()">
                
                <h5 class="mb-3">1. Select Vehicle</h5>
                <div class="mb-4">
                  <select class="form-select" formControlName="carId">
                     <option value="" disabled>Choose a car</option>
                     <option *ngFor="let car of cars$ | async" [value]="car.id">
                        {{car.year}} {{car.brand}} {{car.model}} ({{car.plateNumber}})
                     </option>
                  </select>
                  <small class="text-muted"><a routerLink="/client/cars">Add a new car</a> if not listed.</small>
                </div>

                <h5 class="mb-3">2. Select Coverage Type</h5>
                <div class="row mb-4">
                  <div class="col-md-4">
                    <div class="card h-100 cursor-pointer" [class.border-primary]="selectedType === 'THIRD_PARTY'" (click)="selectType('THIRD_PARTY')">
                      <div class="card-body text-center">
                        <h6>Third Party</h6>
                        <h3 class="text-primary">$500/yr</h3>
                        <p class="small text-muted">Basic liability coverage.</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="card h-100 cursor-pointer" [class.border-primary]="selectedType === 'COMPREHENSIVE'" (click)="selectType('COMPREHENSIVE')">
                       <div class="card-body text-center">
                        <h6>Comprehensive</h6>
                        <h3 class="text-primary">$800/yr</h3>
                        <p class="small text-muted">Collision + Theft + Fire.</p>
                      </div>
                    </div>
                  </div>
                   <div class="col-md-4">
                    <div class="card h-100 cursor-pointer" [class.border-primary]="selectedType === 'PREMIUM'" (click)="selectType('PREMIUM')">
                       <div class="card-body text-center">
                        <h6>Premium</h6>
                        <h3 class="text-primary">$1200/yr</h3>
                        <p class="small text-muted">Full protection + Roadside.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" class="btn btn-lg btn-primary w-100" [disabled]="buyForm.invalid || !selectedType">
                  Proceed to Payment
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class BuyInsuranceComponent {
  sidebarItems = clientSidebarItems;
  cars$: Observable<Car[]>;
  buyForm: FormGroup;
  selectedType: string = '';

  constructor(private fb: FormBuilder, private carService: CarService, private policyService: PolicyService) {
    this.cars$ = this.carService.getCars();
    this.buyForm = this.fb.group({
      carId: ['', Validators.required]
    });
  }

  selectType(type: string) {
    this.selectedType = type;
  }

  onSubmit() {
    if (this.buyForm.valid && this.selectedType) {
      const carId = this.buyForm.value.carId;
      this.carService.getCarById(carId).subscribe(car => {
         if (car) {
           let type: PolicyType = PolicyType.BASIC;
           if (this.selectedType === 'COMPREHENSIVE') type = PolicyType.FULL_COVERAGE;
           if (this.selectedType === 'PREMIUM') type = PolicyType.PREMIUM;

           const policyData: Partial<Policy> = {
             carId: Number(car.id), // Ensure correct type
             carInfo: `${car.year} ${car.brand} ${car.model}`,
             type: type,
             price: this.selectedType === 'THIRD_PARTY' ? 500 : this.selectedType === 'COMPREHENSIVE' ? 800 : 1200,
             startDate: new Date(),
             endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
             status: PolicyStatus.PENDING
           };
           
           this.policyService.createPolicy(policyData).subscribe(() => {
             alert(`Insurance purchased successfully! Policy pending approval.`);
             this.selectedType = '';
             this.buyForm.reset();
           });
         }
      });
    }
  }
}

@Component({
  selector: 'app-submit-claim',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, ReactiveFormsModule, FormsModule],
  template: `
    <div class="container-fluid p-0">
      <div class="row g-0">
        <div class="col-lg-2 col-md-3">
          <app-sidebar [items]="sidebarItems" title="My Account"></app-sidebar>
        </div>
        <div class="col-lg-10 col-md-9 p-4">
          <h2>Submit Claim</h2>
          
           <div class="card shadow-sm mt-4">
            <div class="card-body p-4">
               <form [formGroup]="claimForm" (ngSubmit)="onSubmit()">
                  <div class="mb-3">
                    <label class="form-label">Select Policy</label>
                    <select class="form-select" formControlName="policyId">
                       <option value="" disabled>Choose policy</option>
                       <option *ngFor="let policy of policies$ | async" [value]="policy.id">
                          {{policy.policyNumber}} - {{policy.carInfo}}
                       </option>
                    </select>
                  </div>
                  
                  <div class="mb-3">
                    <label class="form-label">Date of Incident</label>
                    <input type="date" class="form-control" formControlName="date">
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Description</label>
                    <textarea class="form-control" rows="4" formControlName="description" placeholder="Describe what happened..."></textarea>
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Upload Evidence (Images/PDF)</label>
                    <input type="file" class="form-control" multiple>
                  </div>

                  <button type="submit" class="btn btn-danger" [disabled]="claimForm.invalid">Submit Claim</button>
               </form>
            </div>
           </div>

        </div>
      </div>
    </div>
  `
})
export class SubmitClaimComponent {
  sidebarItems = clientSidebarItems;
  policies$: Observable<Policy[]>;
  claimForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private policyService: PolicyService, 
    private claimService: ClaimService,
    private toastService: ToastService
  ) {
    this.policies$ = this.policyService.getPolicies();
    this.claimForm = this.fb.group({
      policyId: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  
  onSubmit() {
    if (this.claimForm.valid) {
      this.claimService.createClaim(this.claimForm.value).subscribe({
        next: () => {
          this.toastService.success('Claim submitted successfully. We will review it shortly.');
          this.claimForm.reset();
        },
        error: () => this.toastService.error('Failed to submit claim.')
      });
    } else {
        this.toastService.error('Please complete the form.');
    }
  }
}

@Component({
  selector: 'app-client-claims',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `
    <div class="container-fluid p-0">
      <div class="row g-0">
        <div class="col-lg-2 col-md-3">
          <app-sidebar [items]="sidebarItems" title="My Account"></app-sidebar>
        </div>
        <div class="col-lg-10 col-md-9 p-4">
          <h2>Track Claims</h2>
           <div class="table-responsive mt-3" *ngIf="claims$ | async as claims">
            <table class="table table-striped border">
              <thead class="bg-light">
                <tr>
                  <th>Claim #</th>
                  <th>Policy</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let claim of claims">
                   <td>{{claim.claimNumber}}</td>
                   <td>{{claim.policyNumber}}</td>
                   <td>{{claim.date | date}}</td>
                   <td>{{claim.description}}</td>
                   <td>
                      <span class="badge" [ngClass]="{
                        'bg-warning': claim.status === 'PENDING',
                        'bg-success': claim.status === 'APPROVED',
                        'bg-danger': claim.status === 'REJECTED'
                      }">{{claim.status}}</span>
                   </td>
                   <td>{{claim.amount ? ('$' + claim.amount) : 'TBD'}}</td>
                </tr>
              </tbody>
            </table>
            <div *ngIf="claims.length === 0" class="alert alert-warning">No claims history found.</div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ClientClaimsComponent {
  sidebarItems = clientSidebarItems;
  claims$: Observable<Claim[]>;
  constructor(private claimService: ClaimService) {
    this.claims$ = this.claimService.getClaims();
  }
}

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `
    <div class="container-fluid p-0">
      <div class="row g-0">
        <div class="col-lg-2 col-md-3">
          <app-sidebar [items]="sidebarItems" title="My Account"></app-sidebar>
        </div>
        <div class="col-lg-10 col-md-9 p-4">
          <h2>My Documents</h2>
          
          <!-- Drag and Drop Area -->
          <div class="upload-zone p-5 mb-4 text-center border rounded bg-light"
               (dragover)="onDragOver($event)"
               (dragleave)="onDragLeave($event)"
               (drop)="onDrop($event)"
               [class.border-primary]="isDragging"
               [class.bg-white]="isDragging"
               style="border: 2px dashed #ccc !important; cursor: pointer; transition: all 0.3s ease;">
             <i class="bi bi-cloud-arrow-up fs-1 text-muted"></i>
             <h4 class="mt-3">Drag & Drop PDF files here</h4>
             <p class="text-muted">or click to browse</p>
             <input type="file" multiple accept=".pdf" class="d-none" #fileInput (change)="onFileSelected($event)">
             <button class="btn btn-outline-primary mt-2" (click)="fileInput.click()">Select Files</button>
          </div>

          <!-- Uploaded Files List -->
          <div *ngIf="uploadedFiles.length > 0" class="mb-4">
             <h5>Newly Uploaded</h5>
             <div class="list-group">
                <div *ngFor="let file of uploadedFiles" class="list-group-item d-flex justify-content-between align-items-center">
                   <div>
                     <i class="bi bi-file-earmark-pdf text-danger me-2"></i>
                     {{ file.name }}
                     <small class="text-muted ms-2">({{ (file.size / 1024 / 1024) | number:'1.2-2' }} MB)</small>
                   </div>
                   <span class="badge bg-success">Uploaded</span>
                </div>
             </div>
          </div>

          <div class="row mt-4">
            <div class="col-md-4 mb-3">
               <div class="card text-center p-4">
                 <i class="bi bi-file-earmark-pdf fs-1 text-danger"></i>
                 <h5 class="mt-2">Insurance_Policy_2024.pdf</h5>
                 <button class="btn btn-sm btn-outline-primary mt-2">Download</button>
               </div>
            </div>
            <div class="col-md-4 mb-3">
               <div class="card text-center p-4">
                 <i class="bi bi-file-earmark-image fs-1 text-info"></i>
                 <h5 class="mt-2">Car_Inspection_Report.jpg</h5>
                 <button class="btn btn-sm btn-outline-primary mt-2">Download</button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DocumentsComponent {
  sidebarItems = clientSidebarItems;
  isDragging = false;
  uploadedFiles: File[] = [];

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    
    if (event.dataTransfer?.files) {
      this.handleFiles(event.dataTransfer.files);
    }
  }

  onFileSelected(event: any) {
    if (event.target.files) {
      this.handleFiles(event.target.files);
    }
  }

  handleFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type === 'application/pdf') {
        this.uploadedFiles.push(file);
        // Here you would typically call a service to upload the file
        console.log('File ready for upload:', file.name);
      } else {
        alert(`File ${file.name} is not a PDF.`);
      }
    }
    if (this.uploadedFiles.length > 0) {
      alert(`${this.uploadedFiles.length} PDF(s) successfully added.`);
    }
  }
}

@Component({
  selector: 'app-client-payments',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `
    <div class="container-fluid p-0">
      <div class="row g-0">
        <div class="col-lg-2 col-md-3">
          <app-sidebar [items]="sidebarItems" title="My Account"></app-sidebar>
        </div>
        <div class="col-lg-10 col-md-9 p-4">
          <h2>Payment History</h2>
          
          <div class="table-responsive mt-3" *ngIf="payments$ | async as payments">
            <table class="table">
              <thead>
                <tr>
                   <th>Invoice #</th>
                   <th>Date</th>
                   <th>Policy</th>
                   <th>Amount</th>
                   <th>Method</th>
                   <th>Status</th>
                   <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let payment of payments$ | async">
                   <td>{{payment.transactionId || 'INV-' + payment.id}}</td>
                   <td>{{payment.date | date}}</td>
                   <td>{{payment.policyNumber}}</td>
                   <td>\${{payment.amount}}</td>
                   <td>{{payment.method}}</td>
                   <td><span class="badge bg-success">{{payment.status}}</span></td>
                   <td>
                     <button class="btn btn-sm btn-outline-secondary" (click)="printInvoice(payment)">
                       <i class="bi bi-printer"></i> Print
                     </button>
                   </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  `
})
export class ClientPaymentsComponent {
  sidebarItems = clientSidebarItems;
  payments$: Observable<Payment[]>;
  constructor(private paymentService: PaymentService) {
    this.payments$ = this.paymentService.getPayments();
  }

  printInvoice(payment: Payment) {
    const printContent = `
      <html>
      <head>
        <title>Invoice #${payment.transactionId || 'INV-' + payment.id}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .invoice-details { margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .total { text-align: right; font-weight: bold; margin-top: 20px; font-size: 1.2em; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>INVOICE</h1>
          <p><strong>Invoice Number:</strong> ${payment.transactionId || 'INV-' + payment.id}</p>
          <p><strong>Date:</strong> ${new Date(payment.date).toLocaleDateString()}</p>
        </div>
        
        <div class="invoice-details">
          <p><strong>Bill To:</strong> ${payment.clientName}</p>
          <p><strong>Policy Number:</strong> ${payment.policyNumber}</p>
          <p><strong>Payment Method:</strong> ${payment.method}</p>
        </div>

        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Insurance Premium Payment</td>
              <td>$${payment.amount}</td>
            </tr>
          </tbody>
        </table>

        <div class="total">
          Total: $${payment.amount}
        </div>
        
        <div style="margin-top: 50px; text-align: center; color: #666;">
          <p>Thank you for your business!</p>
        </div>
      </body>
      </html>
    `;

    const popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    if (popupWin) {
      popupWin.document.open();
      popupWin.document.write(printContent);
      popupWin.document.close();
      // Wait for content to load then print
      setTimeout(() => {
        popupWin.print();
        popupWin.close();
      }, 500);
    }
  }
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `
    <div class="container-fluid p-0">
      <div class="row g-0">
        <div class="col-lg-2 col-md-3">
          <app-sidebar [items]="sidebarItems" title="My Account"></app-sidebar>
        </div>
        <div class="col-lg-10 col-md-9 p-4">
          <h2>Notifications</h2>
          <div class="list-group mt-3">
            <a href="#" class="list-group-item list-group-item-action flex-column align-items-start active">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">Policy Renewal Notice</h5>
                <small>3 days ago</small>
              </div>
              <p class="mb-1">Your policy POL-2023-001 is expiring soon. Renew now to avoid service interruption.</p>
            </a>
            <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">Claim Update</h5>
                <small class="text-muted">1 week ago</small>
              </div>
              <p class="mb-1">Your claim CLM-2024-001 has been approved.</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class NotificationsComponent {
  sidebarItems = clientSidebarItems;
}
