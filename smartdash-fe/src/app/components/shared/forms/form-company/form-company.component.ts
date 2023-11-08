import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormCompany, FormOperatingOffices} from 'src/app/models/forms';
import { City } from 'src/app/models/city.model';
import { CitiesService } from 'src/app/services/cities.service';
import { ModalsService } from 'src/app/services/modals.service';
import { User } from 'src/app/models/user.model';
import { OpOffice } from 'src/app/models/client.model';

@Component({
  selector: 'app-form-company',
  templateUrl: './form-company.component.html',
  styleUrls: ['./form-company.component.scss']
})
export class FormCompanyComponent implements OnInit {

  @Input() user!: User;
  @Input() company: any;
  @Output() eventFormCompany = new EventEmitter();
  formCompany = FormCompany;
  formOperatingOffices = FormOperatingOffices;
  cities: City[] = [];
  delMessage = 'Sicuro di voler eliminare la sede operativa?';
  modMessage = 'Sicuro di voler modificare i dati aziendali?';
  preview!: string;
  isModImg = false;

  constructor(private citiesSevice: CitiesService, private modalService: ModalsService) { }

  ngOnInit(): void {
    this.setForm();
    this.getCities();
    this.setCity();
  }

  setForm() {
    if (this.company) {
      this.setOpOffice();
      Object.keys(this.formCompany.controls).forEach(ctrl => {
        Object.keys(this.company!).forEach(pr => {
          if (ctrl === pr) {
            if (ctrl === 'details' || ctrl === 'operatingOffices') {
              Object.keys(this.formCompany.controls.details.controls).forEach(detCtrl => {
                if (ctrl === 'details') {
                  Object.keys(this.company!.details).forEach(detPr => {
                    if (detCtrl === detPr) {
                      this.formCompany.get(ctrl)!.get(detCtrl)!.setValue(this.company!.details[detPr])
                    }
                  })
                }
              })
            } else this.formCompany.get(ctrl)!.setValue(this.company[pr]);
          }
        })
      });
    }
    if(this.user && !this.user.isAdmin) this.formCompany.disable();
  }

  setOpOffice() {
    this.formCompany.controls.operatingOffices.clear();
    this.company.operatingOffices.forEach((el: any) => {
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
      this.formCompany.controls.operatingOffices.push(operatingOfficesForm);
    })
  }

  update() {
    this.modalService.openModalMsg('Attenzione', 'update', this.modMessage, 'alert-warning').result.then(res => {
      console.log('MSG:', res);
      switch (res) {
        case 'confirm-mod':
          let obj = {
            form:this.formCompany.value,
            logo: this.formCompany.get('logo')!.value
          }
          this.eventFormCompany.emit(obj);
          console.log('formCompany', obj);
          break;
        case 'close':
          //this.setForm();
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
          this.company.operatingOffices.splice(i, 1);
          this.setOpOffice();
          break;
        default:
          break;
      }
    })
  }

  actionOpSite(title: string, action: string, site?: OpOffice, indexSite?: number) {
    this.modalService.openModalOpSite(title, action, site, indexSite).result.then(res => {
      console.log('MSG actionOpSite:', res)
      switch (res.message) {
        case 'confirm-mod':
          this.company.operatingOffices.splice(res.indexSite, 1, res.form);
          this.setOpOffice();
          break;
        case 'confirm-new':
          this.company.operatingOffices.push(res.form);
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
    this.formCompany.get('legalSite')?.get('city')?.valueChanges.subscribe({
      next: (res: any) => {
        if (res) {
          let city = this.cities.find(re => re.comune === res.toUpperCase());
          this.formCompany.get('legalSite')?.get('province')?.setValue(city!.provincia);
          this.formCompany.get('legalSite')?.get('cap')?.setValue(city!.cap);
        }
      }
    })
    this.formOperatingOffices.get('city')?.valueChanges.subscribe({
      next: (res: string) => {
        if (res) {
          let city = this.cities.find(re => re.comune === res.toUpperCase());
          this.formOperatingOffices.get('opProvince')?.setValue(city!.provincia);
          this.formOperatingOffices.get('opCap')?.setValue(city!.cap);
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
        this.formCompany.get('logo')?.patchValue(file);
      };
      reader.readAsDataURL(file);
    }
  }

  deleteImage() {
    this.preview = '';
    this.isModImg = false;
    this.formCompany.get('logo')!.reset();
  }
}
