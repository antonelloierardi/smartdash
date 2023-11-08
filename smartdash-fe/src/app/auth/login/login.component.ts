import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() eventLogIn = new EventEmitter();

  formLogin = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  })

  message = '';
  typeAlert = '';
  icon = ''

  constructor(private router: Router, private authService: AuthService,private sharedService:SharedService) {}

  ngOnInit(): void { }

  logIn() {
    let email = this.formLogin.get('email')!.value;
    let password = this.formLogin.get('password')!.value;
    this.authService.logIn(email!, password!).subscribe({
      next: res => {
        this.sharedService.setRoute('/home');
        sessionStorage.setItem('companyID', res.user.companyID);
        sessionStorage.setItem('company', res.user.company);
        this.eventLogIn.emit();
        this.router.navigateByUrl('/home');
        console.log('LoginComponent', res);

      },
      error: err => {
        console.log('ERROR: ',err);
        this.typeAlert = 'alert-danger';
        this.icon = 'alert-triangle'
        this.message = `Errore ${err.status} ${err.statusText} - Accesso non autorizzato`;
       }
    })

  }

}
