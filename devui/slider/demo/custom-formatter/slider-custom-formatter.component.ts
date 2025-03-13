import { Component } from '@angular/core';

@Component({
    selector: 'd-slider-custom',
    templateUrl: './slider-custom-formatter.component.html',
    styleUrls: ['./slider-custom-formatter.component.scss'],
    standalone: false
})
export class SliderCustomFormatterComponent {
  inputValue = 8;
  minValue = 0;
  maxValue = 20;
  inputValue2 = 15;

  demoFormatter(value: number) {
    return `${value} apples`;
  }
}
