import { Component } from '@angular/core';

@Component({
  selector: 'd-transfer-demo-search',
  templateUrl: './transfer-demo-search.component.html'
})
export class TransferDemoSearchComponent {
  disabled = false;
  sourceOption = [
    { name: 'Option1', value: 1, id: 1, checked: false },
    { name: 'Option2', value: 2, id: 2, checked: false },
    { name: 'Option3', value: 3, id: 3, checked: false },
    { name: 'Option4', value: 3, id: 4, checked: false },
    { name: 'Option5', value: 3, id: 5, checked: false },
    { name: 'Option6', value: 3, id: 6, checked: false },
    { name: 'Option7', value: 3, id: 7, checked: false },
    { name: 'Option8', value: 3, id: 8, checked: false },
    { name: 'Option9', value: 3, id: 9, checked: false },
    { name: 'Option10', value: 3, id: 10, checked: false },
    { name: 'Option11', value: 3, id: 11, checked: false },
    { name: 'Option12', value: 3, id: 12, checked: false },
    { name: 'Option13', value: 3, id: 13, checked: false },
    { name: 'Option14', value: 3, id: 14, checked: false },
    { name: 'Option15', value: 3, id: 15, checked: false },
    { name: 'Option16', value: 3, id: 16, checked: false },
    { name: 'Option17', value: 3, id: 17, checked: false },
    { name: 'Option18', value: 3, id: 18, checked: false },
    { name: 'Option19', value: 3, id: 19, checked: false },
  ];

  onChange(event) {
    this.disabled = event;
  }
}
