import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from '../models/company.model';
import { CompaniesResponse } from '../models/response.model';

const url = environment.api;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<any> {
    return this.http.get<any>(`${url}/api/companies`, httpOptions);
  }

  getCompany(id: string): Observable<Company> {
    return this.http.get<Company>(`${url}/api/companies/${id}`, httpOptions);
  }

  updateComapny(id: string, company:Company): Observable<CompaniesResponse> {
    let formData = this.setCompanyForm(company);
   // formData.append('_id', company._id);
    return this.http.put<CompaniesResponse>(`${url}/api/companies/${id}`,company);
  }

  setFormDataCompany(company: Company | any) {
    let formData: any = new FormData();
    Object.keys(company).forEach(el => {
      if(el !== 'legalsite' && el !== 'operatingOffices' && el !== 'details') {
        formData.append(el, company[el]);
      } else formData.append(el, JSON.stringify(company[el]));
    })
    return formData;
  }

  setCompanyForm(company: Company) {
    let formData = new FormData();
    formData.append('logo', company.logo);
    formData.append('iban', company.iban),
    formData.append('nameCompany', company.nameCompany);
    formData.append('legalSite', JSON.stringify(company.legalSite));
    formData.append('details', JSON.stringify(company.details));
    formData.append('operatingOffices', JSON.stringify(company.operatingOffices));
    formData.append('vatNumber', company.vatNumber.toString());
    formData.append('taxCode', company.taxCode);
    formData.append('webSite', company.webSite);
    formData.append('rea', company.rea);
    formData.append('pec', company.pec);
    formData.append('createdAt', company.createdAt);
    return formData;
  }

}
