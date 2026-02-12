export enum ClaimStatus {
  PENDING = 'PENDING',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PAID = 'PAID'
}

export interface Claim {
  id: string;
  claimNumber: string;
  policyId: string;
  policyNumber?: string;
  clientId: string;
  clientName?: string;
  date: Date;
  description: string;
  status: ClaimStatus;
  amount?: number;
  documents: string[];
  agentId?: string;
  agentName?: string;
  createdAt: Date;
  updatedAt: Date;
}
