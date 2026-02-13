import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Claim } from '../../shared/models/claim.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  private apiUrl = `${environment.apiUrl}/claims`;
  private clientUrl = `${environment.apiUrl}/client/claims`;

  constructor(private http: HttpClient) { }

  getClaims(): Observable<Claim[]> {
    return this.http.get<Claim[]>(this.apiUrl);
  }

  getClaimsByClientId(clientId: number): Observable<Claim[]> {
    return this.http.get<Claim[]>(this.clientUrl);
  }

  getClaimById(id: number): Observable<Claim> {
    return this.http.get<Claim>(`${this.apiUrl}/${id}`);
  }

  createClaim(claim: Partial<Claim>): Observable<Claim> {
    return this.http.post<Claim>(this.clientUrl, claim);
  }

  updateClaimStatus(id: number, status: string): Observable<Claim> {
    return this.http.put<Claim>(`${this.apiUrl}/${id}/status`, { status });
  }
}
