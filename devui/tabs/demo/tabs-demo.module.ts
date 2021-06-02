import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DropDownModule } from 'ng-devui/dropdown';
import { ModalModule } from 'ng-devui/modal';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { TabsModule } from 'ng-devui/tabs';
import { TransferModule } from 'ng-devui/transfer';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { BasicComponent } from './basic/basic.component';
import { CustomizeTmpComponent } from './before-change/before-change.component';
import { ConfigurableComponent } from './configurable-tabs/configurable-tabs.component';
import { TabsTransferComponent } from './configurable-tabs/tabs-transfer/tabs-transfer.component';
import { CustomComponent } from './custom/custom.component';
import { TabsDemoComponent } from './tabs-demo.component';
import { TypeOptionsComponent } from './type-options/type-options.component';
import { TypePillsComponent } from './type-pills/type-pills.component';
import { TypeSliderComponent } from './type-slider/type-slider.component';
import { TypeWrappedComponent } from './type-wrapped/type-wrapped.component';
import { WithoutContentComponent } from './without-content/without-content.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    TabsModule,
    DropDownModule,
    ModalModule,
    TransferModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: TabsDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
        'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
      }}
    ])
  ],
  exports: [TabsDemoComponent],
  declarations: [
    TabsDemoComponent,
    BasicComponent,
    WithoutContentComponent,
    CustomizeTmpComponent,
    ConfigurableComponent,
    TabsTransferComponent,
    CustomComponent,
    TypePillsComponent,
    TypeOptionsComponent,
    TypeSliderComponent,
    TypeWrappedComponent
  ],
  
})
export class TabsDemoModule {
}
