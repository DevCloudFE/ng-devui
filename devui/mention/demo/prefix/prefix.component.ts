import { Component } from '@angular/core';
import { MentionOnSearchTypes } from 'ng-devui/mention/mention.types';

@Component({
  selector: 'd-mention-prefix',
  templateUrl: './prefix.component.html',
})
export class PrefixComponent {
  suggestions = [];
  prefixes = ['#', '!'];
  tags = ['1.0', '2.0', '3.0'];
  users = [
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

  searchChangeHandler({ value, trigger }: MentionOnSearchTypes) {
    this.suggestions = trigger === '#' ? this.users : this.tags;
  }
}
