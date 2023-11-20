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
import { MenuHoverTypes } from './type';
import { HostListener } from '@angular/core';
import { MenuComponent } from './menu.component';
import { SubMenuService } from './submenu.service';

@Directive({
  selector: '[dMenuItem]',
  exportAs: 'dMenuItem',
  })
export class MenuItemDirective implements OnInit, OnChanges {
  @Input() subMenuHost = false;
  @HostBinding('class.no-style') @Input() noStyle = false;
  @HostBinding('class.disabled') @Input() disabled = false;
  @HostBinding('class.active') @Input() active = false;
  @HostBinding('class.devui-menu-item') menuItemClass = true;

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

  @HostListener('mouseenter', ['$event']) hostMouseEnter(event: MouseEvent) {
    this.hostHover('enter');
  }

  @HostListener('mouseleave', ['$event']) hostMouseLeave(event: MouseEvent) {
    this.hostHover('leave');
  }

  @HostListener('click', ['$event']) hostClick(event: MouseEvent) {
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
