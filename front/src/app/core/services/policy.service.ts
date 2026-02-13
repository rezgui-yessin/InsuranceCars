import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Policy } from '../../shared/models/policy.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  private apiUrl = `${environment.apiUrl}/policies`;
  private clientUrl = `${environment.apiUrl}/client/policies`;

  constructor(private http: HttpClient) { }

  getPolicies(): Observable<Policy[]> {
    return this.http.get<Policy[]>(this.apiUrl);
  }
  
  getMyPolicies(): Observable<Policy[]> {
    return this.http.get<Policy[]>(this.clientUrl);
  }

  getPolicyById(id: number): Observable<Policy> {
    return this.http.get<Policy>(`${this.apiUrl}/${id}`);
  }

  getPoliciesByClientId(clientId: number): Observable<Policy[]> {
     // NOTE: This assumes handling for the current user (Client Dashboard)
     // A proper implementation for Admin would be: this.http.get(...) with query param
     return this.getMyPolicies(); 
  }

  createPolicy(policy: Partial<Policy>): Observable<Policy> {
    return this.http.post<Policy>(this.clientUrl, policy);
  }
}
