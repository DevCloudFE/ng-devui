import { Component, OnInit } from '@angular/core';
import { MentionOnSearchTypes } from 'ng-devui/mention/mention.types';

@Component({
  selector: 'd-mention-prefix',
  templateUrl: './prefix.component.html',
})
export class PrefixComponent implements OnInit {
  suggestions = [];

  prefixes = ['#', '!'];

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
  tags = ['1.0', '2.0', '3.0'];

  constructor() {}

  ngOnInit() {}

  searchChangeHandler({ value, trigger }: MentionOnSearchTypes) {
    this.suggestions = trigger === '#' ? this.users : this.tags;
  }
}
