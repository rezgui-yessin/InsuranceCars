export enum UserRole {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
  AGENT = 'AGENT'
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: UserRole;
  address?: string;
  drivingLicense?: string;
  agencyName?: string;
  token?: string;
}
