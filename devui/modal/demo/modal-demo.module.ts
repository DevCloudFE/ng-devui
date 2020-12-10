import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDemoComponent } from './modal-demo.component';
import { ModalAlertComponent } from './customize/modal-alert.component';
import { ModalModule } from '../modal.module';
import { ButtonModule } from 'ng-devui/button';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { BasicComponent } from './basic/basic.component';
import { CustomizeComponent } from './customize/customize.component';
import { TipsComponent } from './tips/tips.component';
import { HideComponent } from './hide/hide.component';
import { WarningComponent } from './warning/warning.component';
import { AutofocusComponent } from './autofocus/autofocus.component';
import { ModalTestComponent } from './basic/modal-test.component';
import { ModalFormComponent } from './hide/modal-form.component';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { TemplateComponent } from './template/template.component';
import { DialogContentComponent } from './template/dialog-content/dialog-content.component';
import { ModalContentComponent } from './template/modal-content/modal-content.component';
import { TextInputModule } from 'ng-devui/text-input';
import { BasicUpdateComponent } from './basic-update/basic-update.component';

@NgModule({
  imports: [
    CommonModule,
    ModalModule,
    ButtonModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DDemoNavModule,
    TextInputModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo' },
      { path: 'demo', component: ModalDemoComponent },
      {
        path: 'api', component: DevUIApiComponent, data: {
          api: require('!html-loader!markdown-loader!../doc/api.md')
        }
      }
    ])
  ],
  declarations: [
    ModalDemoComponent,
    ModalTestComponent,
    ModalAlertComponent,
    BasicComponent,
    CustomizeComponent,
    TipsComponent,
    HideComponent,
    ModalFormComponent,
    WarningComponent,
    AutofocusComponent,
    TemplateComponent,
    DialogContentComponent,
    ModalContentComponent,
    BasicUpdateComponent,
  ],
  
})
export class ModalDemoModule {
}
