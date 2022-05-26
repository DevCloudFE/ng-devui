import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconGroupComponent } from './icon-group.component';
import { IconComponent } from './icon.component';

@NgModule({
  declarations: [IconComponent,IconGroupComponent],
  imports: [
    CommonModule
  ],
  exports: [IconComponent,IconGroupComponent]
})
export class IconModule { }
