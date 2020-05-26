import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuadrantDiagramDemoComponent } from './quadrant-diagram-demo.component';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { BasicComponent } from './basic/basic.component';
import { QuadrantDiagramModule } from '../quadrant-diagram.module';
import { DragDropModule } from 'ng-devui/dragdrop';
import { ConfigComponent } from './config/config.component';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DragDropModule,
    QuadrantDiagramModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo' },
      { path: 'demo', component: QuadrantDiagramDemoComponent },
      {
        path: 'api', component: DevUIApiComponent, data: {
          api: require('!html-loader!markdown-loader!../doc/api.md')
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
