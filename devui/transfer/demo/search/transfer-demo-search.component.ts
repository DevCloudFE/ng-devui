import { Component } from '@angular/core';

@Component({
  selector: 'd-transfer-demo-search',
  template: `
    <section>
    <div style="width:700px; ">
      <d-transfer [disabled]="disabled" [sourceOption]="sourceOption" [isSearch]="true"
        [titles]="{source:'源标题', target:'目标标题'}">
      </d-transfer>
    </div>
    <br />
    禁用：<d-toggle (change)="onChange($event)"></d-toggle>
    </section>
  `
})
export class TransferDemoSearchComponent {
  disabled = false;
  sourceOption = [
    { name: '选项1', value: 1, id: 1, checked: false },
    { name: '选项2', value: 2, id: 2, checked: false },
    { name: '选项3', value: 3, id: 3, checked: false },
    { name: '选项4', value: 3, id: 4, checked: false },
    { name: '选项5', value: 3, id: 5, checked: false },
    { name: '选项6', value: 3, id: 6, checked: false },
    { name: '选项7', value: 3, id: 7, checked: false },
    { name: '选项8', value: 3, id: 8, checked: false },
    { name: '选项9', value: 3, id: 9, checked: false },
    { name: '选项10', value: 3, id: 10, checked: false },
    { name: '选项11', value: 3, id: 11, checked: false },
    { name: '选项12', value: 3, id: 12, checked: false },
    { name: '选项13', value: 3, id: 13, checked: false },
    { name: '选项14', value: 3, id: 14, checked: false },
    { name: '选项15', value: 3, id: 15, checked: false },
    { name: '选项16', value: 3, id: 16, checked: false },
    { name: '选项17', value: 3, id: 17, checked: false },
    { name: '选项18', value: 3, id: 18, checked: false },
    { name: '选项19', value: 3, id: 19, checked: false },
  ];

  onChange(event) {
    this.disabled = event;
  }
}
