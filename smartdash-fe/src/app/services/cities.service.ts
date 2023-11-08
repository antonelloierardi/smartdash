import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CitiesResponse } from '../models/response.model';
import { City } from '../models/city.model';
const url = environment.api;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private cities$ = new BehaviorSubject<CitiesResponse | null>(null);
  public cities:City[] = [];

  constructor(private http: HttpClient) { }

  getApiCities(city: string): Observable<CitiesResponse> {
    return this.http.get<CitiesResponse>(`${url}/api/cities?city=${city}`, httpOptions).pipe(
      tap(res => {
        this.cities$.next(res);
      })
    );
  }

  setCities(cities:City[]) {
    this.cities = cities;
  }

  setCities$(cities: CitiesResponse | null): void {
    this.cities$.next(cities);
  }

  getCities$(): Observable<CitiesResponse | null> {
    return this.cities$.asObservable();
  }

}
