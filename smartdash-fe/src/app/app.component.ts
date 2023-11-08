import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { User } from './models/user.model';
import { SettingsService } from './services/settings.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  user!: User;
  isLogged = false;
  userSubscription!: Subscription;
  userID = sessionStorage.getItem('userID')!;

  constructor(private authService: AuthService, private router: Router, private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.authService.me().subscribe({
      next: res => {
        if (res) {
          let route: string = sessionStorage.getItem('route')!;
          this.setLogIn();
          this.router.navigateByUrl(route);
          console.log('AppComponent me(): ', res);
        }
      },
      error: err => {
        console.log('ERROR: ', err);
      }
    });

    this.getUser();
    ;
  }

  getUser() {
    this.userSubscription = this.authService.getUser().subscribe({
      next: res => {
        if (res) {
          this.user = res;
          this.getSettings(this.user._id)
        }
      },
      error: err => console.log('ERRORE', err)
    })
  }

  getSettings(id: string) {
    this.settingsService.getApiSettings(id).subscribe({
      next: res => {
        //console.log('AppComponent Settings: ',res.data[0] )
      },
      error: err => console.log('ERRORE', err)
    })
  }

  setLogIn() {
    this.isLogged = true;
  }

  setLogOut() {
    this.isLogged = false;
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
