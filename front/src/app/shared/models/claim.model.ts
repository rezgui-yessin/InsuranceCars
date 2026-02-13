export enum ClaimStatus {
  PENDING = 'PENDING',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PAID = 'PAID'
}

export interface Claim {
  id: number;
  claimNumber: string;
  policyId: number;
  policyNumber: string;
  clientId: number;
  clientName?: string;
  date: Date;
  description: string;
  status: ClaimStatus;
  amount: number;
  documents?: string[];
  agentId?: number;
  agentName?: string;
  createdAt: Date;
  updatedAt: Date;
}
