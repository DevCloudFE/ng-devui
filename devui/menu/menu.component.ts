import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuItemClickType } from './type';

@Component({
  selector: 'd-menu, [dMenu]',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  })
export class MenuComponent implements OnInit, OnChanges, OnDestroy {
  @HostBinding('class.collapsed') @Input() collapsed = false;
  @HostBinding('class.devui-menu') menuClass = true;
  collapsedSubject = new BehaviorSubject(this.collapsed);
  collapsed$ = this.collapsedSubject.asObservable();

  @Output() readonly menuItemClick = new EventEmitter<MenuItemClickType>();

  ngOnChanges({ collapsed }: SimpleChanges): void {
    if (collapsed) {
      this.collapsedSubject.next(collapsed.currentValue);
    }
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.collapsedSubject.next(false);
    this.collapsedSubject.complete();
  }
}
