import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuItemClickType, MenuItemType } from 'ng-devui/menu';
import { BASE_MENUS } from '../mock';
@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  })
export class BasicComponent {
  menus = BASE_MENUS;
  disabledKeys = ['c-1', 'c-2', 'c-3-1'];
  openKeys: string[] = ['c-3', 'c-2'];
  activeKey = 'c-3-2';

  openChange(open: boolean, key: string) {
    if (open) {
      this.openKeys.push(key);
    } else {
      this.openKeys = this.openKeys.filter(item => item !== key);
    }
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
