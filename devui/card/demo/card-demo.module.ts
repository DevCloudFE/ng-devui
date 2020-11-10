import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDemoComponent } from './card-demo.component';
import { CardModule } from 'ng-devui/card';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { RouterModule } from '@angular/router';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { BasicComponent } from './basic/basic.component';
import { AvatarModule } from 'ng-devui/avatar';
import { ButtonModule } from 'ng-devui/button';
import { CustomComponent } from './custom/custom.component';
import { WithMediaComponent } from './with-media/with-media.component';



@NgModule({
  declarations: [CardDemoComponent, BasicComponent, CustomComponent, WithMediaComponent],
  imports: [
    CommonModule,
    CardModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DDemoNavModule,
    AvatarModule,
    ButtonModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo' },
      { path: 'demo', component: CardDemoComponent },
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md')
      }}
    ])
  ]
})
export class CardDemoModule { }
