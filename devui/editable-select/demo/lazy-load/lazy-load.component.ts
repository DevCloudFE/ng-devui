import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'd-lazy-load',
  templateUrl: './lazy-load.component.html',
  styles: [
    `
          section {
            width: 50%;
          }
        `
  ]
})
export class LazyLoadComponent implements OnInit {
  selectItem;
  count = 0;
  languages = ['C#', 'C', 'C++', 'CPython', 'Java', 'JavaScript', 'Go', 'Python', 'Ruby', 'F#', 'TypeScript', 'SQL',
    'LiveScript', 'CoffeeScript'];

  constructor() { }
  loadMore($event) {
    this.count = this.count + 1;
    this.languages = Object.assign([], [...this.languages, 'lazyLoadData' + this.count]);
    setTimeout(() => {
      $event.loadFinish();
    }, 2000);
  }
  ngOnInit() {
  }
}
