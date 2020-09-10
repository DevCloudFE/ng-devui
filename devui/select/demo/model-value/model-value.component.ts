import { Component } from '@angular/core';
import { MapToPipe } from './map-to.pipe';

@Component({
  selector: 'd-model-value',
  templateUrl: './model-value.component.html',
  styleUrls: ['./model-value.component.css']
})
export class ModelValueComponent {
  options = [{
    name: '选项1',
    value: 1
  }, {
    name: '选项2',
    value: 2
  }, {
    name: '选项3',
    value: 3
  }, {
    name: '选项4',
    value: 4
  }];
  currentOption = {};
  modelChange(value) {
    this.currentOption = new MapToPipe().transform(value, 'value');
  }
}
