import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ave-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {
  pager = {
    total: 306,
    pageIndex: 5,
    pageSize: 10
  };
  constructor() { }

  ngOnInit() {
  }

}
