import {Component} from '@angular/core';

@Component({
  selector: 'd-lite',
  templateUrl: './lite.component.html',
  styleUrls: ['./lite.component.scss']
})
export class LiteComponent {
  pager1 = {
    total: 100,
    pageIndex: 1,
    pageSize: 10
  };
  pager2 = {
    total: 30,
    pageIndex: 3,
    pageSize: 10
  };
  pager3 = {
    total: 0,
    pageIndex: 1,
    pageSize: 10
  };

  setTotal(number) {
    this.pager3.total = number;
  }

  setIndex(number: number) {
    this.pager3.pageIndex = number;
    console.log(this.pager3.pageIndex);
  }
}
