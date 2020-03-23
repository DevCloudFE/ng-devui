import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-horizontal',
  templateUrl: './horizontal.component.html'
})
export class HorizontalComponent implements OnInit {
  values2 = ['Item1', 'Item2', 'Item3'];
  choose2_1 = 'Item1';
  constructor() { }

  ngOnInit() {
  }

  log($event) {
    console.log($event);
  }

}
