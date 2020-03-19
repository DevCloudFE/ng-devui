import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsModule } from '../tabs.module';
import { TabsDemoComponent } from './tabs-demo.component';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { BasicComponent } from './basic/basic.component';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { WithoutContentComponent } from './without-content/without-content.component';
import { CustomizeTmpComponent } from './customize-tmp/customize-tmp.component';

@NgModule({
  imports: [
    CommonModule,
    TabsModule,
    DevUICodeboxModule,
    DevUIApiModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: TabsDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md')
      }}
    ])
  ],
  exports: [TabsDemoComponent],
  declarations: [
    TabsDemoComponent,
    BasicComponent,
    WithoutContentComponent,
    CustomizeTmpComponent
  ],
  entryComponents: [
    TabsDemoComponent,
  ],
})
export class TabsDemoModule {
}

