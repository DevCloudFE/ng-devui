import {
  Input,
  OnInit,
  Directive,
  HostBinding,
  EventEmitter,
  Output,
  inject,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef
} from '@angular/core';
// import { DevConfigService, WithConfig } from 'ng-devui/utils';
import { MenuHoverTypes } from './type';
import { HostListener } from '@angular/core';
import { MenuComponent } from './menu.component';
import { SubMenuService } from './submenu.service';

@Directive({
  selector: '[d-menu-item]',
  exportAs: 'dMenuItem',
  host: {
  '[class.devui-menu-item]': 'true',
  '(mouseenter)': "hostHover('enter')",
  '(mouseleave)': "hostHover('leave')",
  }
  })
export class MenuItemDirective implements OnInit, OnChanges {
  @Input() subMenuHost = false; // todo: 删
  @HostBinding('class.no-style') @Input() noStyle = false;
  @HostBinding('class.disabled') @Input() disabled = false;
  @HostBinding('class.active') @Input() active = false;
  // @HostBinding('class.active') _active = this.active;

  @Output() itemClick = new EventEmitter<MouseEvent>();
  @Output() titleHover = new EventEmitter<MenuHoverTypes>();
  protected cdr = inject(ChangeDetectorRef);

  protected menuComponent = inject(MenuComponent, {
    skipSelf: true
  });

  protected submenuService = inject(SubMenuService, {
    skipSelf: true,
    optional: true
  });

  @HostListener('click', ['$event']) hostClick(event: MouseEvent) {
    // this._active = true;
    if (!this.disabled) {
      this.itemClick.emit(event);
      if (!this.subMenuHost) {
        this.menuComponent.menuItemClick.emit({
          item: this,
          event
        });
        if (this.submenuService) {
          this.submenuService.childState$.next('leave');
        }
      }
    }
  }

  hostHover(type: MenuHoverTypes) {
    if (!this.disabled && this.submenuService) {
      this.titleHover.emit(type);
    }
  }

  ngOnChanges({ active }: SimpleChanges): void {
    // console.log('active', active, this.submenuService)
    if (active && this.submenuService) {
      if (active.firstChange) {
        setTimeout(() => {
          this.submenuService.setChildActive();
          this.cdr.markForCheck();
        }, 0);
      } else {
        this.submenuService.setChildActive();
      }
    }
  }

  ngOnInit() { }
}
