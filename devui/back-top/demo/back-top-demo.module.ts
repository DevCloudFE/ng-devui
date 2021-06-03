import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BackTopModule } from 'ng-devui/back-top';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { ToggleModule } from 'ng-devui/toggle';
import { TooltipModule } from 'ng-devui/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { BackTopDemoComponent } from './back-top-demo.component';
import { BasicComponent } from './basic/basic.component';
import { CustomizeComponent } from './customize/customize.component';
import { ScrollContainerComponent } from './scroll-container/scroll-container.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    DevUIApiModule,
    DevUICodeboxModule,
    DDemoNavModule,
    TooltipModule,
    ToggleModule,
    BackTopModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: BackTopDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
        'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
      }}
    ])
  ],
  exports: [BackTopDemoComponent],
  declarations: [
    BackTopDemoComponent,
    BasicComponent,
    CustomizeComponent,
    ScrollContainerComponent
  ]
})

export class BackTopDemoModule {
}
