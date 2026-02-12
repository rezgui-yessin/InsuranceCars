import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Car } from '../../shared/models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private mockCars: Car[] = [
    {
      id: '1',
      brand: 'Toyota',
      model: 'Camry',
      year: 2022,
      plateNumber: 'ABC-1234',
      vin: '1HGBH41JXMN109186',
      clientId: '1',
      clientName: 'John Doe',
      imageUrl: 'assets/images/car1.png',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      brand: 'Honda',
      model: 'Accord',
      year: 2023,
      plateNumber: 'XYZ-5678',
      vin: '2HGBH41JXMN109187',
      clientId: '1',
      clientName: 'John Doe',
      imageUrl: 'assets/images/car1.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  constructor() { }

  getCars(): Observable<Car[]> {
    return of(this.mockCars).pipe(delay(500));
  }

  getCarById(id: string): Observable<Car | undefined> {
    return of(this.mockCars.find(car => car.id === id)).pipe(delay(300));
  }

  getCarsByClientId(clientId: string): Observable<Car[]> {
    return of(this.mockCars.filter(car => car.clientId === clientId)).pipe(delay(500));
  }

  createCar(car: Partial<Car>): Observable<Car> {
    const newCar: Car = {
      id: Math.random().toString(36).substr(2, 9),
      brand: car.brand || '',
      model: car.model || '',
      year: car.year || new Date().getFullYear(),
      plateNumber: car.plateNumber || '',
      vin: car.vin || '',
      clientId: car.clientId || '',
      clientName: car.clientName,
      imageUrl: car.imageUrl,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.mockCars.push(newCar);
    return of(newCar).pipe(delay(500));
  }

  updateCar(id: string, car: Partial<Car>): Observable<Car> {
    const index = this.mockCars.findIndex(c => c.id === id);
    if (index !== -1) {
      this.mockCars[index] = { ...this.mockCars[index], ...car, updatedAt: new Date() };
      return of(this.mockCars[index]).pipe(delay(500));
    }
    throw new Error('Car not found');
  }

  deleteCar(id: string): Observable<boolean> {
    const index = this.mockCars.findIndex(c => c.id === id);
    if (index !== -1) {
      this.mockCars.splice(index, 1);
      return of(true).pipe(delay(500));
    }
    return of(false).pipe(delay(500));
  }
}
