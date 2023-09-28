import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MenuItemType } from 'ng-devui/menu';
import { BASE_MENUS } from '../mock';

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
  selector: 'd-auto-expand',
  templateUrl: './auto-expand.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  })
export class AutoExpandComponent implements OnInit {
  menus = BASE_MENUS;
  openKeys: string[] = [];
  activeKey = 'c-3-2';

  openChange(open: boolean, key: string) {
    if (open) {
      this.openKeys.push(key);
    } else {
      this.openKeys = this.openKeys.filter(item => item !== key);
    }
  }

  ngOnInit() {
    this.openKeys = findAllParent(this.menus, this.activeKey);
  }
  itemClick(key: string) {
    this.activeKey = key;
  }

  trackByMenu(_: number, item: MenuItemType) {
    return item.key;
  }
}
