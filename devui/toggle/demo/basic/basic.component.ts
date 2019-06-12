import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ave-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {
  enable = true;
  count = 0;

  constructor() {
  }

  ngOnInit() {

  }

  onSubmit() {
  }

  onChange() {
    this.count++;
  }

}
