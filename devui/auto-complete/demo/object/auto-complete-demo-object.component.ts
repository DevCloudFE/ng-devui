import { Component } from '@angular/core';
import { of } from 'rxjs';
@Component({
  selector: 'ave-auto-complete-demo-object',
  templateUrl: './auto-complete-demo-object.component.html',
})
export class AutoDemoObjectComponent {
  selectItem3;
  languages = ['C#', 'C', 'C++', 'CPython', 'Java', 'JavaScript', 'Go', 'Python', 'Ruby', 'F#', 'TypeScript', 'SQL',
    'LiveScript', 'CoffeeScript'];
  onSearchObject(term) {
    return of(this.languages
      .map((lang, index) => ({ label: lang, id: index }))
      .filter(lang => lang.label.toLowerCase().indexOf(term.toLowerCase()) !== -1)
    );
  }
  constructor() { }
}
