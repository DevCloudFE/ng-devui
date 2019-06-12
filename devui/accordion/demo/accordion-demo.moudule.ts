import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AccordionModule } from '../accordion.module';
import { AccordionDemoComponent } from './accordion-demo.component';
import { AccordionDemoBasicComponent } from './basic/accordion-demo-basic.component';
import { AccordionDemoLinkComponent } from './link/accordion-demo-link.component';
import { AccordionDemoTemplateComponent } from './template/accordion-demo-template.component';
import { AccordionDemoInnerListTemplateComponent } from './inner-list-template/accordion-demo-inner-list-template.component';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';

@NgModule({
  imports: [
    CommonModule,
    AccordionModule,
    // ToggleModule,
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
    AccordionDemoBasicComponent,
    AccordionDemoLinkComponent,
    AccordionDemoTemplateComponent,
    AccordionDemoInnerListTemplateComponent
  ],
  providers: [],
  entryComponents: [
  ]
})
export class AccordionDemoModule {
}
