import { Component } from '@angular/core';

@Component({
    selector: 'd-lazy-load',
    templateUrl: './lazy-load.component.html',
    standalone: false
})
export class LazyLoadComponent {
  selectItem;
  count = 0;
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

  loadMore($event) {
    this.count = this.count + 1;
    this.languages = Object.assign([], [...this.languages, 'lazyLoadData' + this.count]);
    setTimeout(() => {
      $event.loadFinish();
    }, 2000);
  }
}
