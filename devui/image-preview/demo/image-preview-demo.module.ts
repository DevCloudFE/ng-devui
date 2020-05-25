import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { SafePipeModule } from 'ng-devui/utils';
import { ButtonModule } from 'ng-devui/button';

import { ImagePreviewModule } from '../image-preview.module';
import { DImagePreviewDemoComponent } from './image-preview-demo.component';

import { BasicComponent } from './basic/basic.component';
import { CustomOpenComponent } from './custom-open/custom-open.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ImagePreviewModule,
    DevUICodeboxModule,
    DevUIApiModule,
    SafePipeModule,
    ButtonModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: DImagePreviewDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md')
      }}
    ])
  ],
  exports: [DImagePreviewDemoComponent],
  declarations: [
    DImagePreviewDemoComponent,
    BasicComponent,
    CustomOpenComponent
  ],
  entryComponents: [
    DImagePreviewDemoComponent,
  ],
})
export class ImagePreviewDemoModule { }
