import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html'
})
export class BasicComponent implements OnInit {
  values2 = ['Item1', 'Item2', 'Item3'];
  choose2 = 'Item1';
  constructor() { }

  ngOnInit() {
  }
  valueChange(value) {
    console.log(value);
  }
}
