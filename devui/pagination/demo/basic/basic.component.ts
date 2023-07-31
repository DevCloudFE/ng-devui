import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html'
})
export class BasicComponent implements OnInit {
  pager = {
    total: 306,
    pageIndex: 5,
    pageSize: 10
  };

  pagerLg = {
    total: 1000,
    pageIndex: 5,
    pageSize: 50
  };

  constructor() { }

  ngOnInit() {
  }

}
