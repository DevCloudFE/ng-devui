import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SliderDemoComponent} from './slider-demo.component';
import {CommonModule} from '@angular/common';
import {SliderModule} from 'ng-devui/slider';
import {DevUICodeboxModule} from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import {DevUIApiModule} from 'ng-devui/shared/devui-api/devui-api.module';
import {DevUIApiComponent} from 'ng-devui/shared/devui-api/devui-api.component';
import {FormsModule} from '@angular/forms';

import {SliderBasicComponent} from './basic/slider-basic.component';
import {SliderCustomFormatterComponent} from './custom-formatter/slider-custom-formatter.component';
import {SliderDisabledComponent} from './disabled/slider-disabled.component';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';

@NgModule({
  imports: [
    CommonModule,
    DevUICodeboxModule,
    SliderModule,
    DevUIApiModule,
    FormsModule,
    DDemoNavModule,
    RouterModule.forChild([
      {path: '', redirectTo: 'demo'},
      {path: 'demo', component: SliderDemoComponent},
      {
        path: 'api', component: DevUIApiComponent, data: {
          api: require('!html-loader!markdown-loader!../doc/api.md'),
        }
      }
    ])
  ],
  exports: [SliderDemoComponent],
  declarations: [
    SliderDemoComponent,
    SliderBasicComponent,
    SliderDisabledComponent,
    SliderCustomFormatterComponent
  ],
})
export class SliderDemoModule {
}

