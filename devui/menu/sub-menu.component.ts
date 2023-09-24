import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  AfterViewInit,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { expandCollapseForDomDestroyWithChildren } from 'ng-devui/utils';
import { DevConfigService, WithConfig } from 'ng-devui/utils';
import { SubmenuService } from './submenu.service';
import { MenuComponent } from './menu.component';


@Component({
  selector: '[d-sub-menu]',
  templateUrl: './sub-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SubmenuService],
  animations: [expandCollapseForDomDestroyWithChildren],
  host: {
  '[class.devui-sub-menu]': 'true'
  }
  })
export class SubMenuComponent implements OnInit, AfterViewInit {
  @HostBinding('class.open') _open = false;
  @Input()
  set open(value: boolean) {
    this._open = value;
  }

  get open() {
    return this._open;
  }

  @Input() disabled = false;
  @Input({ required: true }) title = '';
  @Input() icon = '';
  @Output() openChange = new EventEmitter<boolean>();

  protected submenuService = inject(SubmenuService);
  protected parentSubmenu = inject(SubMenuComponent, {
    skipSelf: true,
    optional: true
  });
  protected parentMenu = inject(MenuComponent, { skipSelf: true });
  childActive = false;

  protected cdr = inject(ChangeDetectorRef);

  afterInitAnimate = true;
  ngOnInit() {
    /* setTimeout(() => {
      this.afterInitAnimate = false;
      this.cdr.markForCheck();
    }, 0); */
  }

  ngAfterViewInit() { }

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

  disabledCls(base: string) {
    return `${base} ${this.disabled ? 'disabled' : ''}`;
  }

  setChildActive(active: boolean) {
    this.childActive = active;
    if (this.parentSubmenu) {
      this.parentSubmenu.setChildActive(active);
    }
    this.cdr.markForCheck();
  }
}
