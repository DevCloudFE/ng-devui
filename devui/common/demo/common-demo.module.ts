import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { RouterModule } from '@angular/router';
import { CommonDemoComponent } from './common-demo.component';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { FormsModule } from '@angular/forms';
import { PipeDemoComponent } from './pipe/pipe.component';
import { DCommonModule } from '../common.module';
import { ButtonModule } from 'ng-devui/button';
import { HelperJumpDemoComponent } from './helper-jump/helper-jump.component';
import { HelperDownloadDemoComponent} from './helper-download/helper-download.component';
import { HttpClientModule } from '@angular/common/http';
import { IframPropagateDemoComponent } from './iframe-propagate/iframe-propagate.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ButtonModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DCommonModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo' },
      { path: 'demo', component: CommonDemoComponent },
      {
        path: 'api',
        component: DevUIApiComponent,
        data: {
          api: require('!html-loader!markdown-loader!../docs/api.md'),
        },
      },
    ]),
  ],
  exports: [
    CommonDemoComponent
  ],
  declarations: [
    PipeDemoComponent,
    CommonDemoComponent,
    HelperJumpDemoComponent,
    HelperDownloadDemoComponent,
    IframPropagateDemoComponent
  ]
})
export class CommonDemoModule {}
