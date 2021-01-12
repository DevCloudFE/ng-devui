import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { TextareaModule } from '../textarea.module';
import { BasicComponent } from './basic/basic.component';
import { ResizeComponent } from './resize/resize.component';
import { TextDemoComponent } from './text-demo.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    TextareaModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: TextDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
        'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
      }}
    ])
  ],
  exports: [TextDemoComponent],
  declarations: [
    TextDemoComponent,
    BasicComponent,
    ResizeComponent
  ],
  
})
export class TextDemoModule {
}
