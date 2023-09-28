import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, inject } from '@angular/core';
import { MenuItemClickType, MenuItemType } from 'ng-devui/menu';

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
    <div d-menu [collapsed]="collapsed" (menuItemClick)="menuItemClick($event)">
      <ng-container *ngFor="let item of menus; trackBy: trackByMenu">
        <loop-sub-menu
          [menu]="item"
          [openKeys]="openKeys"
          [disabledKeys]="disabledKeys"
          [activeKey]="activeKey"
          *ngIf="item.children?.length; else leafTpl" />
        <ng-template #leafTpl>
          <div
            d-menu-item
            [noStyle]="false"
            (itemClick)="itemClick(item.key)"
            [disabled]="disabledKeys.includes(item.key)"
            [active]="item.key === activeKey"
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
export class LoopMenuComponent implements OnInit, AfterViewInit {
  @Input() collapsed = false;
  @Input() menus: MenuItemType[] = [];

  disabledKeys = [];
  // disabledKeys = ['c-1', 'c-2', 'c-3-1'];

  activeKey = 'c-3-1-1';
  openKeys: string[] = [];
  // openKeys: string[] = ['c-3', 'c-3-1'];
  protected cdr = inject(ChangeDetectorRef);
  ngOnInit() {
    this.openKeys = findAllParent(this.menus, this.activeKey);
  }
  ngAfterViewInit() { }

  /* openChange(open: boolean, key: string) {
    if (open) {
      this.openKeys = [key];
    } else {
      this.openKeys = [];
    }
  } */
  openChange(open: boolean, key: string) {
    if (open) {
      this.openKeys = this.openKeys.concat(key);
    } else {
      this.openKeys = this.openKeys.filter(item => item !== key);
    }
    // console.log('this.openKeys', this.openKeys);
  }

  itemClick(key: string) {
    this.activeKey = key;
  }

  menuItemClick(event: MenuItemClickType) {
    console.log('menuItemClick', event);
  }

  trackByMenu(_: number, item: MenuItemType) {
    return item.key;
  }
}
