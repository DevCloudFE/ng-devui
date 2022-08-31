import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconGroupComponent } from './icon-group.component';
import { IconComponent, IconHoverDirective, IconLinkDirective } from './icon.component';

@NgModule({
  declarations: [IconComponent,IconGroupComponent,IconLinkDirective,IconHoverDirective],
  imports: [
    CommonModule
  ],
  exports: [IconComponent,IconGroupComponent,IconLinkDirective,IconHoverDirective]
})
export class IconModule { }
