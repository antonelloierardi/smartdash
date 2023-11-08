import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormUser } from 'src/app/models/forms';
import { FormUserComponent } from '../form-user/form-user.component';
import { FormGroup } from '@angular/forms';
import { FormClientComponent } from '../form-client/form-client.component';

@Component({
  selector: 'app-modal-new',
  templateUrl: './modal-new.component.html',
  styleUrls: ['./modal-new.component.scss']
})
export class ModalNewComponent implements OnInit {

  @ViewChild('userForm') userForm!: FormUserComponent;
  @ViewChild('clientForm') clientForm!: FormClientComponent;
  @Input() title!: string;
  @Input() content: any;
  @Input() message!: string;
  @Input() alertType!: string;
  @Input() action!: string;
  @Input() type!: string;
  formUser = FormUser;
  formValid = false;


  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log('TIPO: ', this.type)
  }

  close(action: string) {
    this.userForm.sendEventFormUser(action);
  }

  sendForm(userFormEvent: any) {
    //console.log(userFormEvent)
    this.activeModal.close(userFormEvent);
  }

  getFormValidity() {
    this.formValid = true;
  }
}
