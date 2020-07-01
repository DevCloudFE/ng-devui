import { Component } from '@angular/core';

@Component({
  selector: 'd-auto-complete-demo-lazy-load',
  templateUrl: './auto-complete-demo-lazy-load.component.html',
})
export class AutoDemoLazyLoadComponent {
  languages = ['C#', 'C', 'C++', 'CPython', 'Java', 'JavaScript', 'Go', 'Python', 'Ruby', 'F#', 'TypeScript', 'SQL',
    'LiveScript', 'CoffeeScript'];

  loadMore($event) {
    this.languages = [...this.languages, 'c', 'c++'];
    setTimeout(() => {
      $event.loadFinish();
    }, 300);
  }

  valueParser($event) {
    return $event + '123';
  }

  selectValue($event) {
    console.log($event);
  }

  focus($event) {
    console.log($event);
  }
}
