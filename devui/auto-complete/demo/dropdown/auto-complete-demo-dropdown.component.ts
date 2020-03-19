import { Component } from '@angular/core';
@Component({
  selector: 'd-auto-complete-demo-dropdown',
  templateUrl: './auto-complete-demo-dropdown.component.html'
})
export class AutoDemoDropdownComponent {
  selectItem1;
  languages = ['C#', 'C', 'C++', 'CPython', 'Java', 'JavaScript', 'Go', 'Python', 'Ruby', 'F#', 'TypeScript', 'SQL',
  'LiveScript', 'CoffeeScript'];
  constructor() { }
}
