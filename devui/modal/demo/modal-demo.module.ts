import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ModalDemoComponent,
  ModalTestComponent,
  ModalAlertComponent
} from './modal-demo.component';
import { ModalModule } from '../modal.module';
import { ButtonModule } from 'ng-devui/button';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { BasicComponent } from './basic/basic.component';
import { CustomizeComponent } from './customize/customize.component';
import { TipsComponent } from './tips/tips.component';

@NgModule({
  imports: [
    CommonModule,
    ModalModule,
    ButtonModule,
    DevUICodeboxModule,
    DevUIApiModule,
    RouterModule.forChild([
    { path: '',  redirectTo: 'demo' },
    { path: 'demo', component: ModalDemoComponent},
    { path: 'api', component: DevUIApiComponent, data: {
      api: require('!html-loader!markdown-loader!../doc/api.md')
    }}
    ])
  ],
  declarations: [
    ModalDemoComponent,
    ModalTestComponent,
    ModalAlertComponent,
    BasicComponent,
    CustomizeComponent,
    TipsComponent
  ],
  entryComponents: [
    ModalDemoComponent,
    ModalTestComponent,
    ModalAlertComponent
  ]
})
export class ModalDemoModule {
}
