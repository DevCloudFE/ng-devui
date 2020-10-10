import {Component} from '@angular/core';

@Component({
  selector: 'd-slider-basic',
  templateUrl: './slider-basic.component.html',
  styleUrls: ['./slider-basic.component.scss']
})
export class SliderBasicComponent {
  inputValue = 12;
  minValue = 0;
  maxValue = 20;
  inputValue2 = 15;
  inputValue3 = 0;
  step = (this.maxValue - this.minValue) / 5;

  showVal($event: any) {
    console.log($event);
  }

  afterChange($event: number) {
    console.log('stop value: ' + $event);
  }
}
