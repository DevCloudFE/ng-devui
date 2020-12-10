import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { TimeAxisDemoComponent } from './time-axis-demo.component';
import { CommonModule } from '@angular/common';

import { TimeAxisModule } from '../time-axis.module';
import { TimeAxisAllStatesComponent } from './all-states/time-axis-all-states.component';
import { TimeAxisHtmlContentComponent } from './html-content/time-axis-html-content.component';
import { TimeAxisTemplateContentComponent } from './template-content/time-axis-template-content.component';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
@NgModule({
  imports: [
    CommonModule,
    TimeAxisModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: TimeAxisDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md')
      }}
    ])
  ],
  exports: [TimeAxisDemoComponent],
  declarations: [
      TimeAxisDemoComponent,
      TimeAxisAllStatesComponent,
      TimeAxisHtmlContentComponent,
      TimeAxisTemplateContentComponent
      ],
  
  providers: [],
})
export class TimeAxisDemoModule {
}
