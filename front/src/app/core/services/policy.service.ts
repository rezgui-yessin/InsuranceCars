import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Policy, PolicyType, PolicyStatus } from '../../shared/models/policy.model';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  private mockPolicies: Policy[] = [
    {
      id: '1',
      policyNumber: 'POL-2024-001',
      clientId: '1',
      clientName: 'John Doe',
      carId: '1',
      carInfo: 'Toyota Camry 2022',
      type: PolicyType.PREMIUM,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2025-01-01'),
      price: 1200,
      status: PolicyStatus.ACTIVE,
      agentId: '2',
      agentName: 'Jane Smith',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      policyNumber: 'POL-2024-002',
      clientId: '1',
      clientName: 'John Doe',
      carId: '2',
      carInfo: 'Honda Accord 2023',
      type: PolicyType.FULL_COVERAGE,
      startDate: new Date('2024-02-01'),
      endDate: new Date('2025-02-01'),
      price: 1800,
      status: PolicyStatus.ACTIVE,
      agentId: '2',
      agentName: 'Jane Smith',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  constructor() { }

  getPolicies(): Observable<Policy[]> {
    return of(this.mockPolicies).pipe(delay(500));
  }

  getPolicyById(id: string): Observable<Policy | undefined> {
    return of(this.mockPolicies.find(policy => policy.id === id)).pipe(delay(300));
  }

  getPoliciesByClientId(clientId: string): Observable<Policy[]> {
    return of(this.mockPolicies.filter(policy => policy.clientId === clientId)).pipe(delay(500));
  }

  createPolicy(policy: Partial<Policy>): Observable<Policy> {
    const newPolicy: Policy = {
      id: Math.random().toString(36).substr(2, 9),
      policyNumber: `POL-${new Date().getFullYear()}-${String(this.mockPolicies.length + 1).padStart(3, '0')}`,
      clientId: policy.clientId || '',
      clientName: policy.clientName,
      carId: policy.carId || '',
      carInfo: policy.carInfo,
      type: policy.type || PolicyType.BASIC,
      startDate: policy.startDate || new Date(),
      endDate: policy.endDate || new Date(),
      price: policy.price || 0,
      status: policy.status || PolicyStatus.PENDING,
      agentId: policy.agentId,
      agentName: policy.agentName,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.mockPolicies.push(newPolicy);
    return of(newPolicy).pipe(delay(500));
  }

  updatePolicy(id: string, policy: Partial<Policy>): Observable<Policy> {
    const index = this.mockPolicies.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockPolicies[index] = { ...this.mockPolicies[index], ...policy, updatedAt: new Date() };
      return of(this.mockPolicies[index]).pipe(delay(500));
    }
    throw new Error('Policy not found');
  }

  deletePolicy(id: string): Observable<boolean> {
    const index = this.mockPolicies.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockPolicies.splice(index, 1);
      return of(true).pipe(delay(500));
    }
    return of(false).pipe(delay(500));
  }
}
