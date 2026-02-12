export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  plateNumber: string;
  vin: string;
  clientId: string;
  clientName?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
