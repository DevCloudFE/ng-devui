import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'ng-devui/button';
import { DropDownModule } from 'ng-devui/dropdown';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { AutofocusComponent } from './autofocus/autofocus.component';
import { ButtonDemoComponent } from './button-demo.component';
import { CombinationComponent } from './combination/combination.component';
import { CommonComponent } from './common/common.component';
import { DangerComponent } from './danger/danger.component';
import { GroupsComponent } from './groups/groups.component';
import { IconComponent } from './icon/icon.component';
import { LeftRightComponent } from './left-right/left-right.component';
import { LoadingComponent } from './loading/loading.component';
import { PrimaryComponent } from './primary/primary.component';
import { SizeComponent } from './size/size.component';
import { TextComponent } from './text/text.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DDemoNavModule,
    DropDownModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: ButtonDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
        'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
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
    SizeComponent,
    GroupsComponent,
  ],

})
export class ButtonDemoModule {
}
