import { Component } from '@angular/core';
@Component({
  selector: 'ave-select-all',
  templateUrl: './select-demo-all.component.html'
})

export class SelectDemoAllComponent {
  languages = ['C#', 'C', 'C++', 'CPython', 'Java', 'JavaScript', 'Go', 'Python', 'Ruby', 'F#', 'TypeScript', 'SQL',
    'LiveScript', 'CoffeeScript'];
  select2 = ['Python', 'C++'];
}
