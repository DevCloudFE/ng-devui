import { Component } from '@angular/core';
@Component({
  selector: 'd-select-template',
  templateUrl: './select-template.component.html',
  styles: [
    `
      .col-md-5 {
        width: 50%;
      }
    `
  ]
})
export class SelectTemplateComponent {
  languages2 = [{
    name: 'true',
    value: 1,
    specialContent: 'Yeah, we have come to an agreement.'
  }, {
    name: 'false',
    value: 0,
    specialContent: 'Ops, you don\'t agree!'
  }];
  languages3 = [{
    name: 'A',
    value: 1
  }, {
    name: 'B',
    value: 2
  }];
  currentOption4 = {};
  currentOption5;
}
