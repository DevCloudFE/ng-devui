import { Component, Input } from '@angular/core';
import { DialogService } from '../dialog.service';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
@Component({
  selector: 'd-modal-demo',
  templateUrl: './modal-demo.component.html'
})
export class ModalDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')}
  ];
  customizeSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./customize/customize.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./customize/customize.component.ts')}
  ];
  tipsSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./tips/tips.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./tips/tips.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./tips/tips.component.css')}
  ];
}

@Component({
  template: `<div (click)='onClick($event)'>
                    Modal Content
                    <div>name: {{data.name}}</div>
                    <div>age: {{data.age}}</div>
                    <div>address: {{data.address}}</div>
               </div>`,
})
export class ModalTestComponent {
  @Input() data: any;
  @Input() handler: Function;
  buttonsObj: any = 'id?: string; cssClass?: string; text: string; handler: ($event: Event) => void;';

  constructor(private dialogService: DialogService) {
  }

  close($event) {
    this.handler($event);
  }

  onClick(event) {
  }
}


@Component({
  selector: 'd-modal-alert',
  template: `<div>
              <div class="modal-body">
                  <div *ngIf="!!data.content">{{data.content}}</div>
              </div>
              <div class="modal-footer">
                  <d-button
                          (click)='close($event)'
                          bsStyle="stress"
                          circled="true"
                  >{{data.cancelBtnText}}
                  </d-button>
              </div>
            </div>`
})
export class ModalAlertComponent {
  @Input() data: any;

  close(event) {
    this.data.onClose(event);
  }
}
