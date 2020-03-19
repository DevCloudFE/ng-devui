import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-horizontal',
  templateUrl: './horizontal.component.html'
})
export class HorizontalComponent implements OnInit {
  values2 = ['Beijing', 'Chengdu', 'Shenzhen'];
  choose2_1 = 'Beijing';
  constructor() { }

  ngOnInit() {
  }

  log($event) {
    console.log($event);
  }

}
