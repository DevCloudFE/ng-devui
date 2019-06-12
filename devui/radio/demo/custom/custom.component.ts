import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ave-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.css']
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
