import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Agenda } from '../models/agenda.model';
import { environment } from 'src/environments/environment';
import { AgendaResponse } from '../models/response.model';
const url = `${environment.api}/api/agenda`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  constructor(private http: HttpClient) { }

  getAll(userId: string | null): Observable<AgendaResponse> {
    return this.http.get<AgendaResponse>(`${url}?userId=${userId}`, httpOptions);
  }

  get(id: any): Observable<Agenda> {
    return this.http.get<Agenda>(`${url}/${id}`, httpOptions);
  }

  create(data: Agenda): Observable<Agenda> {
    return this.http.post<Agenda>(url, data, httpOptions);
  }

  update(id: any, data: any): Observable<Agenda> {
    return this.http.put<Agenda>(`${url}/${id}`, data, httpOptions);
  }

  delete(id: any): Observable<Agenda> {
    return this.http.delete<Agenda>(`${url}/${id}`, httpOptions);
  }

  deleteAll(userId: string | null): Observable<Agenda> {
    return this.http.delete<Agenda>(`${url}?userId=${userId}`, httpOptions);
  }

}
