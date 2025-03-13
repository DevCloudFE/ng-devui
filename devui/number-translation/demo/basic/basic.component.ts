import { Component } from '@angular/core';

@Component({
    selector: 'd-basic',
    templateUrl: './basic.component.html',
    standalone: false
})
export class BasicComponent {
  data = [{
    number: 123123123.223,
    type: 'comma'
  },
  {
    number: 232314212,
    type: 'unit'
  },
  {
    number: 231232132,
    type: 'flow'
  },
  {
    number: 231232132,
    type: 'exponent'
  }];

}
