import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ave-disabled',
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.css']
})
export class DisabledComponent implements OnInit {
  values2 = ['Beijing', 'Chengdu', 'Shenzhen'];
  choose2_3 = 'Beijing';
  constructor() { }

  ngOnInit() {
  }

}
