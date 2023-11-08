import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit, OnDestroy {

  user!: User;
  userSubscription!: Subscription;

  constructor(private authService: AuthService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.setRoute('/admin');
    this.getUser();
  }

  getUser() {
    this.userSubscription = this.authService.getUser().subscribe({
      next: res => {
        if (res) {
          this.user = res;
          //console.log('AdministratorComponent', this.user);
        }
      },
      error: err => console.log('ERRORE', err)
    })
  }

  ngOnDestroy(): void {
   this.userSubscription.unsubscribe();
  }
}
