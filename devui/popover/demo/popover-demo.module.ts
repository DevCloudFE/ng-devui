import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverModule } from '../popover.module';
import { FormsModule } from '@angular/forms';
import {ButtonModule} from '../../button';

import { PopoverDemoComponent } from './popover-demo.component';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { BasicComponent } from './basic/basic.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { ManualComponent } from './manual/manual.component';
import { CustomizeTmpComponent } from './customize/customize-tmp.component';

@NgModule({
  imports: [
    CommonModule,
    PopoverModule,
    FormsModule,
    DevUICodeboxModule,
    DevUIApiModule,
    ButtonModule,
    RouterModule.forChild([
    { path: '',  redirectTo: 'demo' },
    { path: 'demo', component: PopoverDemoComponent},
    { path: 'api', component: DevUIApiComponent, data: {
      api: require('!html-loader!markdown-loader!../doc/api.md')
    }}
    ])
  ],
  exports: [PopoverDemoComponent],
  declarations: [
    PopoverDemoComponent,
    BasicComponent,
    ManualComponent,
    CustomizeTmpComponent
  ],
  entryComponents: [
    PopoverDemoComponent,
  ],
})
export class PopoverDemoModule {
}

