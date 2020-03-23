import {
    Component
  } from '@angular/core';

  @Component({
    selector: 'd-additional',
    templateUrl: './additional.component.html',
    styleUrls: ['./additional.component.css']
  })
  export class AdditionalComponent {
    pager1 = {
      total: 10,
      pageIndex: 2,
      pageSize: 10
    };
    pager2 = {
      total: 10,
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
  }

