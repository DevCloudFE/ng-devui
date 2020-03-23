import { Component, Input, OnInit } from '@angular/core';


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
    sourceOption: Array<TabsDataFormat>;
    targetOption: Array<TabsDataFormat>;
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
