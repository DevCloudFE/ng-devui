import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { AnchorModule } from '../anchor.module';
import { AnchorDemoComponent } from './anchor-demo.component';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { BasicComponent } from './basic/basic.component';
import { AsyncComponent } from './async/async.component';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { ButtonModule } from 'ng-devui/button';
import { StickyModule } from 'ng-devui/devui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    StickyModule,
    AnchorModule,
    DevUICodeboxModule,
    DevUIApiModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: AnchorDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md')
      }}
    ])
  ],
  exports: [AnchorDemoComponent],
  declarations: [
    AnchorDemoComponent,
    BasicComponent,
    AsyncComponent,
  ],
  entryComponents: [
    AnchorDemoComponent,
  ],
})
export class AnchorDemoModule {
}

