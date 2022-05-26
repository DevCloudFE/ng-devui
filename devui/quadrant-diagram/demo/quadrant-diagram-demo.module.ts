import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DragDropModule } from 'ng-devui/dragdrop';
import { QuadrantDiagramModule } from 'ng-devui/quadrant-diagram';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'devui-commons/src/demo-nav/d-demo-nav.module';
import { BasicComponent } from './basic/basic.component';
import { ConfigComponent } from './config/config.component';
import { QuadrantDiagramDemoComponent } from './quadrant-diagram-demo.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DragDropModule,
    QuadrantDiagramModule,
    DDemoNavModule,
    TranslateModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo' },
      { path: 'demo', component: QuadrantDiagramDemoComponent },
      {
        path: 'api', component: DevUIApiComponent, data: {
          'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
          'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
        }
      }
    ])
  ],
  exports: [
    QuadrantDiagramDemoComponent
  ],
  declarations: [
    BasicComponent,
    QuadrantDiagramDemoComponent,
    ConfigComponent
  ]
})
export class QuadrantDiagramDemoModule { }
