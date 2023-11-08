import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Log } from '../models/log.model';
import { LogResponse } from '../models/response.model';
const url = `${environment.api}/api/logs`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private http: HttpClient) { }

  getAll(userId: string | null): Observable<LogResponse> {
    return this.http.get<LogResponse>(`${url}?userId=${userId}`, httpOptions);
  }

  getAllAdmin(): Observable<LogResponse> {
    return this.http.get<LogResponse>(`${url}`, httpOptions);
  }

  create(userId: any): Observable<Log> {
    let logObj = {
      userId: userId,
      date: new Date(),
      description:'Access'
    }
    return this.http.post<Log>(url, logObj, httpOptions);
  }
}
