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
  private clientUrl = `${environment.apiUrl}/client/cars`;

  constructor(private http: HttpClient) { }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl);
  }
  
  getMyCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.clientUrl);
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
