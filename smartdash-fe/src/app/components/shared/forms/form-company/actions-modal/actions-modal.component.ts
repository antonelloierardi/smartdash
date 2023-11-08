import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { City } from 'src/app/models/city.model';
import { OpOffice } from 'src/app/models/client.model';
import { FormOperatingOffices } from 'src/app/models/forms';
import { CitiesService } from 'src/app/services/cities.service';

export interface ModalResult {
  message: string
  form: FormGroup
  indexSite: number
}

@Component({
  selector: 'app-actions-modal',
  templateUrl: './actions-modal.component.html',
  styleUrls: ['./actions-modal.component.scss']
})
export class ActionsModalComponent {

  @Input() title!: string;
  @Input() content: any;
  @Input() message!: string;
  @Input() site!: OpOffice;
  @Input() indexSite!: number;
  @Input() action!: string;
  @Input() cities: City[] = [];
  formOperatingOffices: FormGroup = FormOperatingOffices;

  constructor(public activeModal: NgbActiveModal,private citiesSevice: CitiesService) {

  }
  ngOnInit(): void {
    this.setForm();
    this.getCities();
    this.setCity();
  }

  close(message: string) {
    let result: ModalResult = {
      message: `${message}-${this.action}`,
      indexSite: this.indexSite,
      form: this.formOperatingOffices.value
    }
    this.activeModal.close(result);
  }

  setForm() {
    if (this.site) {
      this.formOperatingOffices = new FormGroup({
        opAccountable: new FormControl({ value: this.site.opAccountable, disabled: false }, Validators.required),
        opAddress: new FormControl({ value: this.site.opAddress, disabled: false }, Validators.required),
        opCap: new FormControl({ value: this.site.opCap, disabled: false }, Validators.required),
        opCity: new FormControl({ value: this.site.opCity, disabled: false }, Validators.required),
        opProvince: new FormControl({ value: this.site.opProvince, disabled: false }, Validators.required),
        opTel: new FormControl({ value: this.site.opTel, disabled: false }, Validators.required),
        opEmail: new FormControl({ value: this.site.opEmail, disabled: false }, Validators.required),
        opMobile: new FormControl({ value: this.site.opMobile, disabled: false }),
        opEployees: new FormControl({ value: this.site.opEployees, disabled: false }, Validators.required)
      })
    }
  }

  getCities() {
    if (this.citiesSevice.cities.length === 0) {
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
    this.formOperatingOffices.get('opCity')?.valueChanges.subscribe({
      next: (res: any) => {
        if (res) {
          let city = this.cities.find(re => re.comune === res.toUpperCase());
          this.formOperatingOffices.get('opProvince')?.setValue(city!.provincia);
          this.formOperatingOffices.get('opCap')?.setValue(city!.cap);
        }
      }
    })
  }

  setLog() {
    console.log(`
    -------- Modal ${this.title} --------
    Action: ${this.action}
    Site: ${JSON.stringify(this.site)}
    Index Site: ${this.indexSite}
    Content: ${this.message}
    Message: ${this.content}
    `);
  }
}
