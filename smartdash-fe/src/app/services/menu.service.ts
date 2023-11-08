import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SidebarResponse } from '../models/response.model';
import { Sidebar, SidebarMenu } from '../models/sidebar.model';
const url = environment.api;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private sidebar$ = new BehaviorSubject<SidebarResponse | null>(null);

  constructor(private http: HttpClient) { }

  getApiSidebar(companyID: string): Observable<SidebarResponse> {
    return this.http.get<SidebarResponse>(`${url}/api/sidebars?companyID=${companyID}`, httpOptions).pipe(
      tap(res => {
        this.sidebar$.next(res);
      })
    );
  }

  getSidebarByCompanyID(companyID: string): Observable<SidebarMenu> {
    return this.http.get<SidebarMenu>(`${url}/api/sidebars/${companyID}`, httpOptions).pipe(
      tap(res => {
      })
    );
  }

  setSidebar(sidebar: SidebarResponse | null): void {
    this.sidebar$.next(sidebar);
  }

  getSidebar(): Observable<SidebarResponse | null> {
    return this.sidebar$.asObservable();
  }
}
