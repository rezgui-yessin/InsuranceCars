import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User, UserRole } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): Observable<User> {
    // Mock login - replace with actual API call
    const mockUser: User = {
      id: '1',
      fullName: 'John Doe',
      email: email,
      phone: '+1234567890',
      address: '123 Main St',
      role: this.getUserRoleFromEmail(email),
      drivingLicense: 'DL123456',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    this.currentUserSubject.next(mockUser);
    return of(mockUser);
  }

  register(user: Partial<User>, password: string): Observable<User> {
    // Mock registration - replace with actual API call
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      fullName: user.fullName || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address,
      role: UserRole.CLIENT,
      drivingLicense: user.drivingLicense,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return of(newUser);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  hasRole(role: UserRole): boolean {
    const user = this.currentUserSubject.value;
    return user ? user.role === role : false;
  }

  private getUserRoleFromEmail(email: string): UserRole {
    // Mock role assignment based on email
    if (email.includes('admin')) return UserRole.ADMIN;
    if (email.includes('agent')) return UserRole.AGENT;
    return UserRole.CLIENT;
  }
}
