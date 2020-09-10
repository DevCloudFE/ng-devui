import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {

  tab1acticeID = 'tab2';
  tab2acticeID = 'tab3';
  constructor() { }

  ngOnInit() {
  }
  activeTabChange(id) {
    console.log(id);
  }
}
