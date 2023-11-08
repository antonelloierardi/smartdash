import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ModalsService } from 'src/app/services/modals.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormUserComponent } from '../shared/forms/form-user/form-user.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  @ViewChild('viewFormUser') viewFormUser!: FormUserComponent;
  user!: User;
  userID: string = sessionStorage.getItem('userID')!;
  userSubscription!: Subscription;
  delMessage = `Sicuro di voler Eliminare l'Utente?`;
  modMessage = `Sicuro di voler Modificare l'Utente?`;
  formValid =  false;

  constructor(private authService: AuthService, private sharedService: SharedService, private modalService: ModalsService) { }

  ngOnInit(): void {
    this.sharedService.setRoute('/profile');
    this.userSubscription = this.authService.getUser().subscribe({
      next: res => {
        if (res) {
          this.user = res;
          console.log('ProfileComponent', this.user);
        }
      },
      error: err => console.log('ERRORE', err)
    })
    //this.getUser();
  }

  getUser() {
    this.authService.findUser(this.userID).subscribe({
      next: res => {
        if (res) {
          this.user = res;
          console.log('UserComponent', this.user);
        }
      },
      error: err => console.log('ERRORE', err)
    })
  }

  updateUser(event: any) {
    console.log('update form', event.form);
    this.authService.update(event.form).subscribe({
      next: res => {
        if (res) {
          console.log('UserComponent update', res);
          this.modalService.openModalMsg('Attenzione','resUpdate', 'Aggiornamento avvenuto con successo!', 'alert-success')
        }
      },
      error: err => console.log('ERRORE', err)
    })
  }

  openModalMsg(action: string, msg: string, type: string) {
    this.modalService.openModalMsg('Attenzione', action, msg, type).result.then(res => {
      console.log('UserComponent modal', res)
      if (res === 'confirm-mod') {
        this.viewFormUser.sendEventFormUser('update user')
      }
    })
  }

  getFormValidity() {
    this.formValid = true;
  }

  ngOnDestroy(): void {
   this.userSubscription.unsubscribe();
  }
}
