import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverModule } from '../popover.module';
import { FormsModule } from '@angular/forms';


import { PopoverDemoComponent } from './popover-demo.component';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { BasicComponent } from './basic/basic.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { ManualComponent } from './manual/manual.component';
import { CustomizeTmpComponent } from './customize/customize.component';
import { ScrollElementComponent } from './scroll-element/scroll-element.component';
import { HoverDelayTimeComponent } from './hover-delay-time/hover-delay-time.component';
import { ButtonModule } from 'ng-devui/button';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
@NgModule({
  imports: [
    CommonModule,
    PopoverModule,
    FormsModule,
    DevUICodeboxModule,
    DevUIApiModule,
    ButtonModule,
    DDemoNavModule,
    RouterModule.forChild([
    { path: '',  redirectTo: 'demo' },
    { path: 'demo', component: PopoverDemoComponent},
    { path: 'api', component: DevUIApiComponent, data: {
      api: require('!html-loader!markdown-loader!../doc/api.md')
    }}
    ])
  ],
  exports: [PopoverDemoComponent],
  declarations: [
    PopoverDemoComponent,
    BasicComponent,
    ManualComponent,
    CustomizeTmpComponent,
    ScrollElementComponent,
    HoverDelayTimeComponent
  ],

})
export class PopoverDemoModule {
}

