import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, combineLatest, forkJoin } from 'rxjs';
import { Sidebar } from 'src/app/models/sidebar.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  sidebar: Sidebar[] = [];
  user!: User;
  settings!: any;
  userSubscription: Subscription = new Subscription;
  settingsSubscription!: Subscription;

  constructor(private authService: AuthService, private menuService: MenuService, private settingsService: SettingsService) {

  }
  ngOnInit(): void {
    this.userSubscription = this.authService.getUser().subscribe({
      next: res => {
        if (res) {
          this.user = res;
          //console.log('SidebarComponent', this.user);
        }
      },
      error: err => console.log('ERRORE', err)
    })
    this.getSidebar();
    //this.getSettings();
  }

  getSidebar() {
    this.menuService.getApiSidebar(this.user!.companyID).subscribe({
      next: res => {
        if (res) {
          if (this.user?.isAdmin) {
            this.sidebar = res.data[0].sidebar.filter(el => el.link?.name != 'Profilo');
          } else {
            this.sidebar = res.data[0].sidebar.filter(el => el.link?.name != 'Admin')
          }
          //console.log('sidebar',this.sidebar);
          if(this.sidebar) this.getSettings();
        }
      },
      error: err => console.log('ERRORE', err)
    })
  }

  getSettings() {
    this.settingsSubscription = this.settingsService.getSettings().subscribe({
      next: res => {
        this.settings = res?.data[0]!;
        //console.log('settings',this.settings);
        //if(this.settings)this.setSidebar();
      },
      error: err => console.log('ERRORE', err)
    })
  }

  setSidebar() {
    let sideBarCopy = [];
    this.sidebar.forEach(el => {

      Object.keys(this.settings.settingsSidebar).forEach(e => {
        if (el.title && (el.title !== 'Dashboard' && el.title !== 'Amministrazione')) {
          if (e === el.title.toLowerCase()){
            if (this.settings.settingsSidebar[el.title.toLowerCase()])
            console.log(el.title, this.settings.settingsSidebar[el.title.toLowerCase()]);}

        }
        if (e === el.link?.name?.toLowerCase()) {
          if (this.settings.settingsSidebar[el.link?.name?.toLowerCase()])
          console.log(e, this.settings.settingsSidebar[el.link?.name?.toLowerCase()]);
        }
        el.subLink?.links?.forEach(elem => {
          if (e === elem.name?.toLowerCase()) {
            if (this.settings.settingsSidebar[elem.name?.toLowerCase()])
            console.log(e, this.settings.settingsSidebar[elem.name?.toLowerCase()])
          }
        })
      })
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.settingsSubscription.unsubscribe();
  }
}
