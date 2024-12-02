import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { sum } from 'lodash-es';
import { Observable } from 'rxjs';
import { TabComponent } from './tab.component';

export interface ITabOperation {
  id: number | string;
  operation: string;
}

@Component({
  selector: 'd-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  exportAs: 'tabs',
  preserveWhitespaces: false,
})
export class TabsComponent implements OnChanges, AfterViewInit {
  static ID_SEED = 0;
  @ViewChild('tabsEle') tabsEle: ElementRef;
  @ViewChild('tabsViewport') tabsViewport: ElementRef;
  @Input() type: 'tabs' | 'pills' | 'options' | 'wrapped' | 'slider' = 'tabs';
  @Input() size: 'lg' | 'md' | 'sm' | 'xs' = 'md';
  @Input() showContent = true;
  @Input() scrollMode: boolean | 'normal' | 'auto' = false;
  @Input() activeTab: number | string;
  @Input() customWidth: string;
  @Input() reactivable = false;
  @Input() closeable = false;
  @Input() closeableIds = [];
  @Input() addable = false;
  @Input() addTabTpl: TemplateRef<any>;
  @Input() scrollModeOperationTpl: TemplateRef<any>;
  /**
   * @todo
   * 待重新设计
   */
  @Input() vertical = false;
  /**
   * @deprecated
   * class设置无需内层，外层即可
   */
  @Input() cssClass: string;
  @Input() isHidden = false;
  @Input() beforeChange: (currentValue, previousValue) => boolean | Promise<boolean> | Observable<boolean>;
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  @Output() activeTabChange = new EventEmitter<number | string>();
  @Output() addOrDeleteTabChange = new EventEmitter<ITabOperation>();
  id: string;
  offsetIndex = 0;
  offsetLeft: number;
  offsetWidth: number;
  scrollModeToggle = false;
  tabsWidth = [];
  ARROW_DROPDOWN_WIDTH = 128; // 两边箭头和下拉菜单按钮的宽度 48 + 32 + 48

  get isShowShadow() {
    return this.scrollModeToggle && ['tabs', 'pills', 'wrapped'].includes(this.type);
  }

  constructor(private el: ElementRef, private cdr: ChangeDetectorRef) {
    this.id = `devuiTabs${TabsComponent.ID_SEED++}`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { activeTab, scrollMode } = changes;
    if (scrollMode) {
      this.getTabsWidth();
    }
    if (activeTab) {
      this.changeActiveSlidingBlock();
      if (this.scrollModeToggle && this.tabsEle && this.tabs) {
        const tabs = this.tabsEle.nativeElement.querySelectorAll('li.devui-nav-tab-item');
        const index = Array.from(this.tabs).findIndex((item) => item.id === this.activeTab);
        this.offsetIndex = index;
        this.scrollIntoView(tabs[index]);
      }
    }
  }

  ngAfterViewInit(): void {
    if (this.tabs.length) {
      if (this.activeTab === undefined) {
        // 无选中页签则默认选择第一个未被禁用的页签
        const { id } = this.tabs.find((item) => !item.disabled);
        this.select(id);
      } else {
        this.changeActiveSlidingBlock();
      }
    }
    this.getTabsWidth();
    this.tabs.changes.subscribe(() => {
      this.changeActiveSlidingBlock();
      // 延时等待tabs渲染完毕
      setTimeout(() => this.getTabsWidth());
    });
  }

  changeActiveSlidingBlock(): void {
    if (this.type === 'slider' && this.tabsEle) {
      // 延时等待active样式切换至正确的tab
      setTimeout(() => {
        const tabEle = this.tabsEle.nativeElement.querySelector(`#${this.id} li.active`);
        if (tabEle) {
          const leftFix = this.scrollModeToggle ? this.tabsEle.nativeElement.scrollLeft : 0;
          this.offsetLeft = tabEle.getBoundingClientRect().left + leftFix - this.tabsEle.nativeElement.getBoundingClientRect().left;
          this.offsetWidth = tabEle.getBoundingClientRect().width;
          this.cdr.detectChanges();
        }
      });
    }
  }

  canChange(currentTab: number | string): Promise<boolean> {
    let changeResult = Promise.resolve(true);

    if (this.beforeChange) {
      const result: any = this.beforeChange(currentTab, this.activeTab);
      if (typeof result !== 'undefined') {
        if (result.then) {
          changeResult = result;
        } else if (result.subscribe) {
          changeResult = (result as Observable<boolean>).toPromise();
        } else {
          changeResult = Promise.resolve(result);
        }
      }
    }

    return changeResult;
  }

  select(id: number | string, callback?: Function): void {
    if (!this.reactivable && this.activeTab === id) {
      return;
    }
    this.canChange(id).then((change) => {
      if (!change) {
        return;
      }
      const tab = this.tabs.find((item) => item.id === id);
      if (tab && !tab.disabled) {
        this.activeTab = id;
        this.changeActiveSlidingBlock();
        if (callback) {
          callback();
        }
        this.activeTabChange.emit(id);
      }
    });
  }

  addOrDeleteTab(event: Event, id?: number | string): void {
    event.stopPropagation();
    const operation = id || id === 0 ? 'delete' : 'add';
    this.addOrDeleteTabChange.emit({ id, operation });
  }

  getTabsWidth(): void {
    if (this.scrollMode && this.tabsViewport && this.tabsEle) {
      let tabsWidthSum = 0;
      const tabs = this.tabsEle.nativeElement.querySelectorAll('li.devui-nav-tab-item');
      this.tabsWidth = [];
      tabs.forEach((tab) => {
        let width = tab.offsetWidth;
        const style = getComputedStyle(tab);
        const marginLeft = parseFloat(style.marginLeft);
        const marginRight = parseFloat(style.marginRight);
        width += marginLeft > 0 ? marginLeft : 0;
        width += marginRight > 0 ? marginRight : 0;
        tabsWidthSum += width;
        this.tabsWidth.push(width);
      });
      // 延时赋值避免脏值检查错误
      setTimeout(() => {
        const fixWidth = this.el.nativeElement.clientWidth - this.ARROW_DROPDOWN_WIDTH;
        this.scrollModeToggle = this.scrollMode === 'auto' ? tabsWidthSum > fixWidth : !!this.scrollMode;
        if (this.scrollModeToggle && this.activeTab && this.tabs) {
          const data = this.tabs.toArray();
          const index = data.findIndex((item) => item.id === this.activeTab);
          const tab = data[index];
          this.scroll(null, index, tab, true);
        }
      });
    }
  }

  scroll(direction?: string, index?: number, tab?: TabComponent, isInitScrollMode?: boolean): void {
    if (this.scrollModeToggle && this.tabsEle) {
      const tabs = this.tabsEle.nativeElement.querySelectorAll('li.devui-nav-tab-item');
      const containerWidth = this.tabsEle.nativeElement.scrollWidth;
      const scrollLeft = this.tabsEle.nativeElement.scrollLeft;
      const viewportWidth = this.tabsViewport.nativeElement.offsetWidth;
      if (direction) {
        const distance = direction === 'next' ? scrollLeft + viewportWidth : scrollLeft - viewportWidth;
        let width = 0;
        for (let i = 0; i < this.tabsWidth.length; i++) {
          width += this.tabsWidth[i];
          if (width >= distance) {
            const lastIndex = containerWidth - width < viewportWidth ? tabs.length - 1 : i;
            const nexIndex = direction === 'next' ? lastIndex : i + 1;
            this.offsetIndex = i === 0 ? 0 : nexIndex;
            break;
          }
        }
        this.scrollIntoView(tabs[this.offsetIndex]);
      } else if (index >= 0 && tab) {
        const toIndexArr = this.tabsWidth.slice(0, index);
        const width = sum(toIndexArr);
        const lastIndex = containerWidth - width < viewportWidth ? tabs.length - 1 : index;
        const fixIndex = index === 0 ? 0 : lastIndex;
        const dom = tabs[fixIndex];
        this.offsetIndex = fixIndex;
        if (isInitScrollMode) {
          // 切换为滚动模式尚未渲染完，目标dom仍在可视区，不会产生滚动，延时待渲染完毕后执行滚动
          setTimeout(() => this.scrollIntoView(dom));
        } else {
          this.select(tab.id, () => this.scrollIntoView(dom));
        }
      }
    }
  }

  scrollIntoView(dom: HTMLElement): void {
    if (dom) {
      dom.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  }
}
