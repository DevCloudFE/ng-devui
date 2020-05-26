import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SplitterModule } from 'ng-devui/splitter';
import { SplitterDemoComponent } from './splitter-demo.component';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { SplitterDemoBasicComponent } from './basic/splitter-demo-basic.component';
import { SplitterDemoVerticalComponent } from './vertical/splitter-demo-vertical.component';
import { SplitterDemoMultiComponent } from './multi/splitter-demo-multi.component';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { SplitterDemoDirectionComponent } from './direction/splitter-demo-direction.component';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';

@NgModule({
  imports: [
    CommonModule,
    DevUICodeboxModule,
    DevUIApiModule,
    SplitterModule,
    FormsModule,
    DDemoNavModule,
    RouterModule.forChild([
      {path: '', redirectTo: 'demo'},
      {path: 'demo', component: SplitterDemoComponent},
      {
        path: 'api', component: DevUIApiComponent, data: {
          api: require('!html-loader!markdown-loader!../doc/api.md'),
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
    SplitterDemoDirectionComponent
  ],
})
export class SplitterDemoModule {
}

