export enum UserRole {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
  AGENT = 'AGENT'
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  role: UserRole;
  drivingLicense?: string;
  createdAt: Date;
  updatedAt: Date;
}
