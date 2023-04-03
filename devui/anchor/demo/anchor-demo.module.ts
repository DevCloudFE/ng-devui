import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AnchorModule } from 'ng-devui/anchor';
import { ButtonModule } from 'ng-devui/button';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { StickyModule } from 'ng-devui/sticky';
import { ToggleModule } from 'ng-devui/toggle';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'devui-commons/src/demo-nav/d-demo-nav.module';
import { AnchorDemoComponent } from './anchor-demo.component';
import { AnchorDesignComponent } from './anchor-design.component';
import { AsyncComponent } from './async/async.component';
import { BasicComponent } from './basic/basic.component';
import { HashComponent } from './hash/hash.component';
import { ScrollTargetComponent } from './scroll-target/scroll-target.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    ToggleModule,
    StickyModule,
    AnchorModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo', pathMatch: 'full' },
      {
        path: 'design',
        component: AnchorDesignComponent,
      },
      { path: 'demo', component: AnchorDemoComponent },
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
  exports: [AnchorDemoComponent],
  declarations: [AnchorDemoComponent, AnchorDesignComponent, BasicComponent, AsyncComponent, HashComponent, ScrollTargetComponent],

})
export class AnchorDemoModule {}
