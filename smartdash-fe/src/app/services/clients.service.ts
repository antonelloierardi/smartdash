import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../models/client.model';
import { ClientResponse } from '../models/response.model';

const url = `${environment.api}/api/clients`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private client$ = new BehaviorSubject<Client | null>(null);

  constructor(private http: HttpClient) { }

  getClients(): Observable<ClientResponse> {
    return this.http.get<ClientResponse>(`${url}`, httpOptions);
  }

  findClient(id: any): Observable<Client> {
    return this.http.get<Client>(`${url}/${id}`, httpOptions).pipe(
      tap(res => {
        this.client$.next(res);
      })
    );
  }

  createClient(data: Client, photo:File): Observable<Client> {
    let formData = this.setClientForm(data,photo);
    return this.http.post<Client>(url, formData);
  }

  updateClient(id: any, data: Client): Observable<Client> {
    let formData = this.setClientiForm(data);
    return this.http.put<Client>(`${url}/${id}`, formData);
  }

  deleteClient(id: any): Observable<ClientResponse> {
    return this.http.delete<ClientResponse>(`${url}/${id}`, httpOptions);
  }

  deleteAllClient(clientId: string | null): Observable<Client> {
    return this.http.delete<Client>(`${url}?clientId=${clientId}`, httpOptions);
  }

  setClient(client: Client | null): void {
    this.client$.next(client);
  }

  getClient(): Observable<Client | null> {
    return this.client$.asObservable();
  }

  setClientiForm(client: Client) {
    let formData: any = new FormData();
    formData.append('photo', client.photo);
    formData.append('name', client.name ? client.name : '');
    formData.append('surname', client.surname ? client.surname : '');
    formData.append('address', client.address ? client.address : '');
    formData.append('cap', client.cap ? client.cap : '');
    formData.append('city', client.city ? client.city : '');
    formData.append('province', client.province ? client.province : '');
    formData.append('tel', client.tel ? client.tel : '');
    formData.append('type', client.type ? client.type : '');
    formData.append('email', client.email ? client.email : '');
    formData.append('mobile', client.mobile ? client.mobile : '');
    formData.append('nameCompany', client.nameCompany ? client.nameCompany : '');
    formData.append('legalSite', client.legalSite ? JSON.stringify(client.legalSite) : JSON.stringify({}));
    formData.append('operatingOffices', JSON.stringify(client.operatingOffices));
    formData.append('vatNumber', client.vatNumber ? client.vatNumber : '');
    formData.append('taxCode', client.taxCode ? client.taxCode : '');
    formData.append('webSite', client.webSite ? client.webSite : '');
    formData.append('rea', client.rea ? client.rea : '');
    formData.append('pec', client.pec ? client.pec : '');
    return formData;
  }

  setClientForm(client: Client,photo:File) {
    let formData: any = new FormData();
    formData.append('photo', photo);
    formData.append('data', JSON.stringify(client));
    return formData;
  }

}

