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
import { MenuItemType } from './type';
import { HostListener } from '@angular/core';
import { SubmenuService } from './submenu.service';
import { SubMenuComponent } from './sub-menu.component';

@Directive({
  selector: '[d-menu-item]',
  exportAs: 'dMenuItem',
  /* providers: [
    { provide: 'testToken', useValue: 'menuItemToken' }
  ], */
  host: {
  '[class.devui-menu-item]': 'true',
  }
  })
export class MenuItemDirective implements OnInit, OnChanges {
  @HostBinding('class.no-style') @Input() noStyle = false;
  @HostBinding('class.disabled') @Input() disabled = false;
  @HostBinding('class.active') @Input() active = false;
  // @HostBinding('class.active') _active = this.active;

  @Output() itemClick = new EventEmitter<MouseEvent>();
  protected cdr = inject(ChangeDetectorRef);
  protected submenuService = inject(SubMenuComponent, {
    skipSelf: true,
    optional: true
  });

  @HostListener('click', ['$event']) hostClick(event: MouseEvent) {
    // this._active = true;
    if (!this.disabled) {
      this.itemClick.emit(event);
    }
  }

  ngOnChanges({ active }: SimpleChanges): void {
    // console.log('active', active, this.submenuService)
    if (active && this.submenuService) {
      this.submenuService.setChildActive();
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
