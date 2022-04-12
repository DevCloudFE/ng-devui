import { Component } from '@angular/core';

@Component({
  selector: 'd-with-source',
  templateUrl: './with-source.component.html',
  styles: [
    `
      section {
        width: 50%;
      }
    `,
  ],
})
export class WithSourceComponent {
  selectItem1;
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

  toggleChange(event) {
    console.log('isOpen:', event);
  }
}
