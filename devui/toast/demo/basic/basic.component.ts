import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html',
  styles: [
    `
      d-button {
        margin-right: 5px;
      }
      :host ::ng-deep .devui-btn-success {
        background: #3dcca6 !important;
        color: #fff;
      }
      :host ::ng-deep .devui-btn-warning {
        background: #fa9841 !important;
        color: #fff;
      }
    `,
  ],
})
export class BasicComponent {
  @ViewChild('customTemplate') customTemplate: TemplateRef<any>;
  msgs: Array<Object> = [];

  showToast(type: any) {
    switch (type) {
      case 'link':
        this.msgs = [
          { severity: 'info', summary: '相对地址', detail: `<a href="/home" target="_blank">返回首页</a>` },
          { severity: 'info', summary: '绝对地址', content: this.customTemplate, myInfo: ' ng-devui 组件' },
        ];
        break;
      case 'multiple':
        this.msgs = [
          { severity: 'info', summary: '摘要', content: '详细信息，测试换行，测试换行，测试换行，测试换行，测试换行' },
          { severity: 'info', summary: '摘要', content: '详细信息，测试换行，测试换行，测试换行，测试换行，测试换行' },
        ];
        break;
      case 'noTitle':
        this.msgs = [{ severity: 'warn', content: '详细信息测试换行测试换行测试换行测试换行测试换行测试换行测试换行测试换行测试换行' }];
        break;
      case 'plainText':
        this.msgs = [{ severity: 'info', content: '数据内容：<id:gc5aa71bfd86943db9e3e8f34dc347a15><label:测试换行>' }];
        break;
      default:
        this.msgs = [{ severity: type, summary: '摘要', content: '详细信息，测试换行，测试换行，测试换行，测试换行，测试换行' }];
    }
  }
}
