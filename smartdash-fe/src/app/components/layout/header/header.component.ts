import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Language } from 'src/app/models/language.model';
import { LanguagesData } from 'src/app/models/languages';
import { MegaMenuData } from 'src/app/models/menu';
import { MegaMenu } from 'src/app/models/menu.model';
import { NotificationsData } from 'src/app/models/notifications';
import { Notification } from 'src/app/models/notification.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { FormSearch } from 'src/app/models/forms';
import { SettingsService } from 'src/app/services/settings.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() eventLogOut = new EventEmitter();
  user: User | null = null;
  formSearch = FormSearch;
  settings!: any;
  userSubscription!: Subscription;
  settingsSubscription!: Subscription;

  megaMenu: MegaMenu[];
  languages:Language[];
  notifications: Notification[];

  constructor(private authService: AuthService,private settingsService: SettingsService) {
    this.megaMenu = MegaMenuData;
    this.languages = LanguagesData;
    this.notifications = NotificationsData;
  }

  ngOnInit(): void {
    this.setCollapse();
    this.userSubscription = this.authService.getUser().subscribe({
      next: res => {
        if (res) {
          this.user = res;
          //console.log('HeaderComponent', this.user);
        }
      },
      error: err => console.log('ERRORE', err)
    });
    this.getSettings();
  }

  getSettings() {
    this.settingsSubscription = this.settingsService.getSettings().subscribe({
      next: res => {
       this.settings = res?.data[0];
      },
      error: err => console.log('ERRORE', err)
    })
  }

  setCollapse() {
    const e = document.getElementById('sidebar')!;
    document.getElementById('sidebar-toggle')!.addEventListener("click", () => {
      e.classList.toggle("collapsed"),
        e.addEventListener("transitionend", () => {
          window.dispatchEvent(new Event("resize"));
        });
    });
  }

  logOut() {
    this.authService.logOut();
    this.eventLogOut.emit();
  }

  ngOnDestroy(): void {
    this.settingsSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
