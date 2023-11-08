import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { SharedService } from 'src/app/services/shared.service';
import { FormClientComponent } from '../../shared/forms/form-client/form-client.component';
import { ClientsService } from 'src/app/services/clients.service';
import { ModalsService } from 'src/app/services/modals.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  @ViewChild('formClient') formClient!: FormClientComponent;
  client!: Client;
  isNewClient = true;

  constructor(private sharedService: SharedService, private clientsService:ClientsService, private modalService: ModalsService) {}

  ngOnInit(): void {
    this.sharedService.setRoute('/client')
  }

  getClient() {
    this.clientsService.findClient('').subscribe({
      next: res => {},
      error: err => {}
    })
  }

  createClient(obj:Client,photo:File) {
    this.clientsService.createClient(obj,photo).subscribe({
      next: res => {
       console.log(res)
      },
      error: err => {
        console.log('ERRORE: ', err)
      }
    })
  }

  confirm() {
    this.formClient.sendEventFormClient()
  }

  save(event:any) {
    this.modalService.openModalMsg('Attenzione','new','Sicuro di voler pèrocedere?','alert-danger').result.then(res => {
      if(res === 'confirm-new'){
      console.log('SAVE', res,event)
      this.createClient(event.data,event.photo);
    } else console.log('SAVE', res)
    })

  }

}
