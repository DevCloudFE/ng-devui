import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html',
})
export class BasicComponent implements OnInit {
  msgs: Array<Object> = [];
  constructor() { }

  ngOnInit() {
  }

  showToast(type) {
    if (type === 'multiple') {
      this.msgs = [{ severity: 'info', summary: '摘要', detail: '详细信息，测试换行，测试换行，测试换行，测试换行，测试换行' },
        { severity: 'info', summary: '摘要', detail: '详细信息，测试换行，测试换行，测试换行，测试换行，测试换行' }];
    } else {
      this.msgs = [{ severity: type, summary: '摘要', detail: '详细信息，测试换行，测试换行，测试换行，测试换行，测试换行' }];
    }
  }

}
