import { Component } from '@angular/core';

@Component({
  selector: 'd-mention-target',
  templateUrl: './target.component.html'
})
export class TargetComponent {

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

  mentionValue = '';

  editorRef = null;

  beforeShow;

  contentChange (e) {
    this.beforeShow(e);
  }

  afterEditorInit (e) {
    this.editorRef = e;
  }
}
