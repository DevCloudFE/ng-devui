import {Component} from '@angular/core';

@Component({
  selector: 'd-slider-formatter',
  templateUrl: './slider-custom-formatter.component.html',
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
