import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-common-pipe',
  templateUrl: './pipe.component.html',
})
export class PipeDemoComponent implements OnInit {
  date = new Date(2014, 1, 11, 13, 1, 22);
  date1 = new Date(2015, 4, 5);
  constructor() {}

  ngOnInit() {}
}
