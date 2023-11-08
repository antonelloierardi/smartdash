import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() page = 1;
  @Input() pageSize = 10;
  @Input() collectionSize = 0;
  @Output() pageEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    //console.log('collectionSize',this.collectionSize)
  }

  pageEmit() {
    this.pageEvent.emit(this.page);
  }

}
