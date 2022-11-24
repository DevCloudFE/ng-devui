import { NgModule } from '@angular/core';
import { IconGroupComponent } from './icon-group.component';
import { IconComponent, IconHoverDirective, IconLinkDirective } from './icon.component';

@NgModule({
  imports: [IconComponent,IconGroupComponent,IconLinkDirective,IconHoverDirective],
  exports: [IconComponent,IconGroupComponent,IconLinkDirective,IconHoverDirective]
})
export class IconModule { }
