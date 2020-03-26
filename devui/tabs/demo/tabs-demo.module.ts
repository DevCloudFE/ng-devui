import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsModule } from '../tabs.module';
import { TabsDemoComponent } from './tabs-demo.component';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { BasicComponent } from './basic/basic.component';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { WithoutContentComponent } from './without-content/without-content.component';
import { CustomizeTmpComponent } from './before-change/before-change.component';
import { ConfigurableComponent } from './configurable-tabs/configurable-tabs.component';
import { TabsTransferComponent } from './configurable-tabs/tabs-transfer/tabs-transfer.component';
import { CustomComponent } from './custom/custom.component';
import { ConfigComponent } from './config/config.component';
import { TransferModule } from 'ng-devui/transfer';
import { DropDownModule } from 'ng-devui/dropdown';
import { ModalModule } from 'ng-devui/modal';
import { StickyModule } from '../../sticky';
import { AnchorModule } from '../../anchor';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';





@NgModule({
  imports: [
    DDemoNavModule,
    StickyModule,
    AnchorModule,
    CommonModule,
    TabsModule,
    DropDownModule,
    ModalModule,
    TransferModule,
    DevUICodeboxModule,
    DevUIApiModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: TabsDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md')
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
    ConfigComponent
  ],
  entryComponents: [
    TabsDemoComponent,
    TabsTransferComponent
  ],
})
export class TabsDemoModule {
}

