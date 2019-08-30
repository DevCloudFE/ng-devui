import {Component} from '@angular/core';

@Component({
  selector: 'd-slider-demo-formatter',
  templateUrl: './slider-demo-custom-formatter.component.html',
})
export class SliderDemoCustomFormatterComponent {
  inputValue = 8;
  minValue = 0;
  maxValue = 20;
  inputValue2 = 15;

  demoFormatter(value: number) {
    return `${value} apples`;
  }
}
