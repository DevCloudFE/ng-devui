import { Component, Input } from '@angular/core';

import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { DialogService } from '../dialog.service';
@Component({
  selector: 'd-modal-demo',
  templateUrl: './modal-demo.component.html',
  styleUrls: ['../../style/core/_nav.scss']
})
export class ModalDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')}
  ];
  customizeSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./customize/customize.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./customize/customize.component.ts')},
    {title: 'Custom Component HTML', language: 'xml', code:  require('!!raw-loader!./customize/modal-alert.component.html')},
    {title: 'Custom Component TS', language: 'typescript', code:  require('!!raw-loader!./customize/modal-alert.component.ts')},
    {title: 'Custom Component CSS', language: 'css', code:  require('!!raw-loader!./customize/modal-alert.component.css')}
  ];
  tipsSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./tips/tips.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./tips/tips.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./tips/tips.component.css')}
  ];
  hideSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./hide/hide.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./hide/hide.component.ts')}
  ];
  warningSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./warning/warning.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./warning/warning.component.ts')}
  ];
  autofocusSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./autofocus/autofocus.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./autofocus/autofocus.component.ts')}
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
  template: `<div (click)='onClick($event)'>
                    <div class="d-form-field">
                      <div class="d-form-label">
                        <div class="text" title="name" for="input-label">name:</div>
                      </div>
                      <div class="d-form-ctrl">
                        <div style="width: 70%">
                          <input type="text" class="d-form-text" autocomplete="off" maxlength="128">
                        </div>
                      </div>
                    </div>
                    <div class="d-form-field">
                      <div class="d-form-label">
                        <div class="text" title="age" for="input-label">age:</div>
                      </div>
                      <div class="d-form-ctrl">
                        <div style="width: 70%">
                          <input type="text" class="d-form-text" autocomplete="off" maxlength="128">
                        </div>
                      </div>
                    </div>
                    <div class="d-form-field">
                      <div class="d-form-label">
                        <div class="text" title="address" for="input-label">address:</div>
                      </div>
                      <div class="d-form-ctrl">
                        <div style="width: 70%">
                          <input type="text" class="d-form-text" autocomplete="off" maxlength="128">
                        </div>
                      </div>
                    </div>
               </div>`,
               styles: [
                `
                .d-form-field {
                  margin-bottom: 20px
                }
                .d-form-label {
                  float: left;
                  width: 105px;
                }
                .d-form-label .text {
                  float: left;
                  position: relative;
                  padding-left: 10px;
                  height: 32px;
                  line-height: 32px;
                  font-size: 14px;
                  text-align: right;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }
                .d-form-ctrl {
                  margin-left: 115px;
                }
                `
              ]
})
export class ModalFormComponent {
  constructor(private dialogService: DialogService) {
  }
  onClick($event) {

  }
}
