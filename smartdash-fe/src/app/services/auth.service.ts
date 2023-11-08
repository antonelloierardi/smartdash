import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, BehaviorSubject, firstValueFrom, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { TokenStorage } from './token.storage';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { AuthResponse, UserResponse, UsersResponse } from 'src/app/models/response.model';
import { UntypedFormControl, ValidationErrors } from '@angular/forms';
const url = environment.api;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class AuthService {

  private user$ = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private tokenStorage: TokenStorage) { }

  logIn(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${url}/api/auth/login`, { email, password }, httpOptions).pipe(
      tap(res => {
        this.setUser(res.user);
        this.tokenStorage.saveToken(res.token);
      })
    );
  }

  register(user: User): Observable<AuthResponse> {
    let formData = this.setUserForm(user);
    return this.http.post<AuthResponse>(`${url}/api/auth/register`, formData);
  }

  newUser(user: User): Observable<AuthResponse> {
    let formData = this.setUserForm(user);
    return this.http.post<AuthResponse>(`${url}/api/auth/register`, formData);
  }

  update(user: User): Observable<UserResponse> {
    let formData = this.setUserForm(user);
    formData.append('_id', user._id);
    return this.http.put<UserResponse>(`${url}/api/users/${user._id}`, formData);
  }

  deleteUser(id: string): Observable<UserResponse> {
    return this.http.delete<UserResponse>(`${url}/api/users/${id}`, httpOptions);
  }

  findUser(id: string): Observable<User> {
    return this.http.get<User>(`${url}/api/users/${id}`, httpOptions);
  }

  setUser(user: User | null): void {
    if (user && user.role === 'admin') {
      user.isAdmin = true;
    }
    this.user$.next(user);
  }

  getUser(): Observable<User | null> {
    return this.user$.asObservable();
  }

  getUsers(id: string): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(`${url}/api/users?companyID=${id}`, httpOptions);
  }

  logOut(): void {
    this.tokenStorage.logOut();
  }

  getAuthorizationHeaders() {
    const token: string | null = this.tokenStorage.getToken() || '';
    return { Authorization: `Bearer ${token}` };
  }

  /**
   * Let's try to get user's information if he was logged in previously,
   * thus we can ensure that the user is able to access the `/` (home) page.
   */
  checkTheUserOnTheFirstLoad(): Promise<AuthResponse | null> {
    return firstValueFrom(this.me());
  }


  me(): Observable<AuthResponse | null> {
    return this.http.get<AuthResponse>(`${url}/api/auth/me`, httpOptions).pipe(
      tap(res => {
        this.setUser(res.user)
      }),
      catchError(() => of(null))
    );
  }

  passwordMatchValidator(control: UntypedFormControl): ValidationErrors | null {
    const password = control.root.get('password');
    return password && control.value !== password.value ? { passwordMatch: true } : null;
  }

  setUserForm(user: User) {
    let formData: any = new FormData();
    formData.append('company', user.company);
    formData.append('companyID', user.companyID);
    formData.append('photo', user.photo);
    formData.append('name', user.name);
    formData.append('surname', user.surname);
    formData.append('position', user.position);
    formData.append('site', user.site);
    formData.append('address', user.address);
    formData.append('cap', user.cap);
    formData.append('city', user.city);
    formData.append('province', user.province);
    formData.append('email', user.email);
    formData.append('mobile', user.mobile);
    formData.append('tel', user.tel);
    formData.append('role', user.role);
    formData.append('status', user.status);
    formData.append('password', user.password);
    formData.append('repeatPassword', user.repeatPassword);
    return formData;
  }
}
