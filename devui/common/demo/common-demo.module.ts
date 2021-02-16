import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'ng-devui/button';
import { DataTableModule } from 'ng-devui/data-table';
import { I18nModule } from 'ng-devui/i18n';
import { LoadingModule } from 'ng-devui/loading';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { TextInputModule } from 'ng-devui/text-input';
import { LazyLoadModule } from 'ng-devui/utils';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { DCommonModule } from '../common.module';
import { ClipboardDemoComponent } from './clipboard/clipboard.component';
import { CommonDemoComponent } from './common-demo.component';
import { HelperDownloadDemoComponent } from './helper-download/helper-download.component';
import { HelperJumpDemoComponent } from './helper-jump/helper-jump.component';
import { IframPropagateDemoComponent } from './iframe-propagate/iframe-propagate.component';
import { LazyLoadComponent } from './lazy-load/lazy-load.component';
import { PipeDemoComponent } from './pipe/pipe.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ButtonModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DCommonModule,
    DDemoNavModule,
    LazyLoadModule,
    LoadingModule,
    I18nModule,
    DataTableModule,
    TextInputModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo' },
      { path: 'demo', component: CommonDemoComponent },
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
  exports: [CommonDemoComponent],
  declarations: [
    PipeDemoComponent,
    CommonDemoComponent,
    HelperJumpDemoComponent,
    HelperDownloadDemoComponent,
    IframPropagateDemoComponent,
    LazyLoadComponent,
    ClipboardDemoComponent,
  ],
})
export class CommonDemoModule {}
