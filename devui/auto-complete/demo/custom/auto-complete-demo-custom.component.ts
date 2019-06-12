import { Component } from '@angular/core';
import { of } from 'rxjs';
@Component({
  selector: 'ave-auto-complete-demo-custom',
  templateUrl: './auto-complete-demo-custom.component.html'
})
export class AutoDemoCustomComponent {
  selectItem4;
  icons = ['icon-add', 'icon-bug', 'icon-filter', 'icon-frok'];
  languages = ['C#', 'C', 'C++', 'CPython', 'Java', 'JavaScript', 'Go', 'Python', 'Ruby', 'F#', 'TypeScript', 'SQL',
    'LiveScript', 'CoffeeScript'];

  constructor() { }
  onSearchLocal(term) {
    return of(this.languages.filter(lang => lang.toLowerCase().indexOf(term.toLowerCase()) !== -1));
  }
  getIcon(index) {
    return this.icons[index % this.icons.length];
  }
}
