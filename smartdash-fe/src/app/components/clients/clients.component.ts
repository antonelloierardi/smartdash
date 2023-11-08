import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { ClientsService } from 'src/app/services/clients.service';
import { ModalsService } from 'src/app/services/modals.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  clients: Client[] = [];

  constructor(private sharedService: SharedService, private clientsService: ClientsService, private modalService: ModalsService, private router: Router) { }

  ngOnInit(): void {
    this.sharedService.setRoute('/clients')
  }

  getClients() {
    this.clientsService.getClients()
  }

  createClient() {
    this.router.navigate(['/client']);
  }

  getClientDetail() {
    this.router.navigate(['/client']);
  }

  deleteClient() {}
}
