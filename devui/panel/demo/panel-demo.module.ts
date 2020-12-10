import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { ButtonModule } from 'ng-devui/button';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';

import { PanelModule } from '../panel.module';
import { BasicComponent } from './basic/basic.component';
import { ConditionChangeComponent } from './condition-change/condition-change.component';
import { TypeComponent } from './type/type.component';
import { PanelDemoComponent } from './panel-demo.component';

@NgModule({
  imports: [
    ButtonModule,
    CommonModule,
    FormsModule,
    PanelModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: PanelDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md')
      }}
    ])
  ],
  exports: [PanelDemoComponent],
  declarations: [
    PanelDemoComponent,
    BasicComponent,
    ConditionChangeComponent,
    TypeComponent,
    PanelDemoComponent,
  ],
  
})
export class PanelDemoModule { }
