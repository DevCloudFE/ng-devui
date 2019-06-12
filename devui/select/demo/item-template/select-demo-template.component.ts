import { Component } from '@angular/core';
@Component({
  selector: 'ave-select-template',
  templateUrl: './select-demo-template.component.html'
})
export class SelectDemoTemplateComponent {
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
