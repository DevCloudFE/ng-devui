import { Component, Input, OnInit } from '@angular/core';
import { TransferDataFormat } from 'ng-devui/transfer';

export interface TabsDataFormat {
  tabId: string;
  id: number | string;
  name: string;
  value: any;
  disabled?: boolean;
  checked?: boolean;
}
@Component({
  templateUrl: './tabs-transfer.component.html'
})
export class TabsTransferComponent implements OnInit {

  @Input() data: any;
  sourceOption: Array<TransferDataFormat>;
  targetOption: Array<TransferDataFormat>;
  ngOnInit(): void {
    console.log(this.data);
    this.sourceOption = this.data.sourceOption;
    this.targetOption = this.data.targetOption;
  }
  transferToTarget($event) {
    this.sourceOption = $event.sourceOption;
    this.targetOption = $event.targetOption;
  }
  transferToSource($event) {
    this.targetOption = $event.targetOption;
    this.sourceOption = $event.sourceOption;
  }
  confirm() {
    this.data.callback(this.sourceOption, this.targetOption);
  }
}
