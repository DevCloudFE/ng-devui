import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { AnchorModule } from 'ng-devui/anchor';
import { AnchorDemoComponent } from './anchor-demo.component';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { BasicComponent } from './basic/basic.component';
import { AsyncComponent } from './async/async.component';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox/devui-codebox.module';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { ButtonModule } from 'ng-devui/button';
import { StickyModule } from 'ng-devui/sticky';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { HashComponent } from './hash/hash.component';
import { ToggleModule } from 'ng-devui/toggle';
import { ScrollTargetComponent } from './scroll-target/scroll-target.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    ToggleModule,
    StickyModule,
    AnchorModule,
    DevUICodeboxModule,
    DevUIApiModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '',  redirectTo: 'demo' },
      { path: 'demo', component: AnchorDemoComponent},
      { path: 'api', component: DevUIApiComponent, data: {
        api: require('!html-loader!markdown-loader!../doc/api.md')
      }}
    ])
  ],
  exports: [AnchorDemoComponent],
  declarations: [
    AnchorDemoComponent,
    BasicComponent,
    AsyncComponent,
    HashComponent,
    ScrollTargetComponent
  ],
  
})
export class AnchorDemoModule {
}

