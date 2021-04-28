import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'ng-devui/button';
import { PopoverModule } from 'ng-devui/popover';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { BasicComponent } from './basic/basic.component';
import { CustomizeTmpComponent } from './customize/customize.component';
import { HoverDelayTimeComponent } from './hover-delay-time/hover-delay-time.component';
import { ManualComponent } from './manual/manual.component';
import { PopoverDemoComponent } from './popover-demo.component';
import { PositionComponent } from './position/position.component';
import { ScrollElementComponent } from './scroll-element/scroll-element.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    PopoverModule,
    FormsModule,
    DevUICodeboxModule,
    DevUIApiModule,
    ButtonModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo' },
      { path: 'demo', component: PopoverDemoComponent },
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
  exports: [PopoverDemoComponent],
  declarations: [
    PopoverDemoComponent,
    BasicComponent,
    ManualComponent,
    PositionComponent,
    CustomizeTmpComponent,
    ScrollElementComponent,
    HoverDelayTimeComponent,
  ],

})
export class PopoverDemoModule {}
