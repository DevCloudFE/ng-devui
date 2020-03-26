import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StickyModule } from '../../sticky';
import { AnchorModule } from '../../anchor';
import { StickyDemoComponent } from './sticky-demo.component';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { BasicComponent } from './basic/basic.component';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { ButtonModule } from 'ng-devui/button';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';

@NgModule({
  imports: [
    DDemoNavModule,
    AnchorModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    StickyModule,
    DevUICodeboxModule,
    DevUIApiModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: StickyDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md')
      }}
    ])
  ],
  exports: [StickyDemoComponent],
  declarations: [
    StickyDemoComponent,
    BasicComponent,
  ],
  entryComponents: [
    StickyDemoComponent,
  ],
})
export class StickyDemoModule {
}

