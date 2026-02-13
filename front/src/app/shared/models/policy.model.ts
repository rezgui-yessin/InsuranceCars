export enum PolicyType {
  BASIC = 'BASIC',
  PREMIUM = 'PREMIUM',
  FULL_COVERAGE = 'FULL_COVERAGE'
}

export enum PolicyStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED'
}

export interface Policy {
  id: number;
  policyNumber: string;
  clientId: number;
  clientName?: string;
  carId: number;
  carInfo?: string;
  type: PolicyType;
  startDate: Date | string;
  endDate: Date | string;
  price: number;
  status: PolicyStatus;
  agentId?: number;
  agentName?: string;
}
