import { Component } from '@angular/core';

@Component({
  selector: 'd-mention-basic',
  templateUrl: './basic.component.html',
})
export class BasicComponent {
  suggestions = [
    'C#',
    'C',
    'C++',
    'Python',
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

  afterMentionInit (e) {
    console.log(e);
  }
}
