import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageModalComponent } from '../components/shared/message-modal/message-modal.component';
import { ActionsModalComponent } from '../components/shared/forms/form-company/actions-modal/actions-modal.component';
import { ModalNewComponent} from '../components/shared/forms/modal-new/modal-new.component';
import { OpOffice } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  constructor(private modalService: NgbModal) { }

  openModalMsg(title: string, action: string, msg: string, alertType: string) {
    const modalRef = this.modalService.open(MessageModalComponent, { backdrop: 'static' });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = msg;
    modalRef.componentInstance.alertType = alertType;
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.content = null;
    return modalRef
  }

  openModalOpSite(title: string, action: string, site?: OpOffice, indexSite?: number) {
    const modalRef = this.modalService.open(ActionsModalComponent, { backdrop: 'static' });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.site = site;
    modalRef.componentInstance.indexSite = indexSite;
    modalRef.componentInstance.action = action;
    return modalRef
  }

  openModalUser(title: string, action: string) {
    const modalRef = this.modalService.open(ModalNewComponent, { backdrop: 'static' });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.action = action;
    return modalRef
  }

  openModalNew(title: string, action: string,type:string) {
    const modalRef = this.modalService.open(ModalNewComponent, { backdrop: 'static' });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.type = type;
    return modalRef
  }
}
