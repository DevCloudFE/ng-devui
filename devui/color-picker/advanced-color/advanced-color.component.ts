import { Component, OnInit } from '@angular/core';
import { ColorPickerService } from '../services/color-picker.service';

@Component({
  selector: 'd-advanced-color',
  templateUrl: './advanced-color.component.html',
  styleUrls: ['./advanced-color.component.scss']
})
export class AdvancedColorComponent implements OnInit {
  color: string;
  pureColor: string;

  constructor(
    private colorPickerService: ColorPickerService
  ) {
    this.colorPickerService.updateColor.subscribe(
      () => {
        this.color = this.colorPickerService.getColor();
      }
    );
  }

  ngOnInit() {
    this.color = this.colorPickerService.getColor();
  }

  receivePureColor(pureColor) {
    this.pureColor = pureColor;
  }
}
