import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenStorage {
  private tokenKey = 'authToken';

  logOut(): void {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('sidebar');
    sessionStorage.removeItem('info');
    sessionStorage.removeItem('feature');
    sessionStorage.removeItem('customClass');
    sessionStorage.removeItem('route');
    sessionStorage.removeItem('userID');
    sessionStorage.removeItem('companyID');
    sessionStorage.clear();
  }

  saveToken(token?: string): void {
    if (!token) return;
    sessionStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }
}
