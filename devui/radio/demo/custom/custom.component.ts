import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-custom',
  templateUrl: './custom.component.html'
})
export class CustomComponent implements OnInit {
  values2 = ['Item1', 'Item2', 'Item3'];
  choose2_2 = 'Item3';
  constructor() { }

  ngOnInit() {
  }

  log($event) {
    console.log($event);
  }

}
