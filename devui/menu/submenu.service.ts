import {
  ChangeDetectorRef,
  inject,
  Injectable,
} from '@angular/core';
import { MenuHoverTypes } from './type';
import { MenuItemDirective } from './menu-item.directive';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class SubMenuService {
  readonly parentSubMenuService = inject(SubMenuService, {
    skipSelf: true,
    optional: true
  });

  menuItems: MenuItemDirective[] = [];
  readonly childState$ = new Subject<MenuHoverTypes>();
  readonly parentPopoverOpen$ = new BehaviorSubject(false);

  readonly childActive$ = new Subject<boolean>();
  readonly parentSubMenuActive$ = new BehaviorSubject(false);
  protected cdr = inject(ChangeDetectorRef);
  level = 1;
  constructor() {
    if (this.parentSubMenuService) {
      this.level = this.parentSubMenuService.level + 1;
    }
  }

  setChildActive() {
    const active = this.menuItems.some(item => item.active);
    this.childActive$.next(active);
  }
}
