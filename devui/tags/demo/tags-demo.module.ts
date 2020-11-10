import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsModule } from '../tags.module';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';

import { TagsDemoComponent } from './tags-demo.component';
import { BasicComponent } from './basic/basic.component';
import { CustomComponent } from './custom/custom.component';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';

@NgModule({
  imports: [
    CommonModule,
    TagsModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: TagsDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md')
      }}
    ])
  ],
  exports: [TagsDemoComponent],
  declarations: [
    TagsDemoComponent,
    BasicComponent,
    CustomComponent,
  ],

})
export class TagsDemoModule {
}

