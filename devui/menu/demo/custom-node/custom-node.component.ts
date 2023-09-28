import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuItemType } from 'ng-devui/menu';
import { BASE_MENUS } from '../mock';
@Component({
  selector: 'd-custom-node',
  templateUrl: './custom-node.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  })
export class CustomNodeComponent {
  menus = BASE_MENUS;
  openKeys: string[] = [];
  activeKey = '';

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
