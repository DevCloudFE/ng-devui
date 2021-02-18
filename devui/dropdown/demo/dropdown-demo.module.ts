import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'ng-devui/button';
import { DropDownModule } from 'ng-devui/dropdown';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { ToggleModule } from 'ng-devui/toggle';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { DropDownDemoAddIconComponent } from './add-icon/add-icon.component';
import { DropDownDemoAppendToBodyComponent } from './append-to-body/append-to-body.component';
import { BasicComponent } from './basic/basic.component';
import { DropDownDemoClickBlankComponent } from './close-scope/close-scope.component';
import { DropdownDemoComponent } from './dropdown-demo.component';
import { DropDownDemoFocusComponent } from './focus/focus.component';
import { DropDownDemoHoverComponent } from './hover/hover.component';
import { DropDownDemoManuallyComponent } from './manually/manually.component';
import { DropDownDemoMultiLevelComponent } from './multi-level/multi-level.component';
import { DropdownSetIsOpenComponent } from './set-is-open/dropdown-set-is-open.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    DropDownModule,
    DevUICodeboxModule,
    DevUIApiModule,
    ButtonModule,
    ToggleModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: DropdownDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
        'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
      }}
    ])
  ],
  exports: [DropdownDemoComponent],
  declarations: [
    DropdownDemoComponent,
    BasicComponent,
    DropDownDemoClickBlankComponent,
    DropDownDemoFocusComponent,
    DropDownDemoHoverComponent,
    DropDownDemoAppendToBodyComponent,
    DropDownDemoAddIconComponent,
    DropDownDemoMultiLevelComponent,
    DropDownDemoManuallyComponent,
    DropdownSetIsOpenComponent,
  ],
  
})
export class DropdownDemoModule {
}
