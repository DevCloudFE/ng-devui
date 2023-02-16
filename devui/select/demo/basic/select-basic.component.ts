import { Component } from '@angular/core';

@Component({
  selector: 'd-select-basic',
  templateUrl: './select-basic.component.html',
})
export class SelectBasicComponent {
  options = [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Option 5',
    'Option 6',
    'Option 7',
    'Option 8',
    'Option 9',
    'Option 0',
    'Option 11',
    'Option 12',
    'Option 13',
    'Option 14',
  ];

  constructor() {
    for (let i = 0; i < 100; i++) {
      this.options.push('new option' + i);
    }
  }

  loadMore(data) {
    const moreData = ['async option 1', 'async option 2', 'async option 3', 'async option 4', 'async option 5'];
    setTimeout(() => {
      this.options = [...this.options, ...moreData];
      data.instance.loadFinish();
    }, 1000);
  }
}
