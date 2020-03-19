import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-custom',
  templateUrl: './custom.component.html'
})
export class CustomComponent implements OnInit {
  values2 = ['Beijing', 'Chengdu', 'Shenzhen'];
  choose2_2 = 'Shenzhen';
  constructor() { }

  ngOnInit() {
  }

  log($event) {
    console.log($event);
  }

}
