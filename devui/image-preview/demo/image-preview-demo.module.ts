import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'ng-devui/button';
import { ImagePreviewModule } from 'ng-devui/image-preview';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { SafePipeModule } from 'ng-devui/utils';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'devui-commons/src/demo-nav/d-demo-nav.module';
import { BasicComponent } from './basic/basic.component';
import { CustomOpenComponent } from './custom-open/custom-open.component';
import { DImagePreviewDemoComponent } from './image-preview-demo.component';
import { ZIndexComponent } from './z-index/z-index.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    ImagePreviewModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DDemoNavModule,
    SafePipeModule,
    ButtonModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: DImagePreviewDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
        'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
      }}
    ])
  ],
  exports: [DImagePreviewDemoComponent],
  declarations: [
    DImagePreviewDemoComponent,
    BasicComponent,
    CustomOpenComponent,
    ZIndexComponent
  ],

})
export class ImagePreviewDemoModule { }
