import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'ng-devui/button';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'devui-commons/src/demo-nav/d-demo-nav.module';
import { AnimationIconComponent } from './animation-icon/animation-icon.component';
import { AnimationsDemoComponent } from './animations-demo.component';
import { CollapseComponent } from './collapse/collapse.component';
import { FadeInOutComponent } from './fade-in-out/fade-in-out.component';
import { FlyInOutComponent } from './fly-in-out/fly-in-out.component';
import { SkeletonComponent } from './skeleton/skeleton.component';
import { WipeInOutComponent } from './wipe-in-out/wipe-in-out.component';

@NgModule({
  declarations: [
    AnimationsDemoComponent,
    CollapseComponent,
    FadeInOutComponent,
    WipeInOutComponent,
    FlyInOutComponent,
    SkeletonComponent,
    AnimationIconComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    DDemoNavModule,
    DevUIApiModule,
    DevUICodeboxModule,
    TranslateModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo' },
      { path: 'demo', component: AnimationsDemoComponent },
      {
        path: 'api',
        component: DevUIApiComponent,
        data: {
          'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
          'en-us': require('!html-loader!markdown-loader!../doc/api-en.md'),
        },
      },
    ]),
  ],
})
export class AnimationsDemoModule {}
