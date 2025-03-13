import { Component } from '@angular/core';

@Component({
    selector: 'd-mention-target',
    templateUrl: './target.component.html',
    standalone: false
})
export class TargetComponent {
  mentionValue = '';
  editorRef = null;
  beforeShow: any;
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

  contentChange(e) {
    this.beforeShow(e);
  }

  afterEditorInit(e) {
    this.editorRef = e;
  }
}
