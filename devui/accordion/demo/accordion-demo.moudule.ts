import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StickyModule } from '../../sticky';
import { AnchorModule } from '../../anchor';
import { AccordionModule } from '../accordion.module';
import { AccordionDemoComponent } from './accordion-demo.component';
import { BasicComponent } from './basic/basic.component';
import { LinkComponent } from './link/link.component';
import { TemplateComponent } from './template/template.component';
import { InnerListTemplateComponent } from './inner-list-template/inner-list-template.component';
import { MultiLevelComponent } from './multi-level/multi-level.component';
import { ChangeKeyComponent } from './change-key/change-key.component';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { ToggleModule } from 'ng-devui/toggle';

@NgModule({
  imports: [
    StickyModule,
    AnchorModule,
    CommonModule,
    AccordionModule,
    ToggleModule,
    FormsModule,
    DevUICodeboxModule,
    DevUIApiModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: AccordionDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md')
      }}
    ])
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
  entryComponents: [
  ]
})
export class AccordionDemoModule {
}
