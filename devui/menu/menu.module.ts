import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { MenuComponent } from './menu.component';
import { IconModule } from 'ng-devui/icon';
import { MenuItemDirective } from './menu-item.directive';
import { SubMenuComponent } from './sub-menu.component';
import { StrTplOutletModule } from 'ng-devui/utils';

@NgModule({
  imports: [CommonModule, IconModule, OverlayModule, StrTplOutletModule,],
  exports: [
  MenuComponent,
  MenuItemDirective,
  SubMenuComponent,
  ],
  declarations: [
  MenuComponent,
  MenuItemDirective,
  SubMenuComponent,
  ],
  })
export class MenuModule { }
