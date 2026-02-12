import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Claim, ClaimStatus } from '../../shared/models/claim.model';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  private mockClaims: Claim[] = [
    {
      id: '1',
      claimNumber: 'CLM-2024-001',
      policyId: '1',
      policyNumber: 'POL-2024-001',
      clientId: '1',
      clientName: 'John Doe',
      date: new Date('2024-03-15'),
      description: 'Minor accident - rear bumper damage',
      status: ClaimStatus.APPROVED,
      amount: 500,
      documents: ['accident-report.pdf', 'photos.zip'],
      agentId: '2',
      agentName: 'Jane Smith',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      claimNumber: 'CLM-2024-002',
      policyId: '2',
      policyNumber: 'POL-2024-002',
      clientId: '1',
      clientName: 'John Doe',
      date: new Date('2024-04-20'),
      description: 'Windshield crack from road debris',
      status: ClaimStatus.UNDER_REVIEW,
      amount: 300,
      documents: ['windshield-photo.jpg'],
      agentId: '2',
      agentName: 'Jane Smith',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  constructor() { }

  getClaims(): Observable<Claim[]> {
    return of(this.mockClaims).pipe(delay(500));
  }

  getClaimById(id: string): Observable<Claim | undefined> {
    return of(this.mockClaims.find(claim => claim.id === id)).pipe(delay(300));
  }

  getClaimsByClientId(clientId: string): Observable<Claim[]> {
    return of(this.mockClaims.filter(claim => claim.clientId === clientId)).pipe(delay(500));
  }

  createClaim(claim: Partial<Claim>): Observable<Claim> {
    const newClaim: Claim = {
      id: Math.random().toString(36).substr(2, 9),
      claimNumber: `CLM-${new Date().getFullYear()}-${String(this.mockClaims.length + 1).padStart(3, '0')}`,
      policyId: claim.policyId || '',
      policyNumber: claim.policyNumber,
      clientId: claim.clientId || '',
      clientName: claim.clientName,
      date: claim.date || new Date(),
      description: claim.description || '',
      status: claim.status || ClaimStatus.PENDING,
      amount: claim.amount,
      documents: claim.documents || [],
      agentId: claim.agentId,
      agentName: claim.agentName,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.mockClaims.push(newClaim);
    return of(newClaim).pipe(delay(500));
  }

  updateClaim(id: string, claim: Partial<Claim>): Observable<Claim> {
    const index = this.mockClaims.findIndex(c => c.id === id);
    if (index !== -1) {
      this.mockClaims[index] = { ...this.mockClaims[index], ...claim, updatedAt: new Date() };
      return of(this.mockClaims[index]).pipe(delay(500));
    }
    throw new Error('Claim not found');
  }

  deleteClaim(id: string): Observable<boolean> {
    const index = this.mockClaims.findIndex(c => c.id === id);
    if (index !== -1) {
      this.mockClaims.splice(index, 1);
      return of(true).pipe(delay(500));
    }
    return of(false).pipe(delay(500));
  }
}
