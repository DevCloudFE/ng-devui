import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { MenuItemType } from 'ng-devui/menu';

@Component({
  selector: 'd-loop-sub-menu',
  template: `
    <div
      dSubMenu
      [title]="menu.name"
      [icon]="menu.icon">
      <ng-container *ngFor="let item of menu.children; trackBy: trackByMenu">
        <d-loop-sub-menu [menu]="item" [activeKey]="activeKey" (itemClick)="onClick($event)" *ngIf="item.children?.length; else leafTpl" />
        <ng-template #leafTpl>
          <div dMenuItem [active]="activeKey === item.key" (itemClick)="onClick(item.key)">
            <d-icon class="devui-menu-item-icon" *ngIf="item.icon" [icon]="item.icon" />
            <span class="devui-menu-item-name over-flow-ellipsis">{{ item.name }}</span>
          </div>
        </ng-template>
      </ng-container>
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  })
export class LoopSubMenuComponent {
  @Input() activeKey = '';
  @Input({ required: true }) menu: MenuItemType;
  @Output() itemClick = new EventEmitter<string>();

  onClick(key) {
    this.itemClick.emit(key);
  }

  trackByMenu(_: number, item: MenuItemType) {
    return item.key;
  }
}
