import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AlertModule } from 'ng-devui/alert';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'devui-commons/src/demo-nav/d-demo-nav.module';
import { AlertDemoComponent } from './alert-demo.component';
import { AlertDesignComponent } from './alert-design.component';
import { BasicComponent } from './basic/basic.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CloseComponent } from './close/close.component';
import { WithoutIconComponent } from './withoutIcon/withoutIcon.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    AlertModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo', pathMatch: 'full' },
      {
        path: 'design',
        component: AlertDesignComponent,
      },
      { path: 'demo', component: AlertDemoComponent },
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
  exports: [AlertDemoComponent],
  declarations: [AlertDemoComponent, AlertDesignComponent, BasicComponent, CloseComponent, WithoutIconComponent, CarouselComponent],
})
export class AlertDemoModule {}
