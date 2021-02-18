import { Component } from '@angular/core';
@Component({
  selector: 'd-object-filter',
  templateUrl: './object-filter.component.html',
  styleUrls: ['./object-filter.component.css']
})
export class ObjectFilterComponent {
  options2 = [{
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
  currentOption4 = {};
}
