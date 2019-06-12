import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ave-vertical',
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.css']
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
