import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormModule } from 'ng-devui';
import { ButtonModule } from 'ng-devui/button';
import { SelectModule } from 'ng-devui/select';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { AllowClearValueComponent } from './allow-clear-value/allow-clear-value.component';
import { AppendToBodyComponent } from './append-to-body/append-to-body.component';
import { SelectBasicComponent } from './basic/select-basic.component';
import { CustomAreaDirectionComponent } from './custom-area-direction/custom-area-direction.component';
import { CustomAreaComponent } from './custom-area/custom-area.component';
import { CustomSearchComponent } from './custom-search/custom-search.component';
import { DisabledComponent } from './disabled/disabled.component';
import { SelectTemplateComponent } from './item-template/select-template.component';
import { LabelizationComponent } from './labelization/labelization.component';
import { LazyLoadVirtualScrollComponent } from './lazy-load-virtual-scroll/lazy-load-virtual-scroll.component';
import { LoadingComponent } from './loading/loading.component';
import { MapToPipe } from './model-value/map-to.pipe';
import { ModelValueComponent } from './model-value/model-value.component';
import { ParseFromPipe } from './model-value/parse-from.pipe';
import { MultiKeepOrderComponent } from './multi-keep-order/multi-keep-order.component';
import { ObjectFilterComponent } from './object-filter/object-filter.component';
import { SelectAllComponent } from './select-all/select-all.component';
import { SelectDemoComponent } from './select-demo.component';
import { UserLimitSelectedNumberComponent } from './user-limit-selected-number/user-limit-selected-number.component';
import { UserMailSearchComponent } from './user-mail-search/user-mail-search.component';
import { UserSearchNLazyLoadComponent } from './user-search-n-lazyload/user-search-n-lazyload.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    FormModule,
    DevUICodeboxModule,
    DevUIApiModule,
    SelectModule,
    ButtonModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo' },
      { path: 'demo', component: SelectDemoComponent },
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
  exports: [SelectDemoComponent],
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
    UserMailSearchComponent,
    ModelValueComponent,
    MapToPipe,
    ParseFromPipe,
  ],

  providers: [],
})
export class SelectDemoModule {}
