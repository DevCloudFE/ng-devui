import { Component } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'd-auto-complete-demo-object',
  templateUrl: './auto-complete-demo-object.component.html',
})
export class AutoDemoObjectComponent {
  selectItem3: any;
  languages = ['C#', 'C', 'C++', 'CPython', 'Java', 'JavaScript', 'Go', 'Python', 'Ruby', 'F#', 'TypeScript', 'SQL',
    'LiveScript', 'CoffeeScript'];

  onSearchObject(term: any) {
    return of(this.languages
      .map((lang, index) => ({ label: lang, id: index }))
      .filter(lang => lang.label.toLowerCase().indexOf(term.toLowerCase()) !== -1)
    );
  }
}
