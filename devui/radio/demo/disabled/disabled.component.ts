import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-disabled',
  templateUrl: './disabled.component.html'
})
export class DisabledComponent implements OnInit {
  values2 = ['Item1', 'Item2', 'Item3'];
  choose3 = 'Item1';
  constructor() { }

  ngOnInit() {
  }

}
