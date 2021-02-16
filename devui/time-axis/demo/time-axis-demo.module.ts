import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { TimeAxisModule } from '../time-axis.module';
import { TimeAxisAllStatesComponent } from './all-states/time-axis-all-states.component';
import { TimeAxisHtmlContentComponent } from './html-content/time-axis-html-content.component';
import { TimeAxisTemplateContentComponent } from './template-content/time-axis-template-content.component';
import { TimeAxisDemoComponent } from './time-axis-demo.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    TimeAxisModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: TimeAxisDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
        'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
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
