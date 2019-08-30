import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-disabled',
  templateUrl: './disabled.component.html'
})
export class DisabledComponent implements OnInit {
  values2 = ['Beijing', 'Chengdu', 'Shenzhen'];
  choose3 = 'Beijing';
  constructor() { }

  ngOnInit() {
  }

}
