import { Component } from '@angular/core';

@Component({
  selector: 'd-custom-area-direction',
  templateUrl: './custom-area-direction.component.html',
  styleUrls: ['./custom-area-direction.component.scss'],
})
export class CustomAreaDirectionComponent {
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
  recently = ['Option 1', 'Option 9', 'Option 12'];

  chooseRecent(e, index, choose) {
    e.stopPropagation();
    choose(this.recently[index], this.options.indexOf(this.recently[index]));
  }
}
