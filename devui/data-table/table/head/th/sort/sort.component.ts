import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SortDirection, SortEventArg } from '../../../../data-table.model';

@Component({
  selector: 'd-table-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {
  @Input() sortDirection: SortDirection;
  @Output() sortEvent = new EventEmitter<SortEventArg>();

  constructor() { }

  ngOnInit() {
  }

  sort() {
    switch (this.sortDirection) {
      case SortDirection.ASC:
        this.sortDirection = SortDirection.DESC;
        break;
      case 'DESC':
        this.sortDirection = SortDirection.default;
        break;
      case SortDirection.default:
      default:
        this.sortDirection = SortDirection.ASC;
    }
    this.sortEvent.emit({ direction: this.sortDirection });
  }
}
