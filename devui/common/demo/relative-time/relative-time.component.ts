import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-relative-time',
  templateUrl: './relative-time.component.html'
})
export class RelativeTimeComponent implements OnInit {
  now = new Date();
  year_relation: any;
  month_relation: number;
  day_relation: number;

  constructor() { }

  ngOnInit() {
    this.year_relation = new Date().setFullYear(new Date().getFullYear() - 2);
    this.month_relation = new Date().setMonth(new Date().getMonth() - 2);
    this.day_relation = new Date().setDate(new Date().getDate() - 2);
  }

}
