import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ave-special',
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.css']
})
export class SpecialComponent implements OnInit {
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

  constructor() { }

  ngOnInit() {
  }

  setTotal(number) {
    this.pager3.total = number;
  }

}
