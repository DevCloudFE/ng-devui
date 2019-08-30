import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html'
})
export class BasicComponent implements OnInit {
  values2 = ['Beijing', 'Chengdu', 'Shenzhen'];
  choose2 = 'Beijing';
  constructor() { }

  ngOnInit() {
  }
  valueChange(value) {
    console.log(value);
  }
}
