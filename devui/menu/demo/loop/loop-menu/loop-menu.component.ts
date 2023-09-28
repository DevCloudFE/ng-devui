import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, inject } from '@angular/core';
import { MenuItemClickType, MenuItemType } from 'ng-devui/menu';

@Component({
  selector: 'loop-menu',
  template: `
    <div d-menu [collapsed]="collapsed" (menuItemClick)="menuItemClick($event)">
      <ng-container *ngFor="let item of menus; trackBy: trackByMenu">
        <loop-sub-menu
          [menu]="item"
          *ngIf="item.children?.length; else leafTpl" />
        <ng-template #leafTpl>
          <div
            d-menu-item
            [noStyle]="false"
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
  protected cdr = inject(ChangeDetectorRef);
  menuItemClick(event: MenuItemClickType) {
    console.log('menuItemClick', event);
  }
  trackByMenu(_: number, item: MenuItemType) {
    return item.key;
  }
}
