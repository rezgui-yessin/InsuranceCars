export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  BANK_TRANSFER = 'BANK_TRANSFER',
  PAYPAL = 'PAYPAL'
}

export interface Payment {
  id: string;
  invoiceNumber: string;
  policyId: string;
  policyNumber?: string;
  clientId: string;
  clientName?: string;
  amount: number;
  status: PaymentStatus;
  method: PaymentMethod;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}
