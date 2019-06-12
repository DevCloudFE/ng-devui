import { Component } from '@angular/core';
import { of } from 'rxjs';
@Component({
  selector: 'ave-auto-complete-demo-array',
  templateUrl: './auto-complete-demo-array.component.html'
})
export class AutoDemoArrayComponent {
  selectItem2;
  languages = ['C#', 'C', 'C++', 'CPython', 'Java', 'JavaScript', 'Go', 'Python', 'Ruby', 'F#', 'TypeScript', 'SQL',
    'LiveScript', 'CoffeeScript'];
  onSearchLocal(term) {
    return of(this.languages.filter(lang => lang.toLowerCase().indexOf(term.toLowerCase()) !== -1));
  }

  selectValue(value) {
    // tslint:disable-next-line:no-console
    console.info(value);
  }
}
