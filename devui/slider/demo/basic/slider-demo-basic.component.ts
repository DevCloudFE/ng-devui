import {Component} from '@angular/core';

@Component({
  selector: 'd-slider-demo-basic',
  templateUrl: './slider-demo-basic.component.html',
  styleUrls: ['./slider-demo-basic.component.css']
})
export class SliderDemoBasicComponent {
  inputValue = 12;
  minValue = 0;
  maxValue = 20;
  inputValue2 = 15;

  showVal($event: any) {
    console.log($event);
  }
}
