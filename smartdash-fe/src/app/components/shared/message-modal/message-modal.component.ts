import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent {

  @Input() title!: string;
  @Input() content: any;
  @Input() message!: string;
  @Input() alertType = null
  @Input() action!: string;

  constructor(public activeModal: NgbActiveModal) {

  }
  ngOnInit(): void {
    //console.log('modal msg: ', this.action)
    this.setLog()
  }

  close(result: any) {
    this.activeModal.close(result);
  }

  setLog() {
    console.log(`
    -------- Modal ${this.title} --------
    Action: ${this.action}
    Alert Type: ${this.alertType}
    Content: ${this.message}
    Message: ${this.content}
    `);
  }
}
