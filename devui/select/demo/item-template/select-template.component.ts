import { Component } from '@angular/core';
@Component({
    selector: 'd-select-template',
    templateUrl: './select-template.component.html',
    standalone: false
})
export class SelectTemplateComponent {
  singleOptions = [
    {
      name: 'true',
      value: 1,
      specialContent: 'Yeah, we have come to an agreement.',
    },
    {
      name: 'false',
      value: 0,
      specialContent: "Ops, you don't agree!",
    },
  ];
  multipleOptions = [
    {
      name: 'A',
      value: 1,
    },
    {
      name: 'B',
      value: 2,
    },
  ];
  currentOption4 = {};
  currentOption5: any;
}
