import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DevUIApiComponent } from 'ng-devui/shared/devui-api/devui-api.component';
import { DevUIApiModule } from 'ng-devui/shared/devui-api/devui-api.module';
import { DevUICodeboxModule } from 'ng-devui/shared/devui-codebox';
import { DDemoNavModule } from 'src/app/component/d-demo-nav.module';
import { CarouselModule } from '../carousel.module';
import { CarouselDemoComponent } from './carousel-demo.component';
import { CarouselDemoBasicComponent } from './basic/carousel-demo-basic.component';
import { CarouselDemoTriggerComponent } from './trigger/carousel-demo-trigger.component';
import { CarouselDemoAutoPlayComponent } from './autoplay/carousel-demo-autoplay.component';
import { ButtonModule } from 'ng-devui/button';
import { CarouselDemoCustomComponent } from './custom/carousel-demo-custom.component';

@NgModule({
  imports: [
    CommonModule,
    DevUICodeboxModule,
    DevUIApiModule,
    CarouselModule,
    FormsModule,
    DDemoNavModule,
    ButtonModule,
    RouterModule.forChild([
      {path: '', redirectTo: 'demo'},
      {path: 'demo', component: CarouselDemoComponent},
      {
        path: 'api', component: DevUIApiComponent, data: {
          api: require('!html-loader!markdown-loader!../doc/api.md'),
        }
      }
    ])
  ],
  exports: [],
  declarations: [
    CarouselDemoComponent,
    CarouselDemoBasicComponent,
    CarouselDemoTriggerComponent,
    CarouselDemoAutoPlayComponent,
    CarouselDemoCustomComponent
  ],
})
export class CarouselDemoModule {
}

