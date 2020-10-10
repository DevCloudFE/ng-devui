import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'ng-devui/button';
import { StepsGuideModule } from 'ng-devui/steps-guide';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';

import { StepsGuideDemoComponent } from './steps-guide-demo.component';
import { BasicComponent } from './basic/basic.component';
import { CustomComponent } from './custom/custom.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    StepsGuideModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: StepsGuideDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md')
      }}
    ])
  ],
  exports: [StepsGuideDemoComponent, BasicComponent, CustomComponent],
  declarations: [StepsGuideDemoComponent, BasicComponent, CustomComponent]
})

export class StepsGuideDemoModule { }
