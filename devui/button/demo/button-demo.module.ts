import { LeftRightComponent } from './left-right/left-right.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from '../button.module';
import { ButtonDemoComponent } from './button-demo.component';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { CommonComponent } from './common/common.component';
import { IconComponent } from './icon/icon.component';
import { LoadingComponent } from './loading/loading.component';
import { PrimaryComponent } from './primary/primary.component';
import { DangerComponent } from './danger/danger.component';
import { TextComponent } from './text/text.component';
import { CombinationComponent } from './combination/combination.component';
import { AutofocusComponent } from './autofocus/autofocus.component';
import { SizeComponent } from './size/size.component';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: ButtonDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md')
      }}
    ])
  ],
  exports: [ButtonDemoComponent],
  declarations: [
    ButtonDemoComponent,
    CommonComponent,
    IconComponent,
    LoadingComponent,
    PrimaryComponent,
    LeftRightComponent,
    DangerComponent,
    TextComponent,
    CombinationComponent,
    AutofocusComponent,
    SizeComponent
  ],
  entryComponents: [
    ButtonDemoComponent,
  ],
})
export class ButtonDemoModule {
}

