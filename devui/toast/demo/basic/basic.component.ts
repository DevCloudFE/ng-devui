import { Component } from '@angular/core';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html',
  styles: [`
    d-button {
      margin-right: 5px
    }
    :host ::ng-deep .devui-btn-success {
      background: #3dcca6;
      color: #fff;
    }
    :host ::ng-deep .devui-btn-warning {
      background: #fa9841;
      color: #fff;
    }
    :host ::ng-deep .devui-btn-danger {
      background: #f66f6a;
      color: #fff;
    }
  `]
})
export class BasicComponent {
  msgs: Array<Object> = [];

  showToast(type: any) {
    switch (type) {
      case 'link':
        this.msgs = [{ severity: 'info', summary: '相对地址', detail: `<a href="/home" target="_blank">返回首页</a>` },
        { severity: 'info', summary: '绝对地址', detail: `<a href="https://devui.design/home" target="_blank">返回首页</a>` }];
        break;
      case 'multiple':
        this.msgs = [{ severity: 'info', summary: '摘要', detail: '详细信息，测试换行，测试换行，测试换行，测试换行，测试换行' },
        { severity: 'info', summary: '摘要', detail: '详细信息，测试换行，测试换行，测试换行，测试换行，测试换行' }];
        break;
      default:
        this.msgs = [{ severity: type, summary: '摘要', detail: '详细信息，测试换行，测试换行，测试换行，测试换行，测试换行' }];
    }
  }

}
