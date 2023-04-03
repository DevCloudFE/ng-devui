import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { TagsModule } from 'ng-devui/tags';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'devui-commons/src/demo-nav/d-demo-nav.module';
import { BasicComponent } from './basic/basic.component';
import { CustomComponent } from './custom/custom.component';
import { HideComponent } from './hide/hide.component';
import { TagsDemoComponent } from './tags-demo.component';
import { TagsDesignComponent } from './tags-design.component';

@NgModule({
  imports: [
    TagsModule,
    TranslateModule,
    CommonModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo', pathMatch: 'full' },
      {
        path: 'design',
        component: TagsDesignComponent,
      },
      { path: 'demo', component: TagsDemoComponent },
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
  exports: [TagsDemoComponent],
  declarations: [TagsDemoComponent, TagsDesignComponent, BasicComponent, CustomComponent, HideComponent],
})
export class TagsDemoModule {}
