import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RateModule } from 'ng-devui/rate';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { RateDemoBasicComponent } from './basic/basic.component';
import { RateDemoCustomizeComponent } from './customize/customize.component';
import { RateHalfComponent } from './half/rate-half.component';
import { RateDemoOnlyReadComponent } from './onlyread/onlyread.component';
import { RateDemoComponent } from './rate-demo.component';
import { TypeComponent } from './type/type.component';

@NgModule({
  imports: [
    TranslateModule,
    FormsModule,
    CommonModule,
    RateModule,
    DevUIApiModule,
    DevUICodeboxModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo' },
      { path: 'demo', component: RateDemoComponent },
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
  exports: [RateDemoComponent],
  declarations: [
    RateDemoComponent,
    RateDemoBasicComponent,
    RateDemoOnlyReadComponent,
    RateDemoCustomizeComponent,
    TypeComponent,
    RateHalfComponent,
  ],

})
export class RateDemoModule {}
