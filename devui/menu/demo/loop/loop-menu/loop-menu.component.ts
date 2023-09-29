import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MenuItemType } from 'ng-devui/menu';

@Component({
  selector: 'loop-menu',
  template: `
    <div d-menu [collapsed]="collapsed">
      <ng-container *ngFor="let item of menus; trackBy: trackByMenu">
        <loop-sub-menu
          [menu]="item"
          [activeKey]="activeKey"
          (itemClick)="itemClick($event)"
          *ngIf="item.children?.length; else leafTpl" />
        <ng-template #leafTpl>
          <div
            d-menu-item
            [active]="activeKey === item.key"
            (itemClick)="itemClick(item.key)"
            dTooltip [content]="collapsed ? item.name : ''" position="right">
            <d-icon class="devui-menu-item-icon" *ngIf="item.icon" [icon]="item.icon" />
            <span class="devui-menu-item-name over-flow-ellipsis">{{ item.name }}</span>
          </div>
        </ng-template>
      </ng-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  })
export class LoopMenuComponent {
  @Input() collapsed = false;
  @Input() menus: MenuItemType[] = [];

  activeKey = '';

  itemClick(key: string) {
    this.activeKey = key;
  }

  trackByMenu(_: number, item: MenuItemType) {
    return item.key;
  }
}
