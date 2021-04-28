import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'ng-devui/button';
import { LoadingModule } from 'ng-devui/loading';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { BasicComponent } from './basic/basic.component';
import { CustomComponent } from './custom/custom.component';
import { FullScreenComponent } from './full-screen/full-screen.component';
import { LoadingDemoComponent } from './loading-demo.component';
import { PromiseComponent } from './promise/promise.component';
import { ShowLoadingComponent } from './show-loading/show-loading.component';
import { SubscriptionComponent } from './subscription/subscription.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    LoadingModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: LoadingDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
        'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
      }}
    ])
  ],
  exports: [LoadingDemoComponent],
  declarations: [
    LoadingDemoComponent,
    BasicComponent,
    CustomComponent,
    PromiseComponent,
    SubscriptionComponent,
    ShowLoadingComponent,
    FullScreenComponent
  ],

})
export class LoadingDemoModule {
}
