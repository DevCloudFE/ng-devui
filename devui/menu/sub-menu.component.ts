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
  AfterViewInit,
  AfterContentInit,
  forwardRef,
  AfterContentChecked,
  OnDestroy,
} from '@angular/core';
import { TypeOrNull, collapseMotion, scaleInOut } from 'ng-devui/utils';
// import { DevConfigService, WithConfig } from 'ng-devui/utils';
import { MenuComponent } from './menu.component';
import { MenuHoverTypes, SubTitleContextType } from './type';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { MenuItemDirective } from './menu-item.directive';
import { BehaviorSubject, Subject, auditTime, combineLatest, distinctUntilChanged, filter, merge } from 'rxjs';
import { debounceTime, map, mapTo, skipWhile, takeWhile } from 'rxjs/operators';

@Component({
  selector: '[d-sub-menu]',
  templateUrl: './sub-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [collapseMotion, scaleInOut],
  host: {
  '[class.devui-sub-menu]': 'true'
  }
  })
export class SubMenuComponent implements OnInit, AfterViewInit, AfterContentInit, AfterContentChecked, OnDestroy {
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

  protected parentSubmenu = inject(SubMenuComponent, {
    skipSelf: true,
    optional: true
  });
  protected parentMenu = inject(MenuComponent, { skipSelf: true });

  protected cdr = inject(ChangeDetectorRef);

  afterInitAnimate = true;

  positions: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'top',
      offsetX: 6
    }
  ];

  private childActive = false;

  menuItems: MenuItemDirective[] = [];

  // { descendants: true } 在递归组件里没用
  @ContentChildren(MenuItemDirective) menuItemDirectives: TypeOrNull<QueryList<MenuItemDirective>> = null;

  collapsed = false;

  readonly childState$ = new Subject<MenuHoverTypes>();
  readonly itemInteractive$ = new Subject<MenuHoverTypes>();
  readonly isChildSubMenuOpen$ = new BehaviorSubject(false);

  level = 1;
  constructor() {
    if (this.parentSubmenu) {
      this.level = this.parentSubmenu.level + 1;
    }
  }

  ngOnInit() {
    this.parentMenu.collapsed$.subscribe(res => {
      // console.log('parentMenu.collapsed$', res, this.open);
      this.collapsed = res;
      if (res) {
        this.toggleOpen(false);
      }
      this.cdr.markForCheck();
    });

    const isCurrentSubmenuOpen$ = this.childState$.pipe(map((value => value === 'enter')));
    const isSubMenuOpenWithDebounce$ = combineLatest([this.isChildSubMenuOpen$, isCurrentSubmenuOpen$])
      .pipe(
        filter(() => this.collapsed && !this.disabled),
        map((([parentChildOpen, currentChildOpen]) => {
          // console.log('map open', parentChildOpen, currentChildOpen)
          return parentChildOpen || currentChildOpen;
        })),
        auditTime(150),
        distinctUntilChanged(),
      );
    isSubMenuOpenWithDebounce$.subscribe(open => {
      // console.log('isSubMenuOpenWithDebounce', this.open, open);

      this.toggleOpen(open);
      this.parentSubmenu?.isChildSubMenuOpen$.next(open);
    });
  }
  ngAfterViewInit() {

  }
  ngAfterContentInit(): void {
    // console.log('ngAfterContentInit');
    if (this.menuItemDirectives.length) {
      this.menuItems.push(...this.menuItemDirectives.toArray());
      if (this.parentSubmenu) {
        this.parentSubmenu.menuItems.push(...this.menuItemDirectives.toArray());
      }
    }
  }
  ngAfterContentChecked(): void {

  }

  titleClick() {
    if (this.disabled || this.collapsed) { return; }
    this.toggleOpen(!this.open);
  }


  titleHover(type: MenuHoverTypes) {
    this.childState$.next(type);
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

  setChildActive() {
    // console.log('setChildActive', this.menuItems);
    const active = this.menuItems.some(item => item.active);
    this.toggleActive(active);
    this.parentSubmenu?.toggleActive(active);

  }

  toggleActive(active: boolean) {
    this.childActive = active;
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    console.log('sub menu destroy');
  }
}
