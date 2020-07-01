import { Component } from '@angular/core';

@Component({
  selector: 'd-multi-auto-complete-disabled',
  templateUrl: './multi-auto-complete-demo-disabled.component.html'
})
export class MultiAutoCompleteDemoDisabledComponent {
  multiItems: string[] = ['C#', 'C', 'C++', 'CPython', 'Java'];
  latestSource: string[] = ['SQL', 'LiveScript', 'CoffeeScript'];
  languages = ['C#', 'C', 'C++', 'CPython', 'Java', 'JavaScript', 'Go', 'Python', 'Ruby', 'F#', 'TypeScript', 'SQL',
    'LiveScript', 'CoffeeScript'];
}
