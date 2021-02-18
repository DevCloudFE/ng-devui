import { Component } from '@angular/core';
import { MapToPipe } from './map-to.pipe';

@Component({
  selector: 'd-model-value',
  templateUrl: './model-value.component.html',
  styleUrls: ['./model-value.component.css']
})
export class ModelValueComponent {
  options = [{
    name: 'Option 1',
    value: 1
  }, {
    name: 'Option 2',
    value: 2
  }, {
    name: 'Option 3',
    value: 3
  }, {
    name: 'Option 4',
    value: 4
  }];
  currentOption = {};
  modelChange(value) {
    this.currentOption = new MapToPipe().transform(value, 'value');
  }
}
