import { Component } from '@angular/core';

@Component({
  selector: 'd-single',
  templateUrl: './single.component.html'
})
export class SingleComponent {
  msgs: Array<Object> = [];

  showToast() {
    this.msgs = [
      { life: 3000, summary: '普通', detail: '详细信息，测试换行，测试换行，测试换行，测试换行，测试换行' },
      { life: 6000, severity: 'info', summary: '摘要', detail: '详细信息，测试换行，测试换行，测试换行，测试换行，测试换行' },
      { severity: 'success', summary: '成功', detail: '详细信息，测试换行，测试换行，测试换行，测试换行，测试换行' },
      { severity: 'warn', summary: '警告', detail: '详细信息，测试换行，测试换行，测试换行，测试换行，测试换行' }
    ];
  }
}
