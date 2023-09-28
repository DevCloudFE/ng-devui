import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuItemType } from 'ng-devui/menu';
import { BASE_MENUS } from '../mock';
@Component({
  selector: 'd-open-one',
  templateUrl: './open-one.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  })
export class OpenOneComponent {
  menus = BASE_MENUS;

  openKey = 'c-2';
  activeKey = 'c-2-2';

  openChange(open: boolean, key: string) {
    if (open) {
      this.openKey = key;
    } else {
      this.openKey = '';
    }
  }

  itemClick(key: string) {
    this.activeKey = key;
  }

  trackByMenu(_: number, item: MenuItemType) {
    return item.key;
  }
}
