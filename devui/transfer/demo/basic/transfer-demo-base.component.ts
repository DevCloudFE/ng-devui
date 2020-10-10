import { Component } from '@angular/core';

@Component({
  selector: 'd-transfer-demo-base',
  templateUrl: './transfer-demo-base.component.html'
})
export class TransferDemoBaseComponent {
  disabled = false;
  sourceOption = [
    { name: '选项1（包含此选项禁止transfer）', value: 1, id: 1 },
    { name: '选项2', value: 2, id: 2 },
    { name: '选项3', value: 3, id: 3, disabled: true },
    { name: '选项4', value: 3, id: 4 },
    { name: '选项5', value: 3, id: 5 },
    { name: '选项6', value: 3, id: 6 },
    { name: '选项7', value: 3, id: 7 },
    { name: '选项8', value: 3, id: 8 },
    { name: '选项9', value: 3, id: 9 },
    { name: '选项10', value: 3, id: 10, disabled: true },
    { name: '选项11', value: 3, id: 11 },
    { name: '选项12', value: 3, id: 12 },
    { name: '选项13', value: 3, id: 13 },
    { name: '选项14', value: 3, id: 14 },
    { name: '选项15', value: 3, id: 15 },
    { name: '选项16', value: 3, id: 16 },
    { name: '选项17', value: 3, id: 17 },
    { name: '选项18', value: 3, id: 18 },
    { name: '选项19', value: 3, id: 19 },
  ];

  targetOption = [
    { name: '选项20', value: 5, id: 20 },
    { name: '选项21', value: 6, id: 21, disabled: true },
  ];

  transferToTarget(data: any) {
    console.log(data);
  }

  transferToSource(data: any) {
    console.log(data);
  }

  // 示例， 禁止选项1转移
  beforeTransfer(source, target) {
    return !source.find(t => t.id === 1).checked;
  }

  onChange(event: any) {
    this.disabled = event;
  }
}
