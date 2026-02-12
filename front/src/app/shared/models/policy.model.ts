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
  id: string;
  policyNumber: string;
  clientId: string;
  clientName?: string;
  carId: string;
  carInfo?: string;
  type: PolicyType;
  startDate: Date;
  endDate: Date;
  price: number;
  status: PolicyStatus;
  agentId?: string;
  agentName?: string;
  createdAt: Date;
  updatedAt: Date;
}
