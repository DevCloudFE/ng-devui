import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { MenuComponent } from './menu.component';
import { IconModule } from 'ng-devui/icon';
import { MenuItemDirective } from './menu-item.directive';
import { SubMenuComponent } from './sub-menu.component';

@NgModule({
  imports: [CommonModule, IconModule, LetDirective],
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