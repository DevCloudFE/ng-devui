import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from '../tooltip.module';
import { TooltipDemoComponent } from './tooltip-demo.component';
import { BasicComponent } from './basic/basic.component';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { ButtonModule } from 'ng-devui/button';
import { StickyModule } from '../../sticky';
import { AnchorModule } from '../../anchor';


@NgModule({
  imports: [
    StickyModule,
    AnchorModule,
    CommonModule,
    TooltipModule,
    DevUICodeboxModule,
    ButtonModule,
    DevUIApiModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: TooltipDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md')
      }}
    ])
  ],
  exports: [TooltipDemoComponent],
  declarations: [
    TooltipDemoComponent,
    BasicComponent
  ],
  entryComponents: [
    TooltipDemoComponent,
  ],
})
export class TooltipDemoModule {
}

