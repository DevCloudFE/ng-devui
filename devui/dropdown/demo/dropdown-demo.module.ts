import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'ng-devui/button';
import { ToggleModule } from 'ng-devui/toggle';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';

import { DropDownModule } from '../dropdown.moudule';
import { DropdownDemoComponent } from './dropdown-demo.component';
import { BasicComponent } from './basic/basic.component';
import { DropDownDemoAppendToBodyComponent } from './append-to-body/append-to-body.component';
import { DropDownDemoAddIconComponent } from './add-icon/add-icon.component';
import { DropDownDemoHoverComponent } from './hover/hover.component';
import { DropDownDemoFocusComponent } from './focus/focus.component';
import { DropDownDemoClickBlankComponent } from './close-scope/close-scope.component';
import { DropDownDemoMultiLevelComponent } from './multi-level/multi-level.component';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';

@NgModule({
  imports: [
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
        api: require('!html-loader!markdown-loader!../doc/api.md')
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
  ],
  entryComponents: [
    DropdownDemoComponent,
  ],
})
export class DropdownDemoModule {
}

