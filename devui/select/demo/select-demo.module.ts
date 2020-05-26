import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { SelectModule } from '../select.module';
import { SelectDemoComponent } from './select-demo.component';
import { ButtonModule } from 'ng-devui/button';

import { SelectBasicComponent } from './basic/select-basic.component';
import { CustomSearchComponent } from './custom-search/custom-search.component';
import { SelectTemplateComponent } from './item-template/select-template.component';
import { SelectAllComponent } from './select-all/select-all.component';
import { AllowClearValueComponent } from './allow-clear-value/allow-clear-value.component';
import { CustomAreaComponent } from './custom-area/custom-area.component';
import { CustomAreaDirectionComponent } from './custom-area-direction/custom-area-direction.component';
import { AppendToBodyComponent } from './append-to-body/append-to-body.component';
import { DisabledComponent } from './disabled/disabled.component';
import { LabelizationComponent } from './labelization/labelization.component';
import { ObjectFilterComponent } from './object-filter/object-filter.component';
import { LazyLoadVirtualScrollComponent } from './lazy-load-virtual-scroll/lazy-load-virtual-scroll.component';
import { LoadingComponent } from './loading/loading.component';
import { UserLimitSelectedNumberComponent } from './user-limit-selected-number/user-limit-selected-number.component';
import { MultiKeepOrderComponent } from './multi-keep-order/multi-keep-order.component';
import { UserSearchNLazyLoadComponent } from './user-search-n-lazyload/user-search-n-lazyload.component';
import { UserMailSearchComponent } from './user-mail-search/user-mail-search.component';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DevUICodeboxModule,
    DevUIApiModule,
    SelectModule,
    ButtonModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: SelectDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md')
      }}
    ])
  ],
  exports: [
    SelectDemoComponent
  ],
  declarations: [
    SelectDemoComponent,
    SelectBasicComponent,
    CustomSearchComponent,
    SelectAllComponent,
    SelectTemplateComponent,
    AllowClearValueComponent,
    CustomAreaComponent,
    CustomAreaDirectionComponent,
    AppendToBodyComponent,
    DisabledComponent,
    LabelizationComponent,
    ObjectFilterComponent,
    LazyLoadVirtualScrollComponent,
    LoadingComponent,
    UserLimitSelectedNumberComponent,
    MultiKeepOrderComponent,
    UserSearchNLazyLoadComponent,
    UserMailSearchComponent
  ],
  entryComponents: [
    SelectDemoComponent
  ],
  providers: [],
})
export class SelectDemoModule { }
