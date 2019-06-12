import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ave-horizontal',
  templateUrl: './horizontal.component.html',
  styleUrls: ['./horizontal.component.css']
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
