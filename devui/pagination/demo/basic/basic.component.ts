import { Component } from '@angular/core';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html',
})
export class BasicComponent {
  pager = {
    total: 306,
    pageIndex: 5,
    pageSize: 10,
  };

  constructor() {}
}
