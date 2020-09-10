import {Component} from '@angular/core';

@Component({
  selector: 'd-slider-disabled',
  templateUrl: './slider-disabled.component.html'
})
export class SliderDisabledComponent {
  inputValue = 2;
  minValue = 0;
  maxValue = 20;
}
