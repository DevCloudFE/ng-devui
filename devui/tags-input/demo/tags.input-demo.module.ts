import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'ng-devui/button';
import { PopoverModule } from 'ng-devui/popover';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { TagsInputModule } from 'ng-devui/tags-input';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'devui-commons/src/demo-nav/d-demo-nav.module';
import { TagsInputDemoAsyncComponent } from './async/async.component';
import { TagsInputDemoBasicComponent } from './basic/basic.component';
import { TagsInputDemoCustomizeComponent } from './customize/customize.component';
import { TagsInputDesignComponent } from './tags-input-design.component';
import { TagsInputDemoComponent } from './tags.input-demo.component';
import { TagsInputDemoVirtualScrollComponent } from './virtual-scroll/virtual-scroll.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    TagsInputModule,
    DevUIApiModule,
    DevUICodeboxModule,
    DDemoNavModule,
    ButtonModule,
    PopoverModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo', pathMatch: 'full' },
      {
        path: 'design',
        component: TagsInputDesignComponent,
      },
      { path: 'demo', component: TagsInputDemoComponent },
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
  exports: [],
  declarations: [
    TagsInputDemoComponent,
    TagsInputDesignComponent,
    TagsInputDemoBasicComponent,
    TagsInputDemoCustomizeComponent,
    TagsInputDemoAsyncComponent,
    TagsInputDemoVirtualScrollComponent,
  ],
})
export class TagsInputDemoModule {}
