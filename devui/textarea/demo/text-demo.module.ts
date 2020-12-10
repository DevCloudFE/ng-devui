import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextareaModule } from '../textarea.module';
import { TextDemoComponent } from './text-demo.component';
import { BasicComponent } from './basic/basic.component';
import { ResizeComponent } from './resize/resize.component';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';


@NgModule({
  imports: [
    CommonModule,
    TextareaModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: TextDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md')
      }}
    ])
  ],
  exports: [TextDemoComponent],
  declarations: [
    TextDemoComponent,
    BasicComponent,
    ResizeComponent
  ],
  
})
export class TextDemoModule {
}

