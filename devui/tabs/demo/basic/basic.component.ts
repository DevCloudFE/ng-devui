import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {

  tab1acticeID: string | number = 'tab2';
  tab2acticeID: string | number = 'tab3';
  constructor() { }

  ngOnInit() {
  }
  activeTabChange(id) {
    console.log(id);
  }
}
