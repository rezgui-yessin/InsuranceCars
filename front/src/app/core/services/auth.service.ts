import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User, UserRole } from '../../shared/models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password }).pipe(
      map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('token', user.token);
          this.currentUserSubject.next(user);
        }
        return user;
      })
    );
  }

  register(user: Partial<User>, password: string): Observable<User> {
    const payload = {
      ...user,
      password,
      role: user.role || UserRole.CLIENT
    };
    return this.http.post<User>(`${this.apiUrl}/register`, payload);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  hasRole(role: UserRole): boolean {
    const user = this.currentUserSubject.value;
    return user ? user.role === role : false;
  }

  updateProfile(user: Partial<User>): Observable<User> {
    // Determine endpoint based on role or use generic client endpoint for now
    // Assuming mostly Clients use this in this context
    const role = this.getCurrentUser()?.role;
    let endpoint = `${environment.apiUrl}/client/profile`; 
    if (role === UserRole.ADMIN) endpoint = `${environment.apiUrl}/admin/profile`;
    if (role === UserRole.AGENT) endpoint = `${environment.apiUrl}/agent/profile`;
    
    return this.http.put<User>(endpoint, user).pipe(
        map(updatedUser => {
            const currentUser = this.getCurrentUser();
            const merged = { ...currentUser, ...updatedUser };
            localStorage.setItem('currentUser', JSON.stringify(merged));
            this.currentUserSubject.next(merged);
            return merged;
        })
    );
  }
}
