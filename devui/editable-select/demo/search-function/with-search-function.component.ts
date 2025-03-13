import { Component } from '@angular/core';
import { of } from 'rxjs';

@Component({
    selector: 'd-with-search-function',
    templateUrl: './with-search-function.component.html',
    standalone: false
})
export class WithSearchFunctionComponent {
  selectItem: any;
  languages = [
    'C#',
    'C',
    'C++',
    'CPython',
    'Java',
    'JavaScript',
    'Go',
    'Python',
    'Ruby',
    'F#',
    'TypeScript',
    'SQL',
    'LiveScript',
    'CoffeeScript',
  ];

  onSearchLocal = (term) => of(this.languages.filter((lang) => lang.toLowerCase().indexOf(term.toLowerCase()) !== -1));
}
