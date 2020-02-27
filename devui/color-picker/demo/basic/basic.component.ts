import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-color-picker-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {
  backgroundColor = '#0080ff';
  hideColorPicker = true;

  constructor() { }

  ngOnInit() {
  }

  setColor(color) {
    this.backgroundColor = color;
  }

  confirmColor(color) {
    this.backgroundColor = color;
    this.hideColorPicker = true;
  }
}
