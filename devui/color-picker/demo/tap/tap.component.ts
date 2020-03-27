import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-color-picker-tap',
  templateUrl: './tap.component.html',
  styleUrls: ['./tap.component.scss']
})
export class TapComponent implements OnInit {
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
