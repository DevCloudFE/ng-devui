import { Component } from '@angular/core';

@Component({
    selector: 'd-multi-auto-complete-default',
    templateUrl: './multi-auto-complete-demo-default.component.html',
    standalone: false
})
export class MultiAutoCompleteDemoDefaultComponent {
  multiItems: string[] = ['C#', 'C', 'C++', 'CPython', 'Java'];
  latestSource: string[] = ['SQL', 'LiveScript', 'CoffeeScript'];
  languages = ['C#', 'C', 'C++', 'CPython', 'Java', 'JavaScript', 'Go', 'Python', 'Ruby', 'F#', 'TypeScript', 'SQL',
    'LiveScript', 'CoffeeScript'];
}
