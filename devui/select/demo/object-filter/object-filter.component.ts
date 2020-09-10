import { Component } from '@angular/core';
@Component({
  selector: 'd-object-filter',
  templateUrl: './object-filter.component.html',
  styleUrls: ['./object-filter.component.css']
})
export class ObjectFilterComponent {
  options2 = [{
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
  currentOption4 = {};
}
