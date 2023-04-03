import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'ng-devui/button';
import { DropDownModule } from 'ng-devui/dropdown';
import { IconModule } from 'ng-devui/icon';
import { SafePipeModule } from 'ng-devui/utils';
import { UserGuideCoreService } from './user-guide-core.service';
import { UserGuideUIComponent } from './user-guide-ui.component';
import { UserGuideComponent } from './user-guide.component';
import { UserGuideService } from './user-guide.service';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    DropDownModule,
    SafePipeModule,
    IconModule
  ],
  exports: [
    UserGuideComponent,
    UserGuideUIComponent
  ],
  providers: [
    UserGuideCoreService,
    UserGuideService
  ],
  declarations: [
    UserGuideComponent,
    UserGuideUIComponent
  ]
})
export class UserGuideModule { }
