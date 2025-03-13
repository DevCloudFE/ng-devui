import { Component } from '@angular/core';

@Component({
    selector: 'd-with-source',
    templateUrl: './with-source.component.html',
    standalone: false
})
export class WithSourceComponent {
  associationListLang = 'Python';
  fullListLang = 'TypeScript';
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

  selectItem(event) {
    console.log('select:', event);
  }

  toggleChange(event) {
    console.log('isOpen:', event);
  }
}
