import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'ng-devui/accordion';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { SplitterModule } from 'ng-devui/splitter';
import { TooltipModule } from 'ng-devui/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { SplitterDemoBasicComponent } from './basic/splitter-demo-basic.component';
import { SplitterDemoDirectionComponent } from './direction/splitter-demo-direction.component';
import { SplitterDemoMultiComponent } from './multi/splitter-demo-multi.component';
import { SplitterDemoMenuFoldComponent } from './shrink/shrink.component';
import { SplitterDemoComponent } from './splitter-demo.component';
import { SplitterDemoVerticalComponent } from './vertical/splitter-demo-vertical.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    DevUICodeboxModule,
    DevUIApiModule,
    SplitterModule,
    AccordionModule,
    FormsModule,
    TooltipModule,
    DDemoNavModule,
    RouterModule.forChild([
      {path: '', redirectTo: 'demo'},
      {path: 'demo', component: SplitterDemoComponent},
      {
        path: 'api', component: DevUIApiComponent, data: {
          'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
          'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
        }
      }
    ])
  ],
  exports: [SplitterDemoComponent],
  declarations: [
    SplitterDemoComponent,
    SplitterDemoBasicComponent,
    SplitterDemoVerticalComponent,
    SplitterDemoMultiComponent,
    SplitterDemoDirectionComponent,
    SplitterDemoMenuFoldComponent
  ],
})
export class SplitterDemoModule {
}
