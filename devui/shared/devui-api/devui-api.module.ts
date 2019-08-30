import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevUIApiComponent } from './devui-api.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DevUIApiComponent],
  exports: [DevUIApiComponent]
})
export class DevUIApiModule { }
