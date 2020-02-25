import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ColorPickerModule } from '../../color-picker';
import { ColorPickerDemoComponent } from './color-picker-demo.component';
import { DevUIApiComponent } from 'ng-devui//shared/devui-api/devui-api.component';
import { BasicComponent } from './basic/basic.component';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { DevUIApiModule } from 'ng-devui//shared/devui-api/devui-api.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ColorPickerModule,
    DevUICodeboxModule,
    DevUIApiModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: ColorPickerDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md')
      }}
    ])
  ],
  exports: [ColorPickerDemoComponent],
  declarations: [
    ColorPickerDemoComponent,
    BasicComponent,
  ],
  entryComponents: [
    ColorPickerDemoComponent,
  ],
})
export class ColorPickerDemoModule {
}

