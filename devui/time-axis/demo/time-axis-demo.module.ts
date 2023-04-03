import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { TagsModule } from 'ng-devui/tags';
import { TimeAxisModule } from 'ng-devui/time-axis';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'devui-commons/src/demo-nav/d-demo-nav.module';
import { TimeAxisAllStatesComponent } from './all-states/time-axis-all-states.component';
import { AlternativeModeComponent } from './alternative-mode/alternative-mode.component';
import { CustomDotComponent } from './custom-dot/custom-dot.component';
import { TimeAxisDirectionComponent } from './direction/time-axis-direction.component';
import { TimeAxisHtmlContentComponent } from './html-content/time-axis-html-content.component';
import { SeperateWayComponent } from './seperate-way/seperate-way.component';
import { TimeAxisSingleComponent } from './single/single.component';
import { TimeAxisTemplateContentComponent } from './template-content/time-axis-template-content.component';
import { TimeAxisDemoComponent } from './time-axis-demo.component';
import { TimeAxisDesignComponent } from './time-axis-design.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    TimeAxisModule,
    TagsModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo', pathMatch: 'full' },
      {
        path: 'design',
        component: TimeAxisDesignComponent,
      },
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
    TimeAxisDesignComponent,
    TimeAxisAllStatesComponent,
    TimeAxisDirectionComponent,
    TimeAxisHtmlContentComponent,
    TimeAxisTemplateContentComponent,
    TimeAxisSingleComponent,
    AlternativeModeComponent,
    SeperateWayComponent,
    CustomDotComponent
  ],

  providers: [],
})
export class TimeAxisDemoModule {
}
