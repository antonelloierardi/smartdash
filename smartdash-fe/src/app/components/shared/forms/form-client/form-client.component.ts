import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormClient, FormOperatingOffices } from 'src/app/models/forms';
import { City } from 'src/app/models/city.model';
import { CitiesService } from 'src/app/services/cities.service';
import { ModalsService } from 'src/app/services/modals.service';
import { Client, OpOffice } from 'src/app/models/client.model';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.scss']
})
export class FormClientComponent implements OnInit, OnDestroy {

  @Input() client: any;
  @Input() isNewClient = false;
  @Output() eventFormClient = new EventEmitter();
  formClient = FormClient;
  formOperatingOffices = FormOperatingOffices;
  operatingOffices:OpOffice[] = [];
  cities: City[] = [];
  delMessage = 'Sicuro di voler eliminare la sede operativa?';
  modMessage = 'Sicuro di voler modificare i dati aziendali?';
  preview!: string;
  isModImg = false;
  p:OpOffice[] = [];

  status = [
    { label: 'Attivo', value: 'active' },
    { label: 'Non Attivo', value: 'inactive' },
    { label: 'Cancellato', value: 'deleted' }
  ];

  types = [
    { label: 'Azienda', value: 'company' },
    { label: 'Privato', value: 'personal' }
  ];

  constructor(private citiesSevice: CitiesService, private modalService: ModalsService) { }

  ngOnInit(): void {
    this.setForm();
    this.getCities();
    this.setCity();
  }

  setForm() {
    if (this.client) {
      this.setOpOffice();
      Object.keys(this.formClient.controls).forEach(ctrl => {
        Object.keys(this.client!).forEach(pr => {
          if (ctrl === pr) {
            if (ctrl === 'details' || ctrl === 'operatingOffices') {
              Object.keys(this.formClient.controls.details.controls).forEach(detCtrl => {
                if (ctrl === 'details') {
                  Object.keys(this.client!.details).forEach(detPr => {
                    if (detCtrl === detPr) {
                      this.formClient.get(ctrl)!.get(detCtrl)!.setValue(this.client!.details[detPr])
                    }
                  })
                }
              })
            } else this.formClient.get(ctrl)!.setValue(this.client[pr]);
          }
        })
      });
    }
  }

  setOpOffice() {
    this.formClient.controls.operatingOffices.clear();
    this.operatingOffices.forEach((el: any) => {
      let operatingOfficesForm = new FormGroup({
        opAccountable: new FormControl({ value: el.opAccountable, disabled: false }),
        opAddress: new FormControl({ value: el.opAddress, disabled: false }),
        opCap: new FormControl({ value: el.opCap, disabled: false }),
        opCity: new FormControl({ value: el.opCity, disabled: false }),
        opProvince: new FormControl({ value: el.opProvince, disabled: false }),
        opTel: new FormControl({ value: el.opTel, disabled: false }),
        opEmail: new FormControl({ value: el.opEmail, disabled: false }),
        opMobile: new FormControl({ value: el.opMobile, disabled: false }),
        opEployees: new FormControl({ value: el.opEployees, disabled: false }),
      })
      this.formClient.controls.operatingOffices.push(operatingOfficesForm);
    })

  }

  update() {
    this.modalService.openModalMsg('Attenzione', 'update', this.modMessage, 'alert-warning').result.then(res => {
      console.log('MSG:', res);
      switch (res) {
        case 'confirm-mod':
          let obj = {
            form:this.formClient.value,
            logo: this.formClient.get('photo')!.value
          }
          this.eventFormClient.emit(obj);
          console.log('formClient', obj);
          break;
        case 'close':
          break;
        default:
          break;
      }
    })

  }

  delOpSite(i: number) {
    this.modalService.openModalMsg('Attenzione', 'delete', this.delMessage, 'alert-danger').result.then(res => {
      console.log('MSG delOpSite:', res);
      switch (res) {
        case 'confirm-del':
          this.operatingOffices.splice(i, 1);
          this.setOpOffice();
          break;
        default:
          break;
      }
    })
  }

  actionOpSite(title: string, action: string, site?: OpOffice, indexSite?: number) {
    this.modalService.openModalOpSite(title, action, site, indexSite).result.then(res => {
      switch (res.message) {
        case 'confirm-mod':
          this.operatingOffices.splice(res.indexSite, 1, res.form);
          this.setOpOffice();
          break;
        case 'confirm-new':
          this.operatingOffices.push(res.form);
          this.setOpOffice();
          break;
        default:
          break;
      }
    })
  }

  getCities() {
    if (this.citiesSevice.cities.length == 0) {
      this.citiesSevice.getApiCities('').subscribe({
        next: res => {
          if (res) {
            this.cities = res.data;
            this.citiesSevice.setCities(this.cities);
          }
        },
        error: err => { console.log('Errore: ', err) }
      });
    } else this.cities = this.citiesSevice.cities;
  }

  setCity() {
    this.formClient.get('legalSite')?.get('city')?.valueChanges.subscribe({
      next: (res: any) => {
        if (res) {
          let city = this.cities.find(re => re.comune === res.toUpperCase());
          this.formClient.get('legalSite')?.get('province')?.setValue(city!.provincia);
          this.formClient.get('legalSite')?.get('cap')?.setValue(city!.cap);
        }
      }
    })
    this.formClient.get('city')?.valueChanges.subscribe({
      next: res => {
        if (res) {
          let city = this.cities.find(re => re.comune === res.toUpperCase());
          this.formClient.get('province')?.setValue(city!.provincia);
          this.formClient.get('cap')?.setValue(city!.cap);
        }
      }
    })
  }

  uploadFile(event: any) {
    this.isModImg = true;
    const reader = new FileReader();
    if (event.target && event.target.files.length) {
      let file = event.target.files[0]!;
      reader.onload = () => {
        this.preview = reader.result as string;
        this.formClient.get('photo')?.patchValue(file);
      };
      reader.readAsDataURL(file);
    }
  }

  deleteImage() {
    this.preview = '';
    this.isModImg = false;
    this.formClient.get('photo')!.reset();
  }

  sendEventFormClient() {
    //console.log(action)
    this.preview = '';
    let client  = {
      data:this.formClient.value,
      logo: this.formClient.get('photo')!.value
    }
    this.eventFormClient.emit(client);
    this.isModImg = false;
  }

  ngOnDestroy(): void {
    this.formClient.reset();
  }
}
