import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StickyModule } from '../../sticky';
import { AnchorModule } from '../../anchor';
import { RadioModule } from '../radio.module';
import { RadioDemoComponent } from './radio-demo.component';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { BasicComponent } from './basic/basic.component';
import { DisabledComponent } from './disabled/disabled.component';
import { HorizontalComponent } from './horizontal/horizontal.component';
import { VerticalComponent } from './vertical/vertical.component';
import { CustomComponent } from './custom/custom.component';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';

@NgModule({
  imports: [
    DDemoNavModule,
    CommonModule,
    FormsModule,
    RadioModule,
    DevUICodeboxModule,
    DevUIApiModule,
    StickyModule,
    AnchorModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: RadioDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md')
      }}
    ])
  ],
  exports: [RadioDemoComponent],
  declarations: [
    RadioDemoComponent,
    BasicComponent,
    DisabledComponent,
    HorizontalComponent,
    VerticalComponent,
    CustomComponent,
  ],
  entryComponents: [
    RadioDemoComponent,
  ],
})
export class RadioDemoModule {
}

