import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Payment, PaymentStatus, PaymentMethod } from '../../shared/models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private mockPayments: Payment[] = [
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      policyId: '1',
      policyNumber: 'POL-2024-001',
      clientId: '1',
      clientName: 'John Doe',
      amount: 1200,
      status: PaymentStatus.COMPLETED,
      method: PaymentMethod.CREDIT_CARD,
      date: new Date('2024-01-01'),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      policyId: '2',
      policyNumber: 'POL-2024-002',
      clientId: '1',
      clientName: 'John Doe',
      amount: 1800,
      status: PaymentStatus.COMPLETED,
      method: PaymentMethod.BANK_TRANSFER,
      date: new Date('2024-02-01'),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  constructor() { }

  getPayments(): Observable<Payment[]> {
    return of(this.mockPayments).pipe(delay(500));
  }

  getPaymentById(id: string): Observable<Payment | undefined> {
    return of(this.mockPayments.find(payment => payment.id === id)).pipe(delay(300));
  }

  getPaymentsByClientId(clientId: string): Observable<Payment[]> {
    return of(this.mockPayments.filter(payment => payment.clientId === clientId)).pipe(delay(500));
  }

  createPayment(payment: Partial<Payment>): Observable<Payment> {
    const newPayment: Payment = {
      id: Math.random().toString(36).substr(2, 9),
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(this.mockPayments.length + 1).padStart(3, '0')}`,
      policyId: payment.policyId || '',
      policyNumber: payment.policyNumber,
      clientId: payment.clientId || '',
      clientName: payment.clientName,
      amount: payment.amount || 0,
      status: payment.status || PaymentStatus.PENDING,
      method: payment.method || PaymentMethod.CREDIT_CARD,
      date: payment.date || new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.mockPayments.push(newPayment);
    return of(newPayment).pipe(delay(500));
  }

  updatePayment(id: string, payment: Partial<Payment>): Observable<Payment> {
    const index = this.mockPayments.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockPayments[index] = { ...this.mockPayments[index], ...payment, updatedAt: new Date() };
      return of(this.mockPayments[index]).pipe(delay(500));
    }
    throw new Error('Payment not found');
  }

  deletePayment(id: string): Observable<boolean> {
    const index = this.mockPayments.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockPayments.splice(index, 1);
      return of(true).pipe(delay(500));
    }
    return of(false).pipe(delay(500));
  }
}
