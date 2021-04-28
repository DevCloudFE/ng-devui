import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'ng-devui/button';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { TooltipModule } from 'ng-devui/tooltip';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { BasicComponent } from './basic/basic.component';
import { DelayComponent } from './delay/delay.component';
import { TooltipDemoComponent } from './tooltip-demo.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    TooltipModule,
    DevUICodeboxModule,
    ButtonModule,
    DevUIApiModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: TooltipDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
        'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
      }}
    ])
  ],
  exports: [TooltipDemoComponent],
  declarations: [
    TooltipDemoComponent,
    BasicComponent,
    DelayComponent
  ],

})
export class TooltipDemoModule {
}
