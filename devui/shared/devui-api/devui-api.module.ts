import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SafePipeModule } from 'ng-devui/utils';
import { DevUIApiComponent } from './devui-api.component';

@NgModule({
  imports: [
    CommonModule,
    SafePipeModule
  ],
  declarations: [DevUIApiComponent],
  exports: [DevUIApiComponent]
})
export class DevUIApiModule { }
