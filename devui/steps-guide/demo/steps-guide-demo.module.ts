import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'ng-devui/button';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { StepsGuideModule } from 'ng-devui/steps-guide';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { BasicComponent } from './basic/basic.component';
import { CustomComponent } from './custom/custom.component';
import { PositionComponent } from './position/position.component';
import { StepsGuideDemoComponent } from './steps-guide-demo.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    ButtonModule,
    StepsGuideModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo' },
      { path: 'demo', component: StepsGuideDemoComponent },
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
  exports: [StepsGuideDemoComponent, BasicComponent, CustomComponent, PositionComponent],
  declarations: [StepsGuideDemoComponent, BasicComponent, CustomComponent, PositionComponent],
})
export class StepsGuideDemoModule {}
