import { Component } from '@angular/core';

@Component({
  selector: 'd-auto-complete-demo-basic',
  templateUrl: './auto-complete-demo-basic.component.html'
})
export class AutoDemoBasicComponent {
  selectItem0: any;
  languages = ['C#', 'C', 'C++', 'CPython', 'Java', 'JavaScript', 'Go', 'Python', 'Ruby', 'F#', 'TypeScript', 'SQL',
    'LiveScript', 'CoffeeScript'];
}
