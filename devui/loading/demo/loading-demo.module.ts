import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { LoadingModule } from '../loading.module';
import { LoadingDemoComponent } from './loading-demo.component';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { BasicComponent } from './basic/basic.component';
import { CustomComponent } from './custom/custom.component';
import { PromiseComponent } from './promise/promise.component';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { SubscriptionComponent } from './subscription/subscription.component';
import { ButtonModule } from 'ng-devui/button';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { ShowLoadingComponent } from './show-loading/show-loading.component';

@NgModule({
  imports: [
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
        api: require('!html-loader!markdown-loader!../doc/api.md')
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
    ShowLoadingComponent
  ],
  entryComponents: [
    LoadingDemoComponent,
  ],
})
export class LoadingDemoModule {
}

