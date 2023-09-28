import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { MenuItemType } from 'ng-devui/menu';
import { LoopMenuComponent } from './loop-menu.component';
@Component({
  selector: 'loop-sub-menu',
  template: `
    <div
      d-sub-menu
      [title]="menu.name"
      [icon]="menu.icon">
      <ng-container *ngFor="let item of menu.children; trackBy: trackByMenu">
        <loop-sub-menu [menu]="item" *ngIf="item.children?.length; else leafTpl" />
        <ng-template #leafTpl>
          <div d-menu-item>
            <d-icon class="devui-menu-item-icon" *ngIf="item.icon" [icon]="item.icon" />
            <span class="devui-menu-item-name over-flow-ellipsis">{{ item.name }}</span>
          </div>
        </ng-template>
      </ng-container>
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  })
export class LoopSubMenuComponent {
  protected loopMenuComponent = inject(LoopMenuComponent);
  @Input({ required: true }) menu: MenuItemType;
  trackByMenu(_: number, item: MenuItemType) {
    return item.key;
  }
}
