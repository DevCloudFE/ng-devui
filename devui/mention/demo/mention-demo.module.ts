import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TextareaModule } from 'ng-devui';
import { AnchorModule } from 'ng-devui/anchor';
import { AvatarModule } from 'ng-devui/avatar';
import { ButtonModule } from 'ng-devui/button';
import { MentionModule } from 'ng-devui/mention';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'devui-commons/src/demo-nav/d-demo-nav.module';
import { AsyncComponent } from './async/async.component';
import { BasicComponent } from './basic/basic.component';
import { CustomComponent } from './custom/custom.component';
import { MentionDemoComponent } from './mention-demo.component';
import { PrefixComponent } from './prefix/prefix.component';
import { TargetComponent } from './target/target.component';
import { ToggleComponent } from './toggle/toggle.component';

@NgModule({
  imports: [
    CommonModule,
    AnchorModule,
    TranslateModule,
    DevUICodeboxModule,
    DDemoNavModule,
    DevUIApiModule,
    TextareaModule,
    MentionModule,
    AvatarModule,
    ButtonModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo', pathMatch: 'full' },
      { path: 'demo', component: MentionDemoComponent },
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
  declarations: [MentionDemoComponent, BasicComponent, AsyncComponent, CustomComponent, TargetComponent, PrefixComponent, ToggleComponent],
  exports: [MentionDemoComponent],
})
export class MentionDemoModule {}
