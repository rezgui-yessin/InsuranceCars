import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Payment } from '../../shared/models/payment.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = `${environment.apiUrl}/payments`;
  private clientUrl = `${environment.apiUrl}/client/payments`;

  constructor(private http: HttpClient) { }

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.apiUrl);
  }
  
  getMyPayments(): Observable<Payment[]> {
      return this.http.get<Payment[]>(this.clientUrl);
  }

  getPaymentById(id: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.apiUrl}/${id}`);
  }

  createPaymentIntent(amount: number): Observable<{clientSecret: string}> {
    return this.http.post<{clientSecret: string}>(`${this.apiUrl}/create-payment-intent`, { amount });
  }

  processPayment(payment: Partial<Payment>): Observable<Payment> {
    return this.http.post<Payment>(`${this.apiUrl}/confirm`, payment);
  }
}
