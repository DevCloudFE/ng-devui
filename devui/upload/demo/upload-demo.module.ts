import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UploadModule } from '..';
import { UploadDemoComponent } from './upload-demo.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule  } from '@angular/common/http';
import { ButtonModule } from '../../button';
import { DevUIModule } from 'ng-devui/devui.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { BasicComponent } from './basic/basic.component';
import { MultiComponent } from './multi/multi.component';
import { CustomizeComponent } from './customize/customize.component';
import { UploadAutoComponent } from './auto/auto.component';
import { StickyModule } from '../../sticky';
import { AnchorModule } from '../../anchor';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';

@NgModule({
  imports: [
    DDemoNavModule,
    CommonModule,
    UploadModule,
    DevUIModule,
    DevUICodeboxModule,
    DevUIApiModule,
    FormsModule,
    HttpClientModule,
    ButtonModule,
    StickyModule,
    AnchorModule,
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
    UploadAutoComponent
  ],
  entryComponents: [UploadDemoComponent],
  providers: [],
})
export class UploadDemoModule {
}
