// src/app/shared/components/toast/toasts.component.ts
import { Component, TemplateRef } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';
import { CommonModule } from '@angular/common'; // Use CommonModule for ngFor

@Component({
  selector: 'app-toasts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 1200">
      <div *ngFor="let toast of toastService.toasts" class="toast show" [ngClass]="toast.classname" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header" [ngClass]="{'bg-light': false, 'text-dark': true}" *ngIf="false">
          <!-- Optional header if needed -->
          <strong class="me-auto">{{ toast.header }}</strong>
          <button type="button" class="btn-close" (click)="toastService.remove(toast)"></button>
        </div>
        <div class="toast-body d-flex justify-content-between align-items-center">
          <span>{{ toast.body }}</span>
          <button type="button" class="btn-close btn-close-white ms-2" (click)="toastService.remove(toast)"></button>
        </div>
      </div>
    </div>
  `,
  host: { '[class.ngb-toasts]': 'true' }
})
export class ToastsComponent {
  constructor(public toastService: ToastService) {}
}
