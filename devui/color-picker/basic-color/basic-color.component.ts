import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'd-basic-color',
  templateUrl: './basic-color.component.html',
  styleUrls: ['./basic-color.component.scss']
})
export class BasicColorComponent implements OnInit {
  @Output() send = new EventEmitter();
  @Input() basicColors;

  constructor(
  ) { }

  ngOnInit() {
  }

  selectColor(color) {
    this.send.emit({color});
  }
}
