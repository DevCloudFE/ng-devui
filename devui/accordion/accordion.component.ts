import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { DevConfigService, WithConfig } from 'ng-devui/utils';
import { Subscription } from 'rxjs';
import { ACCORDION } from './accordion-token';
import { AccordionItemClickEvent, AccordionMenuToggleEvent, AccordionMenuType, AccordionOptions } from './accordion.type';
@Component({
  selector: 'd-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  preserveWhitespaces: false,
  providers: [
    {
      provide: ACCORDION,
      useExisting: forwardRef(() => AccordionComponent),
    },
  ],
})
export class AccordionComponent implements AccordionOptions, OnChanges, OnInit, OnDestroy {
  @Input() data: Array<any> | AccordionMenuType;
  /* Key值定义, 用于自定义数据结构 */
  @Input() titleKey = 'title'; // 标题的key，item[titleKey]类型为string，为标题显示内容
  @Input() loadingKey = 'loading'; // 子菜单动态加载item[loadingKey]类型为boolean
  @Input() childrenKey = 'children'; // 子菜单Key
  @Input() disabledKey = 'disabled'; // 是否禁用Key
  @Input() activeKey = 'active'; // 菜单是否激活/选中
  @Input() openKey = 'open'; // 菜单是否打开

  /* 菜单模板 */
  @Input() menuItemTemplate: TemplateRef<any>; // 可展开菜单内容条模板
  @Input() itemTemplate: TemplateRef<any>; // 可点击菜单内容条模板

  @Output() menuToggle = new EventEmitter<AccordionMenuToggleEvent>(); // 可展开菜单展开事件
  @Output() itemClick = new EventEmitter<AccordionItemClickEvent>(); // 可点击菜单点击事件
  @Output() activeItemChange = new EventEmitter<any>();

  /** 高级选项和模板 */
  @Input() restrictOneOpen = false; // 限制一级菜单同时只能打开一个
  @Input() autoOpenActiveMenu = false; // 自动展开活跃菜单
  @Input() showNoContent = true; // 没有内容的时候是否显示没有数据
  @Input() noContentTemplate: TemplateRef<any>; // 没有内容的时候使用自定义模板
  @Input() loadingTemplate: TemplateRef<any>; // 加载中使用自定义模板
  @Input() innerListTemplate: TemplateRef<any>; // 可折叠菜单内容完全自定义，用做折叠面板

  /* 内置路由/链接/动态判断路由或链接类型 */
  @Input() linkType: 'routerLink' | 'hrefLink' | 'dependOnLinkTypeKey' | '' | string = '';
  @Input() linkTypeKey = 'linkType'; // linkType为'dependOnLinkTypeKey'时指定对象linkType定义区
  @Input() linkKey = 'link'; // 链接内容的key
  @Input() linkTargetKey = 'target'; // 链接目标窗口的key
  @Input() linkDefaultTarget = '_self'; // 不设置target的时候target默认值

  @Input() accordionType: 'normal' | 'embed' = 'normal';
  @Input() @WithConfig() showAnimation = true;

  activeItem; // 记录用户点击的激活菜单项
  i18nCommonText: I18nInterface['common'];
  i18nSubscription: Subscription;

  constructor(private i18n: I18nService, private devConfigService: DevConfigService) {}

  ngOnChanges(changes: SimpleChanges) {
    const { data, autoOpenActiveMenu } = changes;
    if (data) {
      this.initActiveItem();
    }
    if (autoOpenActiveMenu) {
      if (this.autoOpenActiveMenu && autoOpenActiveMenu.previousValue === false) {
        this.cleanOpenData();
      }
    }
  }

  ngOnInit() {
    if (this.data) {
      this.initActiveItem();
    }
    this.i18nCommonText = this.i18n.getI18nText().common;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nCommonText = data.common;
    });
  }

  ngOnDestroy() {
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();
    }
  }

  private flatten(arr: Array<any>, childrenKey = 'children', includeParent = false, includeLeaf = true) {
    return arr.reduce((acc, cur) => {
      const children = cur[childrenKey];
      if (children === undefined) {
        if (includeLeaf) {
          acc.push(cur);
        }
      } else {
        if (includeParent) {
          acc.push(cur);
        }
        if (Array.isArray(children)) {
          acc.push(...this.flatten(children, childrenKey, includeParent));
        }
      }
      return acc;
    }, []);
  }

  private cleanOpenData() {
    this.flatten(this.data, this.childrenKey, true, false).forEach((item) => {
      item[this.openKey] = undefined;
    });
  }
  // 默认激活
  initActiveItem() {
    const activeItem = this.flatten(this.data, this.childrenKey)
      .filter((item) => item[this.activeKey])
      .pop();
    if (activeItem) {
      if (!this.activeItem) {
        this.activeItemFn(activeItem);
      }
    } else {
      this.activeItem = undefined;
    }
  }

  // 点击了可点击菜单
  public itemClickFn = (itemEvent: AccordionItemClickEvent) => {
    const prevActiveItem = this.activeItem;
    this.activeItemFn(itemEvent.item);
    this.itemClick.emit({ ...itemEvent, prevActiveItem: prevActiveItem });
  };

  linkItemClickFn = (itemEvent: AccordionItemClickEvent) => {
    const prevActiveItem = this.activeItem;
    this.activeItem = itemEvent.item;
    this.itemClick.emit({ ...itemEvent, prevActiveItem: prevActiveItem });
  };

  // 打开或关闭可折叠菜单
  public menuToggleFn = (menuEvent: AccordionMenuToggleEvent) => {
    this.openMenuFn(menuEvent.item, menuEvent.open);
    this.menuToggle.emit(menuEvent);
  };

  // 激活子菜单项并去掉其他子菜单的激活
  activeItemFn(item) {
    if (this.activeItem && this.activeItem[this.activeKey]) {
      this.activeItem[this.activeKey] = false;
    }
    item[this.activeKey] = true;
    this.activeItem = item;
    this.activeItemChange.emit(this.activeItem);
  }

  // 打开或关闭一级菜单，如果有限制只能展开一项则关闭其他一级菜单
  openMenuFn(item, open) {
    if (open && this.restrictOneOpen) {
      (this.data as any[]).forEach((itemtemp) => {
        itemtemp[this.openKey] = false;
      });
    }
    item[this.openKey] = open;
  }
}
