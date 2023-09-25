import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { MenuItemType } from 'ng-devui/menu';
import { LoopMenuComponent } from './loop-menu.component';
@Component({
  selector: 'loop-sub-menu',
  template: `
  <!-- [noStyle]="true" -->
    <div
      d-sub-menu
      [title]="menu.name"
      [icon]="menu.icon"
      [disabled]="disabledKeys.includes(menu.key)"
      [open]="openKeys.includes(menu.key)"
      (openChange)="loopMenuComponent.openChange($event, menu.key)">
      <!-- <div class="my-title" title>
          <b><i>{{menu.name}}</i></b>
        </div> -->
      <!-- <ng-template #titleTpl let-open="open" let-disabled="disabled">
        <div class="my-title">
          <b><i>my title-{{open}}</i></b>
        </div>
      </ng-template> -->
      <ng-container *ngFor="let item of menu.children; trackBy: trackByMenu">
        <loop-sub-menu
          [menu]="item"
          [disabledKeys]="disabledKeys"
          [openKeys]="openKeys"
          [activeKey]="activeKey"
          *ngIf="item.children?.length; else leafTpl" />
        <ng-template #leafTpl>
          <div d-menu-item (itemClick)="loopMenuComponent.itemClick(item.key)" [active]="item.key === activeKey">
            <d-icon class="devui-menu-item-icon" *ngIf="item.icon" [icon]="item.icon" />
            <span class="devui-menu-item-name over-flow-ellipsis">{{ item.name }}</span>
          </div>
        </ng-template>
      </ng-container>
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  })
export class LoopSubMenuComponent implements OnInit, OnChanges {

  @Input() disabledKeys: string[] = [];
  @Input() openKeys: string[] = [];
  @Input() activeKey = '';

  protected loopMenuComponent = inject(LoopMenuComponent);
  @Input({ required: true }) menu: MenuItemType;

  ngOnChanges({ openKeys }: SimpleChanges): void {
    // console.log('wat openKeys', openKeys);
  }


  ngOnInit() { }

  trackByMenu(_: number, item: MenuItemType) {
    return item.key;
  }
}
