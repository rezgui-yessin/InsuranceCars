// src/app/core/services/toast.service.ts
import { Injectable } from '@angular/core';

export interface Toast {
  header: string;
  body: string;
  delay?: number;
  classname?: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: Toast[] = [];

  show(header: string, body: string, options: Partial<Toast> = {}) {
    const toast = { header, body, ...options };
    this.toasts.push(toast);

    // Auto dismiss
    if (toast.delay) {
      setTimeout(() => this.remove(toast), toast.delay);
    }
  }

  remove(toast: Toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  success(message: string) {
    this.show('Success', message, { classname: 'bg-success text-white', delay: 3000 });
  }
  
  error(message: string) {
    this.show('Error', message, { classname: 'bg-danger text-white', delay: 5000 });
  }
  
  info(message: string) {
    this.show('Info', message, { classname: 'bg-info text-white', delay: 3000 });
  }
}
