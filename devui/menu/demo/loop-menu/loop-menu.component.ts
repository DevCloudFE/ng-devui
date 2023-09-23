import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MenuItemType } from 'ng-devui/menu';

@Component({
  selector: 'loop-menu',
  template: `
    <div d-menu>
      <ng-container *ngFor="let item of menus; trackBy: trackByMenu">
        <loop-sub-menu [menu]="item" [openKeys]="openKeys" [activeKey]="activeKey" *ngIf="item.children?.length; else leafTpl" />
        <ng-template #leafTpl>
          <div d-menu-item (itemClick)="itemClick(item.key)" [active]="item.key === activeKey">
            <d-icon class="devui-menu-item-icon" icon="icon-op-list" />
            <span class="devui-menu-item-name over-flow-ellipsis">{{ item.name }}</span>
          </div>
        </ng-template>
      </ng-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  })
export class LoopMenuComponent implements OnInit {
  @Input() menus: MenuItemType[] = [];

  openKeys: string[] = ['c-3', 'c-3-1'];
  activeKey = 'c-3-1-1';

  ngOnInit() { }

  /* openChange(open: boolean, key: string) {
    if (open) {
      this.openKeys = [key];
    } else {
      this.openKeys = [];
    }
  } */
  openChange(open: boolean, key: string) {
    if (open) {
      this.openKeys.push(key);
    } else {
      this.openKeys = this.openKeys.filter(item => item !== key);
    }
    // console.log('this.openKeys', this.openKeys);
  }

  itemClick(key: string) {
    this.activeKey = key;
  }

  trackByMenu(_: number, item: MenuItemType) {
    return item.key;
  }
}
