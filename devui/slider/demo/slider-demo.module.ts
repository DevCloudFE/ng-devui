import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SliderDemoComponent} from './slider-demo.component';
import {CommonModule} from '@angular/common';
import {SliderModule} from 'ng-devui/slider';
import {DevUICodeboxModule} from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import {DevUIApiModule} from 'ng-devui/shared/devui-api/devui-api.module';
import {DevUIApiComponent} from 'ng-devui/shared/devui-api/devui-api.component';
import {FormsModule} from '@angular/forms';
import {SliderDemoCustomFormatterComponent} from './custom-formatter/slider-demo-custom-formatter.component';
import {SliderDemoDisabledComponent} from './disabled/slider-demo-disabled.component';
import {SliderDemoBasicComponent} from './basic/slider-demo-basic.component';

@NgModule({
  imports: [
    CommonModule,
    DevUICodeboxModule,
    SliderModule,
    DevUIApiModule,
    FormsModule,
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
    SliderDemoBasicComponent,
    SliderDemoDisabledComponent,
    SliderDemoCustomFormatterComponent
  ],
})
export class SliderDemoModule {
}

