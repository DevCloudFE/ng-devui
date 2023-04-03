import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'ng-devui/button';
import { CarouselModule } from 'ng-devui/carousel';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'devui-commons/src/demo-nav/d-demo-nav.module';
import { CarouselDemoAutoPlayComponent } from './autoplay/carousel-demo-autoplay.component';
import { CarouselDemoBasicComponent } from './basic/carousel-demo-basic.component';
import { CarouselDemoComponent } from './carousel-demo.component';
import { CarouselDesignComponent } from './carousel-design.component';
import { CarouselDemoCustomComponent } from './custom/carousel-demo-custom.component';
import { CarouselDemoTriggerComponent } from './trigger/carousel-demo-trigger.component';
import { WithTransitionProgressComponent } from './with-transition-progress/with-transition-progress.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    DevUICodeboxModule,
    DevUIApiModule,
    CarouselModule,
    FormsModule,
    DDemoNavModule,
    ButtonModule,
    RouterModule.forChild([
      {path: '', redirectTo: 'demo', pathMatch: 'full'},
      {
        path: 'design',
        component: CarouselDesignComponent,
      },
      {path: 'demo', component: CarouselDemoComponent},
      {
        path: 'api', component: DevUIApiComponent, data: {
          'zh-cn': require('!html-loader!markdown-loader!../doc/api-cn.md'),
          'en-us': require('!html-loader!markdown-loader!../doc/api-en.md')
        }
      }
    ])
  ],
  exports: [],
  declarations: [
    CarouselDemoComponent,
    CarouselDesignComponent,
    CarouselDemoBasicComponent,
    CarouselDemoTriggerComponent,
    CarouselDemoAutoPlayComponent,
    CarouselDemoCustomComponent,
    WithTransitionProgressComponent
  ],
})
export class CarouselDemoModule {
}
