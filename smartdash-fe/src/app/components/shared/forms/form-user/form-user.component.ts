import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { City } from 'src/app/models/city.model';
import { FormUser } from 'src/app/models/forms';
import { CitiesService } from 'src/app/services/cities.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit, OnDestroy {

  @Input() user: any;
  @Input() isNewUser = false;
  @Input() isProfile = false;
  @Output() eventFormUser = new EventEmitter();
  @Output() eventFormUserPhoto = new EventEmitter();
  @Output() eventFormUserValidity = new EventEmitter();
  formUser = FormUser;
  companyID = sessionStorage.getItem('companyID');
  company = sessionStorage.getItem('company');
  cities: City[] = [];
  preview!: string;
  isModImg = false;
  roles = [
    { label: 'Admin', value: 'admin' },
    { label: 'Utente', value: 'user' }
  ];
  status = [
    { label: 'Attivo', value: 'active' },
    { label: 'Non Attivo', value: 'inactive' },
    { label: 'Cancellato', value: 'deleted' }
  ];


  constructor(private citiesSevice: CitiesService) { }

  ngOnInit(): void {
    this.setForm();
    this.getCities();
    this.setCity();
    this.getIsNewUser();
    this.getValidityForm();
    this.getIsPtofile();
  }

  setForm() {
    if (this.user) {
      Object.keys(this.formUser.controls).forEach(ctrl => {
        Object.keys(this.user).forEach(pr => {
          if (ctrl === pr && ctrl && ctrl !== 'photo') {
            this.formUser.get(ctrl)!.setValue(this.user[pr]);
          }
        })
      })
    }
    //console.log('FormUserComponent', this.formUser.value)
  }

  getIsNewUser() {
    if (this.isNewUser) {
      this.formUser.get('companyID')?.setValue(this.companyID);
      this.formUser.get('company')?.setValue(this.company);
      this.status = this.status.filter(el => el.value !== 'deleted');
    }
  }

  getIsPtofile() {
    if (this.isProfile) {
      this.formUser.get('status')?.disable();
      this.formUser.get('role')?.disable();
    } else {
      this.formUser.get('status')?.enable()
      this.formUser.get('role')?.enable()
    }
  }

  sendEventFormUser(action: string) {
    console.log(action)
    this.preview = '';
    let user = {
      action: action,
      form: action === 'close' ? null : this.setObjSend()
    }
    this.eventFormUser.emit(user);
    this.isModImg = false;
  }

  getValidityForm() {
    this.formUser.valueChanges.subscribe(res => {
      if (this.formUser.valid) {
        console.log('formUser vc', this.formUser.status);
        this.eventFormUserValidity.emit();
      }
    })
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
    this.formUser.get('city')?.valueChanges.subscribe({
      next: (res: any) => {
        if (res) {
          let city = this.cities.find(re => re.comune === res.toUpperCase());
          this.formUser.get('province')?.setValue(city!.provincia);
          this.formUser.get('cap')?.setValue(city!.cap);
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
        this.formUser.get('photo')?.patchValue(file);
      };
      reader.readAsDataURL(file);
    }
  }

  deleteImage() {
    this.preview = '';
    this.isModImg = false;
    this.formUser.get('photo')!.reset();
  }

  setObjSend() {
    let obj = {
      name: this.formUser.get('name')?.value ? this.formUser.get('name')?.value : this.user.name,
      surname: this.formUser.get('surname')?.value ? this.formUser.get('surname')?.value : this.user.surname,
      position: this.formUser.get('position')?.value ? this.formUser.get('position')?.value : this.user.position,
      site: this.formUser.get('site')?.value ? this.formUser.get('site')?.value : this.user.site,
      address: this.formUser.get('address')?.value ? this.formUser.get('address')?.value : this.user.address,
      cap: this.formUser.get('cap')?.value ? this.formUser.get('cap')?.value : this.user.cap,
      city: this.formUser.get('city')?.value ? this.formUser.get('city')?.value : this.user.city,
      province: this.formUser.get('province')?.value ? this.formUser.get('province')?.value : this.user.province,
      email: this.formUser.get('email')?.value ? this.formUser.get('email')?.value : this.user.email,
      tel: this.formUser.get('tel')?.value ? this.formUser.get('tel')?.value : this.user.tel,
      mobile: this.formUser.get('mobile')?.value ? this.formUser.get('mobile')?.value : this.user.mobile,
      role: this.formUser.get('role')?.value ? this.formUser.get('role')?.value : this.user.role,
      status: this.formUser.get('status')?.value ? this.formUser.get('status')?.value : this.user.status,
      password: this.formUser.get('password')?.value,
      repeatPassword: this.formUser.get('repeatPassword')?.value,
    }

    if (!this.isNewUser) {
      Object.assign(obj, {
        _id: this.user._id, companyID: this.user.companyID, company: this.user.company,
        photo: this.formUser.get('photo')?.value ? this.formUser.get('photo')?.value : this.user.photo
      })
    } else Object.assign(obj, {
      companyID: this.companyID, company: this.company,
      photo: this.formUser.get('photo')?.value ? this.formUser.get('photo')?.value : null
    });

    return obj;
  }


  ngOnDestroy(): void {
    this.formUser.reset();
    this.isProfile = false;
  }
}
