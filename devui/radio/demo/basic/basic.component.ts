import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ave-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {
  values2 = ['Beijing', 'Chengdu', 'Shenzhen'];
  choose2_3 = 'Beijing';
  constructor() { }

  ngOnInit() {
  }

}
