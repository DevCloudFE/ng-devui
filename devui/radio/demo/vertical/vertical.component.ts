import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-vertical',
  templateUrl: './vertical.component.html'
})
export class VerticalComponent implements OnInit {
  values = ['Spring', 'Summer', 'Autumn', 'Winter'];
  choose = 'Summer';
  constructor() { }

  ngOnInit() {
  }

  log($event) {
    console.log($event);
  }

}
