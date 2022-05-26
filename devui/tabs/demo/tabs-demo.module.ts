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
import { DDemoNavModule } from 'devui-commons/src/demo-nav/d-demo-nav.module';
import { AddDeleteComponent } from './add-delete/add-delete.component';
import { BasicComponent } from './basic/basic.component';
import { CustomizeTmpComponent } from './before-change/before-change.component';
import { BigDataComponent } from './big-data/big-data.component';
import { CustomComponent } from './custom/custom.component';
import { SizeComponent } from './size/size.component';
import { TabsDemoComponent } from './tabs-demo.component';
import { TypeOptionsComponent } from './type-options/type-options.component';
import { TypePillsComponent } from './type-pills/type-pills.component';
import { TypeSliderComponent } from './type-slider/type-slider.component';
import { TypeWrappedComponent } from './type-wrapped/type-wrapped.component';
import { WithoutContentComponent } from './without-content/without-content.component';

@NgModule({
  imports: [
    CommonModule,
    DDemoNavModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DropDownModule,
    ModalModule,
    TabsModule,
    TransferModule,
    TranslateModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo' },
      { path: 'demo', component: TabsDemoComponent },
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
  exports: [TabsDemoComponent],
  declarations: [
    AddDeleteComponent,
    BasicComponent,
    BigDataComponent,
    CustomComponent,
    CustomizeTmpComponent,
    SizeComponent,
    TabsDemoComponent,
    TypePillsComponent,
    TypeOptionsComponent,
    TypeSliderComponent,
    TypeWrappedComponent,
    WithoutContentComponent,
  ],
})
export class TabsDemoModule {}
