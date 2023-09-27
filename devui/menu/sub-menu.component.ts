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
} from '@angular/core';
import { TypeOrNull, collapseMotion } from 'ng-devui/utils';
// import { DevConfigService, WithConfig } from 'ng-devui/utils';
import { SubmenuService } from './submenu.service';
import { MenuComponent } from './menu.component';
import { SubTitleContextType } from './type';
import { ConnectedPosition, ConnectionPositionPair } from '@angular/cdk/overlay';
import { MenuItemDirective } from './menu-item.directive';


@Component({
  selector: '[d-sub-menu]',
  templateUrl: './sub-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SubmenuService],
  animations: [collapseMotion],
  host: {
  '[class.devui-sub-menu]': 'true'
  }
  })
export class SubMenuComponent implements OnInit, AfterViewInit, AfterContentInit, AfterContentChecked {
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
      open: this._open,
      disabled: this.disabled,
      icon: this.icon,
    };
  }

  protected submenuService = inject(SubmenuService);
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

  /* @ContentChildren(SubMenuComponent, { descendants: true })
  subMenuComponents: QueryList<SubMenuComponent> | null = null; */
  @ContentChildren(MenuItemDirective, { descendants: true }) menuItemDirectives: TypeOrNull<QueryList<MenuItemDirective>> = null;
  menuItems: MenuItemDirective[] = [];
  ngOnInit() { }
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
    this.toggleOpen(!this._open);
  }

  /*
    titleClick() {
    this.afterInitAnimate = false;
    setTimeout(() => {
      this.toggleOpen(!this._open);
      this.cdr.markForCheck();
    }, 0);
  }
  */

  toggleOpen(value: boolean) {
    if (this.disabled) { return; }
    this._open = value;
    this.openChange.emit(value);
  }

  get expandState() {
    return this.open ? 'expanded' : 'collapsed';
  }

  titleCls(base: string) {
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

  /*  get expandState() {
     return this.open ? 'expanded' : 'collapsed';
   } */
}
