import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { FileService } from 'src/app/services/file.service';
import { ModalsService } from 'src/app/services/modals.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  companyID = sessionStorage.getItem('companyID')!;
  page = 1;
  pageSize = 15;
  msgNewUser = 'Utente creato correttamente!';
  msgDelUser = `Sei sicuro di voler eliminare l'Utente con id:`;

  constructor(private authService: AuthService, private router: Router, private modalService: ModalsService, private fileService: FileService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.authService.getUsers(this.companyID).subscribe({
      next: res => {
        if (res) {
          this.users = res.data;
          //console.log('UsersComponent', this.users);
        }
      },
      error: err => console.log('ERRORE', err)
    })

  }

  createUser() {
    this.modalService.openModalNew('Nuovo Utente', 'new-user', 'user').result.then(res => {
      switch (res.action) {
        case 'confirm':
          this.newUser(res.form);
          break;
        case 'close':
          console.log('Nuovo User:', res);
          break;
        default:
          break;
      }
    })
  }

  deleteUser(id: string, photo: string) {
    this.modalService.openModalMsg('Attenzione', 'delete', this.msgDelUser + ` ${id} !`, 'alert-danger').result.then(res => {
      if (res === 'confirm-del') {
        this.authService.deleteUser(id).subscribe({
          next: res => {
            if (res) {
              this.modalService.openModalMsg('Attenzione', 'resDelete', `Utente con id: ${id} eliminato correttamente!`, 'alert-success');
              this.getUsers();
            }
          },
          error: err => {
            console.log('ERRORE: ', err);
          }
        })
        //this.fileService.deleteFile('lisa.png').subscribe(res => console.log(res))
      } else console.log('Elimina User:', res);
    })

  }

  newUser(res: any) {
    this.authService.newUser(res).subscribe({
      next: res => {
        console.log('Nuovo Utente aggiunto:', res);
        this.modalService.openModalMsg('Attenzione', 'resUpdate', this.msgNewUser, 'alert-success');
        this.getUsers();
      },
      error: err => {
        console.log('ERRORE: ', err);
      }
    })
  }

  getUserDetail(user: User) {
    sessionStorage.setItem('userID', user._id);
    this.router.navigate(['/user']);
  }

  updatePage(event: number) {
    this.page = event;
  }

}
