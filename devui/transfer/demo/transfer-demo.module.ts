import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DataTableModule } from 'ng-devui/data-table';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { ToggleModule } from 'ng-devui/toggle';
import { TransferModule } from 'ng-devui/transfer';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { TransferDemoBaseComponent } from './basic/transfer-demo-base.component';
import { TransferDemoCustomComponent } from './custom/transfer-demo-custom.component';
import { TransferDemoSearchComponent } from './search/transfer-demo-search.component';
import { TransferDemoSortComponent } from './sort/transfer-demo-sort.component';
import { TransferDemoComponent } from './transfer-demo.component';
import { TransferVirtualScrollComponent } from './virtual-scroll/transfer-virtual-scroll.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    TransferModule,
    DataTableModule,
    ToggleModule,
    DevUIApiModule,
    DevUICodeboxModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo' },
      { path: 'demo', component: TransferDemoComponent },
      { path: 'api', component: DevUIApiComponent, data: {
        'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
        'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
      }}
    ])
  ],
  exports: [TransferDemoComponent],
  declarations: [
    TransferDemoComponent,
    TransferDemoSearchComponent,
    TransferDemoBaseComponent,
    TransferDemoCustomComponent,
    TransferDemoSortComponent,
    TransferVirtualScrollComponent
  ]
})
export class TransferDemoModule { }
