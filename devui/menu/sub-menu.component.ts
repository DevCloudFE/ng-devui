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
} from '@angular/core';
import { collapseMotion } from 'ng-devui/utils';
// import { DevConfigService, WithConfig } from 'ng-devui/utils';
import { SubmenuService } from './submenu.service';
import { MenuComponent } from './menu.component';
import { SubTitleContextType } from './type';


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
export class SubMenuComponent implements OnInit {
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
  childActive = false;

  protected cdr = inject(ChangeDetectorRef);

  afterInitAnimate = true;

  ngOnInit() { }

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

  setChildActive(active: boolean) {
    this.childActive = active;
    if (this.parentSubmenu) {
      this.parentSubmenu.setChildActive(active);
    }
    this.cdr.markForCheck();
  }

  /*  get expandState() {
     return this.open ? 'expanded' : 'collapsed';
   } */
}
