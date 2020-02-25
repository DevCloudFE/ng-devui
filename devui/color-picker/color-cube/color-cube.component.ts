import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'd-color-cube',
  templateUrl: './color-cube.component.html',
  styleUrls: ['./color-cube.component.scss']
})
export class ColorCubeComponent implements OnInit {
  @Input() color;
  @Input() size;

  constructor() {

  }

  ngOnInit() {
  }

}
