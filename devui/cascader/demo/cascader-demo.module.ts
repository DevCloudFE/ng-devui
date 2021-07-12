import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'ng-devui/button';
import { CascaderModule } from 'ng-devui/cascader';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { TabsModule } from 'ng-devui/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { BasicComponent } from './basic/basic.component';
import { CascaderDemoComponent } from './cascader-demo.component';
import { CascaderHeaderTemplateComponent } from './header-template/cascader-header-template.component';
import { LazyloadCascaderComponent } from './lazyload-cascader/lazyload-cascader.component';
import { MultipleCascaderComponent } from './multiple-cascader/multiple-cascader.component';
import { ParentSelectCascaderComponent } from './parent-select-cascader/parent-select-cascader.component';
import { SearchCascaderComponent } from './search-cascader/search-cascader.component';
import { TemplateCascaderComponent } from './template-cascader/template-cascader.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    DevUICodeboxModule,
    DevUIApiModule,
    CascaderModule,
    FormsModule,
    DDemoNavModule,
    ButtonModule,
    TabsModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo' },
      { path: 'demo', component: CascaderDemoComponent },
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
  exports: [],
  declarations: [
    BasicComponent,
    CascaderDemoComponent,
    MultipleCascaderComponent,
    SearchCascaderComponent,
    TemplateCascaderComponent,
    LazyloadCascaderComponent,
    ParentSelectCascaderComponent,
    CascaderHeaderTemplateComponent,
  ],
})
export class CascaderDemoModule {}
