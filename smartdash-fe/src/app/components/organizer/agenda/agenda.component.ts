import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Agenda } from 'src/app/models/agenda.model';
import { AgendaService } from 'src/app/services/agenda.service';
import { SharedService } from 'src/app/services/shared.service';
import { MessageModalComponent } from '../../shared/message-modal/message-modal.component';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {

  userId ='6482f8860fc13b8396af5956';
  agenda: Agenda[] = [];

  constructor(private sharedService: SharedService, private agendaService: AgendaService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.sharedService.setRoute('/agenda');
    this.getAll();
  }

  getAll() {
    this.agendaService.getAll(this.userId).subscribe({
      next: res => {
        this.agenda = res.data;
      },
      error: err => { console.log('ERRORE: ', err) }
    })
  }

  update(title: any, action: boolean,) {

  }
  setAction(title: string, action?: string, obj?: any) {
    const modalRef = this.modalService.open(MessageModalComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.obj = action !== 'save' ? obj : null;
    modalRef.componentInstance.formName = 'dataEntryForm';
    modalRef.componentInstance.component = 'dataEntry';
    modalRef.result.then(res => {
      console.log('After Close : ', res);
      /* switch (res.action) {
        case 'save':
          this.create(res);
          break;
        case 'delete':
          this.delete(res);
          break;
        case 'update':
          this.update(res);
          break;
        case 'deleteAll':
          this.deleteAll();
          break;
        default:
          break;
      } */
    })
  }
}
