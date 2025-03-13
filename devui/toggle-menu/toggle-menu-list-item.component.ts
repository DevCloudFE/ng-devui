import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { ToggleMenuListItem } from './toggle-menu.type';

@Component({
    selector: 'd-toggle-menu-list-item',
    templateUrl: './toggle-menu-list-item.component.html',
    styleUrls: ['./toggle-menu-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ToggleMenuListItemComponent {
  @Input() item: ToggleMenuListItem;
  @Input() index: number;
  @Input() selectIndex: number;
  @Input() activeIndex: number;
  /**
   * 【可选】决定下拉框每项文字如何显示，默认显示filterKey字段或者本身的值
   */
  // @deprecated
  @Input() formatter: (item: any) => string;
  /**
   * 【当传入资源（options）类型为Array<{key: value}，必选】针对传入资源options的每项对应字段做过滤操作
   */
  @Input() filterKey: string;
  /**
   * 【当传入资源（options）类型为Array<{key: value}，必选】针对传入资源options的每项对应字段做禁用操作的key
   */
  @Input() optionDisabledKey = '';
  /**
   * 【当传入资源（options）类型为Array<{key: value}，可选】如使用分组需设置
   */
  @Input() optionGroupKey = '';
  /**
   * 【可选】是否允许高亮选项
   */
  @Input() highlightToggle = true;
  /**
   * 【可选】下拉高亮css
   */
  @Input() highlightItemClass = 'active';
  /**
   * 【可选】是否支持多选
   */
  @Input() multiple: boolean;
  /**
   * 【可选】是否需要关键字高亮显示
   */
  @Input() isShowKeyword: boolean;
  /**
   * 【可选】auto-complete 中需要高亮显示的关键字
   */
  @Input() keyword: string;
  @Input() customTemplate: TemplateRef<any>;

  // @deprecated
  @Input() color: string;
  @Output() chooseItem = new EventEmitter<any>();

  constructor() {
    this.formatter = (item) => (item ? item[this.filterKey] || item.label || item.toString() : '');
  }

  choose(option, index, event?: Event) {
    this.chooseItem.emit({ option, index, event });
  }
}
