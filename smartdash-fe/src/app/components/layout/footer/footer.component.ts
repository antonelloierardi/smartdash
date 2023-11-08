import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServiceMenuData } from 'src/app/models/menu';
import { ServiceMenu } from 'src/app/models/menu.model';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {

  footerMenu: ServiceMenu[];
  settings!: any;
  settingsSubscription!: Subscription;

  constructor(private settingsService: SettingsService) {
    this.footerMenu = ServiceMenuData;
  }

  ngOnInit(): void {
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

  ngOnDestroy(): void {
    this.settingsSubscription.unsubscribe();
  }

}
