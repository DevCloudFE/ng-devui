import { Component } from '@angular/core';
@Component({
  selector: 'ave-auto-complete-demo-basic',
  templateUrl: './auto-complete-demo-basic.component.html'
})
export class AutoDemoBasicComponent {
  selectItem0;
  languages = ['C#', 'C', 'C++', 'CPython', 'Java', 'JavaScript', 'Go', 'Python', 'Ruby', 'F#', 'TypeScript', 'SQL',
  'LiveScript', 'CoffeeScript'];
  constructor() { }
}
