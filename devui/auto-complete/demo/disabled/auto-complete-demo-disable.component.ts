import { Component } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'd-auto-complete-demo-disable',
  templateUrl: './auto-complete-demo-disable.component.html'
})
export class AutoDemoDisableComponent {
  selectItem1: any;
  isDisabled = false;
  languages = ['C#', 'C', 'C++', 'CPython', 'Java', 'JavaScript', 'Go', 'Python', 'Ruby', 'F#', 'TypeScript', 'SQL',
    'LiveScript', 'CoffeeScript'];

  languages1 = [{name: 'c'}, {name: 'C++', disable: true}];

  onSearchLocal(term) {
    return of(this.languages.filter(lang => lang.toLowerCase().indexOf(term.toLowerCase()) !== -1));
  }

  formatter(item) {
    return item.name;
  }
}
