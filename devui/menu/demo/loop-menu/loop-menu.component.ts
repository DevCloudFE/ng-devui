import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MenuItemType } from 'ng-devui/menu';


function findAllParent(source: MenuItemType[], key: string) {
  const result: string[] = [];
  const loop = (list: MenuItemType[]) => {
    for (const item of list) {
      if (item.key === key) {
        // parentKeys.unshift(key);
        return true;
      }
      if (item.children?.length) {
        const t = loop(item.children);
        if (t) {
          result.unshift(item.key);
          return true;
        }
      }
    }
  };
  loop(source);
  return result;
}


@Component({
  selector: 'loop-menu',
  template: `
    <div d-menu [collapsed]="collapsed">
      <ng-container *ngFor="let item of menus; trackBy: trackByMenu">
        <loop-sub-menu
          [menu]="item"
          [openKeys]="openKeys"
          [disabledKeys]="disabledKeys"
          [activeKey]="activeKey"
          *ngIf="item.children?.length; else leafTpl" />
        <ng-template #leafTpl>
          <div d-menu-item (itemClick)="itemClick(item.key)" [disabled]="disabledKeys.includes(item.key)" [active]="item.key === activeKey">
            <d-icon class="devui-menu-item-icon" *ngIf="item.icon" [icon]="item.icon" />
            <span class="devui-menu-item-name over-flow-ellipsis">{{ item.name }}</span>
          </div>
        </ng-template>
      </ng-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  })
export class LoopMenuComponent implements OnInit {
  @Input() collapsed = false;
  @Input() menus: MenuItemType[] = [];

  // disabledKeys = [];
  disabledKeys = ['c-1', 'c-2', 'c-3-1'];

  activeKey = 'c-3-1-1';
  openKeys: string[] = [];
  // openKeys: string[] = ['c-3', 'c-3-1'];


  ngOnInit() {
    this.openKeys = findAllParent(this.menus, 'c-3-1-1');
    // console.log('openKeys', this.openKeys);
  }

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
