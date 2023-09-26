import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { DevConfigService, WithConfig } from 'ng-devui/utils';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: '[d-menu]',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
  '[class.devui-menu]': 'true',
  }
  })
export class MenuComponent implements OnInit, OnChanges, OnDestroy {
  // @Input() options: MenuItemType[] = [];
  @HostBinding('class.collapsed') @Input() collapsed = false;

  collapsedSubject = new BehaviorSubject(this.collapsed);
  collapsed$ = this.collapsedSubject.asObservable();

  ngOnChanges({ collapsed }: SimpleChanges): void {
    if (collapsed && !collapsed.firstChange) {
      this.collapsedSubject.next(collapsed.currentValue);
    }
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.collapsedSubject.next(false);
    this.collapsedSubject.complete();
  }
}
