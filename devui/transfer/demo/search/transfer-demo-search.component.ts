import { Component } from '@angular/core';
import { TransferDirection } from 'ng-devui';

@Component({
  selector: 'd-transfer-demo-search',
  templateUrl: './transfer-demo-search.component.html',
  styleUrls: ['./transfer-demo-search.component.scss']
})
export class TransferDemoSearchComponent {
  disabled = false;
  sourceOption1 = [
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
  sourceOption2 = [
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
  targetOption2 = [
    { name: 'Option20', value: 3, id: 20, checked: false },
    { name: 'Option21', value: 3, id: 21, checked: false },
    { name: 'Option22', value: 3, id: 22, checked: false }
  ];
  sourceOptionCopy2 = [...this.sourceOption2];
  targetOptionCopy2 = [...this.targetOption2];

  onChange(event) {
    this.disabled = event;
  }

  afterTransfer(event) {
    console.log(event);
    console.log(TransferDirection[event]);
  }

  search(event) {
    if (!event.keyword) {
      this[`${TransferDirection[event.direction].toLocaleLowerCase()}Option2`] =
        [...this[`${TransferDirection[event.direction].toLocaleLowerCase()}OptionCopy2`]];
    } else {
      this[`${TransferDirection[event.direction].toLocaleLowerCase()}Option2`] =
        this[`${TransferDirection[event.direction].toLocaleLowerCase()}OptionCopy2`].filter(item => {
          return item.name.match(event.keyword) !== null;
        });
    }
  }

  transfer(event) {
    const currentCheck = this[`${TransferDirection[1 - event].toLocaleLowerCase()}Option2`].filter(item => item.checked);
    this[`${TransferDirection[1 - event].toLocaleLowerCase()}Option2`] =
      this[`${TransferDirection[1 - event].toLocaleLowerCase()}Option2`].filter(item => !currentCheck.some(cur => cur.id === item.id));
    this[`${TransferDirection[1 - event].toLocaleLowerCase()}OptionCopy2`] =
      this[`${TransferDirection[1 - event].toLocaleLowerCase()}OptionCopy2`].filter(item => !currentCheck.some(cur => cur.id === item.id));

    currentCheck.forEach(item => {item.checked = false;});
    this[`${TransferDirection[event].toLocaleLowerCase()}Option2`] =
      this[`${TransferDirection[event].toLocaleLowerCase()}Option2`].concat(currentCheck);
    this[`${TransferDirection[event].toLocaleLowerCase()}OptionCopy2`] =
      this[`${TransferDirection[event].toLocaleLowerCase()}OptionCopy2`].concat(currentCheck);
  }
}
