import {Component} from '@angular/core';

@Component({
  selector: 'd-slider-basic',
  templateUrl: './slider-basic.component.html',
  styleUrls: ['./slider-basic.component.css']
})
export class SliderBasicComponent {
  inputValue = 12;
  minValue = 0;
  maxValue = 20;
  inputValue2 = 15;

  showVal($event: any) {
    console.log($event);
  }
}
