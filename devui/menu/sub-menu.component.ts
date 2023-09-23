import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { DevConfigService, WithConfig } from 'ng-devui/utils';
import { SubmenuService } from './submenu.service';

@Component({
  selector: 'd-sub-menu',
  templateUrl: './sub-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SubmenuService],
  })
export class SubMenuComponent implements OnInit {
  _open = false;

  @Input()
  set open(value: boolean) {
    this._open = value;
  }

  get open() {
    return this._open;
  }

  @Input() disabled = false;
  @Input({ required: true }) title = '';
  @Input() icon = 'icon-op-list';
  @Output() openChange = new EventEmitter<boolean>();

  protected submenuService = inject(SubmenuService);

  ngOnInit() {
    // console.log('_open', this._open);
  }

  titleClick() {
    this.toggleOpen(!this._open);
  }

  toggleOpen(value: boolean) {
    if (this.disabled) { return; }
    this._open = value;
    this.openChange.emit(value);
  }

  disabledCls(base: string) {
    return `${base} ${this.disabled ? 'disabled' : ''}`;
  }
}
