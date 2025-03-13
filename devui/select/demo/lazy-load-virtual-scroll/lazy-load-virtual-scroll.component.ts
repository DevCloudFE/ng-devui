import { Component } from '@angular/core';

@Component({
    selector: 'd-lazy-load-virtual-scroll',
    templateUrl: './lazy-load-virtual-scroll.component.html',
    styleUrls: ['./lazy-load-virtual-scroll.component.scss'],
    standalone: false
})
export class LazyLoadVirtualScrollComponent {
  options = [
    'option 1',
    'option 2',
    'option 3',
    'option 4',
    'option 5',
    'option 6',
    'option 7',
    'option 8',
    'option 9',
    'option 10',
    'option 11',
    'option 12',
    'option 13',
    'option 14',
  ];
  options1 = [...this.options];

  constructor() {
    for (let i = 0; i < 1000; i++) {
      this.options.push('Test' + i);
    }
  }

  loadMore(data) {
    const moreData = ['async option 1', 'async option 2', 'async option 3', 'async option 4', 'async option 5'];
    setTimeout(() => {
      this.options1 = [...this.options1, ...moreData];
      data.instance.loadFinish();
    }, 1000);
  }
}
