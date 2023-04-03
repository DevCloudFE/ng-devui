import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'ng-devui/avatar';
import { ButtonModule } from 'ng-devui/button';
import { CardModule } from 'ng-devui/card';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'devui-commons/src/demo-nav/d-demo-nav.module';
import { BasicComponent } from './basic/basic.component';
import { CardDemoComponent } from './card-demo.component';
import { CardDesignComponent } from './card-design.component';
import { CardInteractiveComponent } from './card-interactive/card-interactive.component';
import { CustomComponent } from './custom/custom.component';
import { WithMediaComponent } from './with-media/with-media.component';

@NgModule({
  declarations: [CardDemoComponent, BasicComponent, CustomComponent, WithMediaComponent, CardInteractiveComponent],
  imports: [
    TranslateModule,
    CommonModule,
    CardModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DDemoNavModule,
    AvatarModule,
    ButtonModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo', pathMatch: 'full' },
      {
        path: 'design',
        component: CardDesignComponent,
      },
      { path: 'demo', component: CardDemoComponent },
      { path: 'api', component: DevUIApiComponent, data: {
        'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
        'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
      }}
    ])
  ]
})
export class CardDemoModule { }
