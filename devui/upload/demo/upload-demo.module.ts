import { ButtonModule } from 'ng-devui/button';
import { UploadModule } from 'ng-devui/upload';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UploadDemoComponent } from './upload-demo.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule  } from '@angular/common/http';
import { DevUIModule } from 'ng-devui';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { BasicComponent } from './basic/basic.component';
import { MultiComponent } from './multi/multi.component';
import { CustomizeComponent } from './customize/customize.component';
import { UploadAutoComponent } from './auto/auto.component';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { DynamicUploadOptionsComponent } from './dynamic-upload-options/dynamic-upload-options.component';
import { CustomizeAreaUploadComponent } from './customize-area-upload/customize-area-upload.component';
import { ToastModule } from 'ng-devui/toast';
import { ProgressModule } from 'ng-devui/progress';

@NgModule({
  imports: [
    CommonModule,
    UploadModule,
    DevUIModule,
    DevUICodeboxModule,
    DevUIApiModule,
    FormsModule,
    HttpClientModule,
    ButtonModule,
    DDemoNavModule,
    ToastModule,
    ProgressModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: UploadDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md')
      }}
    ])
  ],
  exports: [UploadDemoComponent],
  declarations: [
    UploadDemoComponent,
    BasicComponent,
    MultiComponent,
    CustomizeComponent,
    UploadAutoComponent,
    DynamicUploadOptionsComponent,
    CustomizeAreaUploadComponent
  ],
  
  providers: [],
})
export class UploadDemoModule {
}
