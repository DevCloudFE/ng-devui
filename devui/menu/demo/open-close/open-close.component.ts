import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuItemType } from 'ng-devui/menu';
import { BASE_MENUS } from '../mock';
@Component({
  selector: 'd-open-close',
  templateUrl: './open-close.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  })
export class OpenCloseComponent {
  menus = BASE_MENUS;
  openKeys: string[] = ['c-2'];
  activeKey = 'c-2-2';

  collapsed = false;

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

  trackByMenu(_: number, item: MenuItemType) {
    return item.key;
  }
}
