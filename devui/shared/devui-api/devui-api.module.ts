import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavSpriteModule } from 'ng-devui/nav-sprite';
import { SafePipeModule } from 'ng-devui/utils';
import { DevUIApiComponent } from './devui-api.component';

@NgModule({
  imports: [
    CommonModule,
    SafePipeModule,
    NavSpriteModule
  ],
  declarations: [DevUIApiComponent],
  exports: [DevUIApiComponent]
})
export class DevUIApiModule { }
