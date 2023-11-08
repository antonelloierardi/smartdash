import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageModalComponent } from '../components/shared/message-modal/message-modal.component';

@Injectable()
export class CatchErrorInterceptor implements HttpInterceptor {
  constructor(private modalService: NgbModal) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(this.showSnackBar));
  }

  private showSnackBar = (response: HttpErrorResponse): Observable<never> => {
    const text: string | undefined = response.error?.message ?? response.error.statusText;
    if (text) {
      this.openModal(text, 'alert-danger')
    }
    return throwError(() => response);
  };

  openModal(msg: string, alertType: string) {
    const modalRef = this.modalService.open(MessageModalComponent, { backdrop: 'static' });
    modalRef.componentInstance.title = 'Attenzione';
    modalRef.componentInstance.message = msg;
    modalRef.componentInstance.alertType = alertType;
    modalRef.componentInstance.content = null;
  }
}
