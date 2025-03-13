import { Component } from '@angular/core';

@Component({
    selector: 'd-mention-basic',
    templateUrl: './basic.component.html',
    standalone: false
})
export class BasicComponent {
  suggestions = [
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

  selectHandler(e) {
    console.log(e);
  }

  afterMentionInit(e) {
    console.log(e);
  }
}
