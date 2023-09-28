import {
  AfterViewInit,
  ChangeDetectionStrategy,
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
import { DevConfigService, WithConfig } from 'ng-devui/utils';
import { MenuHoverTypes, MenuItemType } from './type';
import { HostListener } from '@angular/core';
import { SubMenuComponent } from './sub-menu.component';
import { MenuComponent } from './menu.component';

@Directive({
  selector: '[d-menu-item]',
  exportAs: 'dMenuItem',
  /* providers: [
    { provide: 'testToken', useValue: 'menuItemToken' }
  ], */
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

  protected submenuComponent = inject(SubMenuComponent, {
    skipSelf: true,
    optional: true
  });

  protected menuComponent = inject(MenuComponent, {
    skipSelf: true
  });

  @HostListener('click', ['$event']) hostClick(event: MouseEvent) {
    // this._active = true;
    if (!this.disabled) {
      this.itemClick.emit(event);
      this.menuComponent.menuItemClick.emit({
        item: this,
        event
      });
      if (!this.subMenuHost && this.submenuComponent) {
        this.submenuComponent.childState$.next('leave');
      }
    }
  }

  hostHover(type: MenuHoverTypes) {
    if (!this.disabled && this.submenuComponent) {
      this.titleHover.emit(type);
    }
  }

  ngOnChanges({ active }: SimpleChanges): void {
    // console.log('active', active, this.submenuService)
    if (active && this.submenuComponent) {
      this.submenuComponent.setChildActive();
      if (active.firstChange) {
        setTimeout(() => {
          this.submenuComponent.setChildActive();
          this.cdr.markForCheck();
        }, 0);
      } else {
        this.submenuComponent.setChildActive();
      }
    }
  }

  ngOnInit() { }
}
