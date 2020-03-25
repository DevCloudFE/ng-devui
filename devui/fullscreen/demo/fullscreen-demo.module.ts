import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StickyModule } from '../../sticky';
import { AnchorModule } from '../../anchor';
import { ButtonModule } from 'ng-devui/button';
import { TooltipModule } from 'ng-devui/tooltip';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';

import { FullscreenModule } from '../fullscreen.module';
import { FullscreenDemoComponent } from './fullscreen-demo.component';
import { FullscreenDemoImmersiveComponent } from './immersive/immersive.component';
import { FullscreenDemoNormalComponent } from './normal/normal.component';

@NgModule({
  imports: [
    StickyModule,
    AnchorModule,
    ButtonModule,
    TooltipModule,
    FullscreenModule,
    DevUICodeboxModule,
    DevUIApiModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo' },
      { path: 'demo', component: FullscreenDemoComponent },
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md')
      } }
    ])
  ],
  exports: [
    FullscreenDemoComponent
  ],
  declarations: [
    FullscreenDemoComponent,
    FullscreenDemoImmersiveComponent,
    FullscreenDemoNormalComponent
  ]
})
export class FullscreenDemoModule {
}
