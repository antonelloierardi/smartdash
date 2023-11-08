import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.authService.getUser().pipe(
      map(user => !!user?.isAdmin)
      );
  }
}
