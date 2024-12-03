import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormModule } from 'ng-devui/form';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { TextareaModule } from 'ng-devui/textarea';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'devui-commons/src/demo-nav/d-demo-nav.module';
import { BasicComponent } from './basic/basic.component';
import { CountComponent } from './count/count.component';
import { ResizeComponent } from './resize/resize.component';
import { TextDemoComponent } from './text-demo.component';
import { TextDesignComponent } from './text-design.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    TextareaModule,
    DevUICodeboxModule,
    DevUIApiModule,
    FormsModule,
    DDemoNavModule,
    FormModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo', pathMatch: 'full' },
      {
        path: 'design',
        component: TextDesignComponent,
      },
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
    TextDesignComponent,
    BasicComponent,
    ResizeComponent,
    CountComponent
  ],

})
export class TextDemoModule {
}
