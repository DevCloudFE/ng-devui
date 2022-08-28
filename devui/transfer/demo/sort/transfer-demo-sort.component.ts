import { Component } from '@angular/core';
import { TransferDataFormat } from 'ng-devui/transfer';

@Component({
  selector: 'd-transfer-demo-sort',
  templateUrl: './transfer-demo-sort.component.html'
})
export class TransferDemoSortComponent {
  disabled = false;
  sourceOption = [
    { name: 'Option1', value: 1, id: 1 },
    { name: 'Option2', value: 2, id: 2 },
    { name: 'Option3', value: 3, id: 3, disabled: true },
    { name: 'Option4', value: 3, id: 4 },
    { name: 'Option5', value: 3, id: 5 },
    { name: 'Option6', value: 3, id: 6 },
    { name: 'Option7', value: 3, id: 7 },
    { name: 'Option8', value: 3, id: 8 },
    { name: 'Option9', value: 3, id: 9 },
    { name: 'Option10', value: 3, id: 10, disabled: true },
  ];

  targetOption: TransferDataFormat[] = [
    { name: 'Option11', value: 3, id: 11 },
    { name: 'Option12', value: 3, id: 12 },
    { name: 'Option13', value: 3, id: 13 },
    { name: 'Option14', value: 3, id: 14 },
    { name: 'Option15', value: 3, id: 15 },
    { name: 'Option16', value: 3, id: 16 },
    { name: 'Option17', value: 3, id: 17 },
    { name: 'Option18', value: 3, id: 18 },
    { name: 'Option19', value: 3, id: 19 },
    { name: 'Option20', value: 5, id: 20 },
    { name: 'Option21', value: 6, id: 21, disabled: true },
  ];

  transferToTarget(data: any) {
    console.log(data);
  }

  transferToSource(data: any) {
    console.log(data);
  }

  onChange(event: any) {
    this.disabled = event;
  }
}
