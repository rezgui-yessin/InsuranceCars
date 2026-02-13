import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Car } from '../../shared/models/car.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = `${environment.apiUrl}/cars`;
  private clientUrl = `${environment.apiUrl}/cars`; // Corrected to point to existing endpoint

  constructor(private http: HttpClient) { }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl);
  }
  
  getMyCars(): Observable<Car[]> {
    // In a real app, backend might have a specific endpoint 'my-cars' or filter by token user
    // For now, if /api/cars returns all cars, we might need to filter on frontend or assume backend handles it via security context
    return this.http.get<Car[]>(this.apiUrl);
  }

  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/${id}`);
  }

  getCarsByClientId(clientId: number): Observable<Car[]> {
     return this.http.get<Car[]>(this.apiUrl); // Placeholder until backend supports filter
  }

  createCar(car: Car, imageFile?: File): Observable<Car> {
    const formData = new FormData();
    formData.append('car', JSON.stringify(car));
    if (imageFile) {
      formData.append('image', imageFile);
    }
    return this.http.post<Car>(this.clientUrl, formData);
  }
  
  createCarAdmin(car: Car, imageFile?: File): Observable<Car> {
      const formData = new FormData();
      formData.append('car', JSON.stringify(car));
      if (imageFile) {
        formData.append('image', imageFile);
      }
      return this.http.post<Car>(this.apiUrl, formData);
  }

  updateCar(id: number, car: Car): Observable<Car> {
    return this.http.put<Car>(`${this.apiUrl}/${id}`, car);
  }

  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
