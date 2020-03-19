import { Component } from '@angular/core';
@Component({
  selector: 'd-select-all',
  templateUrl: './select-demo-all.component.html',
  styles: [
    `
      .col-md-5 {
        width: 50%;
      }
    `
  ]
})

export class SelectDemoAllComponent {
  languages = ['C#', 'C', 'C++', 'CPython', 'Java', 'JavaScript', 'Go', 'Python', 'Ruby', 'F#', 'TypeScript', 'SQL',
    'LiveScript', 'CoffeeScript'];
  select2 = ['Python', 'C++'];
}
