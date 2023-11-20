import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MenuItemType } from 'ng-devui/menu';

const MENUS: MenuItemType[] = [
  {
    key: 'c-1',
    icon: 'icon-more-func',
    name: 'Content 1 (as a leaf menu)'
  },
  {
    key: 'c-2',
    name: 'Content 2 (as a parent menu, has children)',
    icon: 'icon-more-func',
    children: [
      {
        key: 'c-2-1',
        name: 'Content 2 Child 1'
      },
      {
        key: 'c-2-2',
        name: 'Content 2 Child 2'
      },
      {
        key: 'c-2-3',
        name: 'Content 2 Child 3'
      },
    ]
  }, {
    key: 'c-3',
    name: 'Content 3 (as a parent menu, has children)',
    icon: 'icon-more-func',
    children: [
      {
        key: 'c-3-1',
        name: 'Content 3 Child 1'
      },
      {
        key: 'c-3-2',
        name: 'Content 3 Child 2',
      },
      {
        key: 'c-3-3',
        name: 'Content 3 Child 3',
      },
      {
        key: 'c-3-4',
        name: 'Content 3 Child 4',
      },
    ]
  },
  {
    key: 'c-4',
    icon: 'icon-more-func',
    name: 'Content 4 (as a leaf menu)',
  }
];

function findAllParent(source: MenuItemType[], key: string) {
  const result: string[] = [];
  const loop = (list: MenuItemType[]) => {
    for (const item of list) {
      if (item.key === key) {
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
  menus = MENUS;
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
