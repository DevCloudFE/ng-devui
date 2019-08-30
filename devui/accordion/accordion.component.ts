import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { AccordionMenuType } from './accordion.type';

@Component({
  selector: 'd-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnChanges, OnInit {
  @Input() data: Array<any> | AccordionMenuType;
  /* Key值定义 */
  @Input() titleKey = 'title'; // 标题的key，item[titleKey]类型为string，为标题显示内容
  @Input() loadingKey = 'loading'; // 子菜单动态加载item[loadingKey]类型为boolean
  @Input() childrenKey = 'children'; // 一级菜单子菜单Key
  @Input() disabledKey = 'disabled'; // 是否禁用Key
  @Input() activeKey = 'active'; // 二级菜单是否激活
  @Input() openKey = 'open'; // 一级菜单是否打开

  /* 一级菜单二级菜单模板 */
  @Input() menuItemTemplate: TemplateRef<any>; // 一级菜单内容条模板
  @Input() itemTemplate: TemplateRef<any>; // 二级菜单内容条模板

  @Output() menuToggle = new EventEmitter<{item: any, open: boolean}>(); // 一级菜单展开事件
  @Output() itemClick = new EventEmitter<any>(); // 二级菜单点击事件

  /** 高级选项和模板 */
  @Input() restrictOneOpen = false; // 限制一级菜单同时只能打开一个
  @Input() showNoContent = true; // 没有内容的时候是否显示没有数据
  @Input() noContentTemplate: TemplateRef<any>; // 没有内容的时候使用自定义模板
  @Input() loadingTemplate: TemplateRef<any>; // 加载中使用自定义模板
  @Input() innerListTemplate: TemplateRef<any>; // 二级菜单内容完全自定义，用做折叠面板

  /* 内置路由/链接/动态判断路由或链接类型 */
  @Input() linkType: 'routerLink' | 'hrefLink' | 'dependOnLinkTypeKey'| '' = '';
  @Input() linkTypeKey = 'linkType'; // linkType为'dependOnLinkTypeKey'时指定对象linkType定义区
  @Input() linkKey = 'link'; // 链接内容的key
  @Input() linkTargetKey = 'target'; // 链接目标窗口的key
  @Input() linkDefaultTarget = '_self'; // 不设置target的时候target默认值

  activeItem; // 记录用户点击的激活菜单项
  i18nText;

  constructor() {
    this.i18nText = {
      LOADING_TEXT: '加载中...',
      NO_DATA: '没有数据'
    };
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
       this.initActiveItem();
    }
  }

  ngOnInit() {
    if (this.data) {
      this.initActiveItem();
    }
  }

  // 默认激活
  initActiveItem() {
    const activeItem = (<Array<any>>(this.data)).map(arrItem => {
      return arrItem[this.childrenKey]
        && arrItem[this.childrenKey].filter(child => child[this.activeKey])
        || [];
    }).reduce((acc: Array<any>, cur: Array<any>) => {
      acc = acc || [];
      if (cur.length > 0) {
        acc.push(...cur);
      }
      return acc;
    }).pop();
    if (activeItem) {
      this.activeItemFn(activeItem);
    } else {
      this.activeItem = undefined;
    }
  }

  // 点击了二级菜单
  public itemClickFn = (item) => {
    this.activeItemFn(item);
    this.itemClick.emit(item);
  }

  // 打开或关闭一级菜单
  public menuToggleFn = (item) => {
    this.openMenuFn(item, !(item.open || false));
    this.menuToggle.emit({item: item, open: item.open });
  }

  // 激活子菜单项并去掉其他子菜单的激活
  activeItemFn(item) {
    if (this.activeItem) {
      this.activeItem[this.activeKey] = false;
    }
    item[this.activeKey] = true;
    this.activeItem = item;
  }

  // 打开或关闭一级菜单，如果有限制只能展开一项则关闭其他一级菜单
  openMenuFn(item, open) {
    if (open && this.restrictOneOpen) {
      (<Array<any>>(this.data)).forEach( citem => { citem[this.openKey] = false; });
    }
    item[this.openKey] = open;
  }
}
