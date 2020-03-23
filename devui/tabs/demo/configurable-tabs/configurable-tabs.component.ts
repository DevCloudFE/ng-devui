import { Component, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { DialogService } from 'ng-devui/modal/dialog.service';
import { TabsTransferComponent } from './tabs-transfer/tabs-transfer.component';
@Component({
    selector: 'd-configurable',
    templateUrl: './configurable-tabs.component.html',
    styleUrls: ['./configurable-tabs.component.scss']
})
export class ConfigurableComponent {
    tabActiveId = 1;
    tabsDisplay = [{
        id: 1,
        name: 'Tab1',
        content: '这是Tab1的内容'
    },
    {
        id: 2,
        name: 'Tab2',
        content: '这是Tab2的内容'
    },
    {
        id: 3,
        name: 'Tab3',
        content: '这是Tab3的内容'
    }];
    tabsHidden = [{
        id: 4,
        name: 'Tab4',
        content: '这是Tab4的内容'
    },
    {
        id: 5,
        name: 'Tab5',
        content: '这是Tab5的内容'
    },
    {
        id: 6,
        name: 'Tab6',
        content: '这是Tab6的内容'
    }];
    leftOffset = 202;



    constructor(private dialogService: DialogService, private el: ElementRef, private changeRef: ChangeDetectorRef) {
    }
    getLeftOffset() {
        this.leftOffset = 0;
        this.el.nativeElement.querySelectorAll('.tab-configurable').forEach(element => {
            this.leftOffset += element.offsetWidth + 35;
        });
    }
    selectForConfigTab(id) {
        this.tabActiveId = id;
    }
    openTransferDialog(dialogtype?: string) {
        const results = this.dialogService.open({
            id: 'tabs-dialog',
            width: '800px',
            maxHeight: '600px',
            showAnimate: false,
            title: 'Tabs显示配置',
            content: TabsTransferComponent,
            backdropCloseable: true,
            dialogtype: dialogtype,
            buttons: [
                {
                    cssClass: 'stress',
                    text: '确定',
                    handler: ($event: Event) => {
                        this.tabsDisplay = results.modalContentInstance.targetOption;
                        this.tabsHidden = results.modalContentInstance.sourceOption;
                        this.changeRef.detectChanges();
                        results.modalInstance.hide();
                        this.getLeftOffset();
                    },

                },
            ],
            data: {
                sourceOption: this.tabsHidden ? this.tabsHidden : [],
                targetOption: this.tabsDisplay ? this.tabsDisplay : [],
            }
        });
    }
}
