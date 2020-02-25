import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ColorPickerService } from '../services/color-picker.service';

@Component({
  selector: 'd-basic-color',
  templateUrl: './basic-color.component.html',
  styleUrls: ['./basic-color.component.scss']
})
export class BasicColorComponent implements OnInit {
  @Input() basicColors;

  constructor(
    private colorPickerService: ColorPickerService
  ) { }

  ngOnInit() {
  }

  clickColor(color) {
    this.colorPickerService.setColor(color);
  }
}
