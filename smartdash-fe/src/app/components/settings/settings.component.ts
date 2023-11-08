import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Company } from 'src/app/models/company.model';
import { CompaniesService } from 'src/app/services/companies.service';
import { SettingsService } from 'src/app/services/settings.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormCompanyComponent } from '../shared/forms/form-company/form-company.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalsService } from 'src/app/services/modals.service';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { FormSettings } from 'src/app/models/forms';
import { Settings } from 'src/app/models/settings.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  @ViewChild('viewFormCompany') viewFormCompany!: FormCompanyComponent;
  user!: User ;
  userSubscription!: Subscription;
  settingsSubscription!: Subscription;
  companyID = sessionStorage.getItem('companyID')!;
  company!: Company;
  settings!: any;
  formSettings = FormSettings;
  msgModSettings ='Sei sicuro di voler modificare le impostazioni?';

  constructor(private sharedService: SharedService, private companiesService: CompaniesService,
    private settingsService: SettingsService, private modalService: ModalsService,private authService: AuthService) { }

  ngOnInit(): void {
    this.getUser();
    this.sharedService.setRoute('/settings');
    this.getCompany();
    this.getSettings();
    this.disableServiceMenu();
  }

  getUser() {
   this.userSubscription = this.authService.getUser().subscribe({
      next: res => {
        if (res) {
          this.user = res;
          //console.log('AdministratorComponent', this.settings);
        }
      },
      error: err => console.log('ERRORE', err)
    })
  }

  getSettings() {
    this.settingsSubscription = this.settingsService.getSettings().subscribe({
      next: res => {
       this.settings = res?.data[0];
        //console.log('SettingsComponent: ',this.settings)
        if(this.settings) this.setFormSettings();
      },
      error: err => console.log('ERRORE', err)
    })
  }

  updateSettings() {
    this.modalService.openModalMsg('Attenzione','update', this.msgModSettings, 'alert-danger').result.then(res => {
      //console.log('res',res)
      if(res === 'confirm-mod') {
       // console.log('form',this.formSettings.value)
        //console.log('obj',this.settings)
        this.settingsService.updateSettings(this.settings._id!,this.formSettings.value).subscribe({
          next: res => {
            if (res){
              //console.log('updateSettings: ', res);
              this.modalService.openModalMsg('Attenzione','resUpdate', 'Aggiornamento avvenuto con successo!', 'alert-success').result.then(() =>{
                //this.getSettings();
                //this.setFormSettings();
                location.reload();
              });
            }
          },
          error: err => console.log('ERRORE', err)
        })
      }
    })
  }

  getCompany() {
    this.companiesService.getCompany(this.companyID).subscribe({
      next: res => {
        if (res) this.company = res;
        console.log('Company: ', this.company)
      },
      error: err => console.log('ERRORE', err)
    })
  }

  setObjCompany(res: any) {
    let obj = {
      _id: res._id,
      logo: res.logo,
      nameCompany: res.nameCompany,
      legalSite: JSON.parse(res.legalSite),
      operatingOffices: JSON.parse(res.operatingOffices),
      vatNumber: res.vatNumber,
      taxCode: res.taxCode,
      rea: res.rea,
      webSite: res.webSite,
      pec: res.pec,
      iban: res.iban,
      createdAt: res.createdAt,
      details: JSON.parse(res.details)
    }
    return obj
  }

  updateCompany(company: any) {
    let payload = company.form;
    payload.logo = company.logo ? company.logo :null;
    console.log('Update Company: ', payload)
    this.companiesService.updateComapny(this.companyID, payload).subscribe({
      next: res => {
        //console.log('Update Company: ', res)
        this.modalService.openModalMsg('Attenzione','resUpdate', res.message, 'alert-success');
        this.getCompany();
      },
      error: err => console.log('ERRORE', err)
    })
  }

  modCompany() {
    this.viewFormCompany.update();
  }

  setFormSettings() {
    Object.keys(this.formSettings.controls).forEach(el => {
      Object.keys(this.settings).forEach((elm) => {
        if (el === elm) {
          if (typeof this.settings[elm] !== 'object') {
            //console.log(el, this.settings[elm])
            this.formSettings.get(el)?.setValue(this.settings[elm])
          } else {
            //console.log(el, this.settings[elm]);
            Object.keys(this.settings[elm]).forEach(ele => {
              Object.keys(this.formSettings.get(el)!.value).forEach(ee => {
                if (ele === ee) {
                  //console.log(ee, this.settings[elm][0][ele])
                  this.formSettings.get(el)?.get(ee)?.setValue(this.settings[elm][ele])
                }
              })
            })
          }
        }
      })
    })
  }

  disableServiceMenu() {
    this.formSettings.get('settingsFooter')?.get('serviceMenu')?.valueChanges.subscribe(res => {
      //console.log('serviceMenu',res)
      if(!res) {
        this.formSettings.get('settingsFooter')?.get('privacy')?.setValue(false);
        this.formSettings.get('settingsFooter')?.get('support')?.setValue(false);
        this.formSettings.get('settingsFooter')?.get('helpCenter')?.setValue(false);
        this.formSettings.get('settingsFooter')?.get('terms')?.setValue(false);
      } else {
        this.formSettings.get('settingsFooter')?.get('privacy')?.setValue(true);
        this.formSettings.get('settingsFooter')?.get('support')?.setValue(true);
        this.formSettings.get('settingsFooter')?.get('helpCenter')?.setValue(true);
        this.formSettings.get('settingsFooter')?.get('terms')?.setValue(true);
      }
    })
  }

  ngOnDestroy(): void {
    this.settingsSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
