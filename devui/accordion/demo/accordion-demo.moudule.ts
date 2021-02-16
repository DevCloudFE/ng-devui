import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { ToggleModule } from 'ng-devui/toggle';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { AccordionModule } from '../accordion.module';
import { AccordionDemoComponent } from './accordion-demo.component';
import { BasicComponent } from './basic/basic.component';
import { ChangeKeyComponent } from './change-key/change-key.component';
import { InnerListTemplateComponent } from './inner-list-template/inner-list-template.component';
import { LinkComponent } from './link/link.component';
import { MultiLevelComponent } from './multi-level/multi-level.component';
import { TemplateComponent } from './template/template.component';

@NgModule({
  imports: [
    DDemoNavModule,
    CommonModule,
    TranslateModule,
    AccordionModule,
    ToggleModule,
    FormsModule,
    DevUICodeboxModule,
    DevUIApiModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo' },
      { path: 'demo', component: AccordionDemoComponent },
      {
        path: 'api',
        component: DevUIApiComponent,
        data: {
          'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
          'en-us': require('!html-loader!markdown-loader!../doc/api-en.md'),
        },
      },
    ]),
  ],
  exports: [],
  declarations: [
    AccordionDemoComponent,
    BasicComponent,
    LinkComponent,
    TemplateComponent,
    InnerListTemplateComponent,
    MultiLevelComponent,
    ChangeKeyComponent,
  ],
  providers: [],
  
})
export class AccordionDemoModule {}
