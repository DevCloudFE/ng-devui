import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  Directive,
  HostBinding,
  EventEmitter,
  Output
} from '@angular/core';
import { DevConfigService, WithConfig } from 'ng-devui/utils';
import { MenuItemType } from './type';
import { HostListener } from '@angular/core';

@Directive({
  selector: '[d-menu-item]',
  exportAs: 'dMenuItem',
  host: {
  '[class.devui-menu-item]': 'true',
  }
  })
export class MenuItemDirective implements OnInit {
  @HostBinding('class.disabled') @Input() disabled = false;
  @HostBinding('class.active') @Input() active = false;
  // @HostBinding('class.active') _active = this.active;

  @Output() itemClick = new EventEmitter<MouseEvent>();

  @HostListener('click', ['$event']) hostClick(event: MouseEvent) {
    // this._active = true;
    this.itemClick.emit(event);
  }

  ngOnInit() { }
}
