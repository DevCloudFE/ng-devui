import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  inject,
  TemplateRef,
  QueryList,
  ContentChildren,
  AfterContentInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { collapseMotion, scaleInOut } from 'ng-devui/utils';
// import { DevConfigService, WithConfig } from 'ng-devui/utils';
import { MenuComponent } from './menu.component';
import { MenuHoverTypes, SubTitleContextType } from './type';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { MenuItemDirective } from './menu-item.directive';
import { auditTime, combineLatest, distinctUntilChanged, filter } from 'rxjs';
import { map } from 'rxjs/operators';
import { SubMenuService } from './submenu.service';

@Component({
  selector: '[d-sub-menu]',
  templateUrl: './sub-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [collapseMotion, scaleInOut],
  providers: [SubMenuService],
  host: {
  '[class.devui-sub-menu]': 'true'
  }
  })
export class SubMenuComponent implements OnInit, AfterContentInit {
  // { descendants: true } 在递归组件里没用
  @ContentChildren(MenuItemDirective) menuItemDirectives: QueryList<MenuItemDirective>;
  @HostBinding('class.no-style') @Input() noStyle = false;
  @HostBinding('class.open') _open = false;
  @Input()
  set open(value: boolean) {
    // console.log('wat set open', value);
    this._open = value;
  }

  get open() {
    return this._open;
  }

  @Input() disabled = false;
  @Input() title: string | TemplateRef<SubTitleContextType> = '';
  @Input() icon = '';
  @Output() openChange = new EventEmitter<boolean>();

  get titleContext(): SubTitleContextType {
    return {
      $implicit: this.title instanceof TemplateRef ? '' : this.title,
      open: this.open,
      disabled: this.disabled,
      icon: this.icon,
    };
  }

  protected submenuService = inject(SubMenuService, { self: true });
  protected parentMenu = inject(MenuComponent, { skipSelf: true });

  protected cdr = inject(ChangeDetectorRef);

  afterInitAnimate = true;

  positions: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'top',
      offsetX: 4
    }
  ];

  private childActive = false;

  collapsed = false;

  constructor() {
    // 如果不在constructor里，takeUntilDestroyed就得传入 destroyRef = inject(DestroyRef);
    this.parentMenu.collapsed$.pipe(takeUntilDestroyed()).subscribe(res => {
      // console.log('parentMenu.collapsed$', res, this.open);
      this.collapsed = res;
      if (res) {
        this.toggleOpen(false);
      }
      this.cdr.markForCheck();
    });

    const currentActive$ = this.submenuService.childActive$;
    combineLatest([this.submenuService.parentSubMenuActive$, currentActive$])
      .pipe(
        map((([parentActive, currentActive]) => {
          // console.log('map active', parentActive, currentActive)
          return parentActive || currentActive;
        })),
        distinctUntilChanged(),
        takeUntilDestroyed()
      ).subscribe(res => {
        // console.log('childActive$', res);
        this.toggleActive(res);
        this.submenuService.parentSubMenuService?.parentSubMenuActive$?.next(res);
        this.cdr.markForCheck();
      });

    const currentPopoverOpen$ = this.submenuService.childState$.pipe(map((value => value === 'enter')));
    combineLatest([this.submenuService.parentPopoverOpen$, currentPopoverOpen$])
      .pipe(
        filter(() => this.collapsed && !this.disabled),
        map((([parentPopoverOpen, currentPopoverOpen]) => {
          // console.log('map open', parentPopoverOpen, currentPopoverOpen)
          return parentPopoverOpen || currentPopoverOpen;
        })),
        auditTime(150),
        distinctUntilChanged(),
        takeUntilDestroyed()
      ).subscribe(open => {
        // console.log('sub menu open', this.open, open);
        this.toggleOpen(open);
        this.submenuService.parentSubMenuService?.parentPopoverOpen$.next(open);
        this.cdr.markForCheck();
      });
  }

  ngOnInit() { }
  ngAfterContentInit(): void {
    // console.log('ngAfterContentInit');
    if (this.menuItemDirectives?.length) {
      this.submenuService.menuItems.push(...this.menuItemDirectives.toArray());
      if (this.submenuService.parentSubMenuService) {
        this.submenuService.parentSubMenuService.menuItems.push(...this.menuItemDirectives.toArray());
      }
    }
  }

  titleClick() {
    if (this.disabled || this.collapsed) { return; }
    this.toggleOpen(!this.open);
  }


  titleHover(type: MenuHoverTypes) {
    this.submenuService.childState$.next(type);
  }

  /*
    titleClick() {
    this.afterInitAnimate = false;
    setTimeout(() => {
      this.toggleOpen(!this.open);
      this.cdr.markForCheck();
    }, 0);
  }
  */

  toggleOpen(open: boolean) {
    if (open !== this.open) {
      this.open = open;
      this.openChange.emit(open);
    }
  }

  get expandState() {
    return this.open ? 'expanded' : 'collapsed';
  }

  stateCls(base: string) {
    return `${base} ${this.childActive ? 'active' : ''} ${this.disabled ? 'disabled' : ''} ${this.noStyle ? 'no-style' : ''}`;
  }

  toggleActive(active: boolean) {
    if (active !== this.childActive) {
      this.childActive = active;
    }
  }
}
