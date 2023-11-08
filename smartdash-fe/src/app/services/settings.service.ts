import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SettingsResponse } from '../models/response.model';
const url = environment.api;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private settings$ = new BehaviorSubject<SettingsResponse | null>(null);

  constructor(private http: HttpClient) { }

  getApiSettings(userID:string): Observable<SettingsResponse> {
    return this.http.get<SettingsResponse>(`${url}/api/settings?userID=${userID}`, httpOptions).pipe(
      tap(res => {
        this.settings$.next(res);
      })
    );
  }

  updateSettings(id:string,settings:any): Observable<SettingsResponse>  {
    return this.http.put<SettingsResponse>(`${url}/api/settings/${id}`,settings, httpOptions).pipe(
      tap(res => {
        //this.settings$.next(res);
      })
    );
  }

  /* setSettings(settings:any): void {
    this.settings$.next(settings);
  } */

  getSettings(): Observable<SettingsResponse | null> {
    return this.settings$.asObservable();
  }

}
