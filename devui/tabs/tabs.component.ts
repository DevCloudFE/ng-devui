import {
  AfterContentInit,
  AfterViewInit,
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
  ViewChild
} from '@angular/core';
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
export class TabsComponent implements AfterContentInit, OnChanges, AfterViewInit {
  static ID_SEED = 0;
  @ViewChild('tabsEle') tabsEle: ElementRef;
  @ViewChild('tabsViewport') tabsViewport: ElementRef;
  @Input() type: 'tabs' | 'pills' | 'options' | 'wrapped' | 'slider' = 'tabs';
  @Input() size: 'lg' | 'md' | 'sm' | 'xs' = 'md';
  @Input() showContent = true;
  @Input() scrollMode = false;
  @Input() activeTab: number | string;
  @Input() customWidth: string;
  @Input() reactivable = false;
  @Input() closeable = false;
  @Input() closeableIds = [];
  @Input() addable = false;
  @Input() addTabTpl: TemplateRef<any>;
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
  @Input() beforeChange: (value) => boolean | Promise<boolean> | Observable<boolean>;
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  @Output() activeTabChange = new EventEmitter<number | string>();
  @Output() addOrDeleteTabChange = new EventEmitter<ITabOperation>();
  id: string;
  offsetIndex = 0;
  offsetLeft: number;
  offsetWidth: number;
  tabsWidth = [];

  get isShowShadow() {
    return this.scrollMode && ['tabs', 'pills', 'wrapped'].includes(this.type);
  }

  constructor() {
    this.id = `devuiTabs${TabsComponent.ID_SEED++}`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.type === 'slider' && changes['activeTab']) {
      this.changeActiveSlidingBlock();
    }
  }

  ngAfterViewInit(): void {
    if (this.type === 'slider' && this.activeTab === undefined && this.tabs.length > 0 && this.tabs[0]) {
      this.select(this.tabs.first.id, this.tabsEle.nativeElement.getElementById(this.tabs[0].tabId));
    }
    this.getTabsWidth();

    this.tabs.changes.subscribe(() => {
      this.changeActiveSlidingBlock();
      this.getTabsWidth();
    });
  }

  ngAfterContentInit(): void {
    if (this.type !== 'slider' && this.activeTab === undefined && this.tabs.length > 0) {
      this.select(this.tabs.first.id);
    }
  }

  changeActiveSlidingBlock() {
    // 延时等待active样式切换至正确的tab
    setTimeout(() => {
      const tabEle = this.tabsEle.nativeElement.querySelector(`#${this.id} li.active`);
      if (tabEle) {
        const leftFix = this.scrollMode ? this.tabsEle.nativeElement.scrollLeft : 0;
        this.offsetLeft = tabEle.getBoundingClientRect().left + leftFix - this.tabsEle.nativeElement.getBoundingClientRect().left;
        this.offsetWidth = tabEle.getBoundingClientRect().width;
      }
    });
  }

  canChange(currentTab: number | string) {
    let changeResult = Promise.resolve(true);

    if (this.beforeChange) {
      const result: any = this.beforeChange(currentTab);
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

  select(id: number | string, tabEl?) {
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
        if (this.type === 'slider' && tabEl && this.tabsEle) {
          const leftFix = this.scrollMode ? this.tabsEle.nativeElement.scrollLeft : 0;
          this.offsetLeft = tabEl.getBoundingClientRect().left + leftFix - this.tabsEle.nativeElement.getBoundingClientRect().left;
          this.offsetWidth = tabEl.getBoundingClientRect().width;
        }
        this.activeTabChange.emit(id);
      }
    });
  }

  checkCloseable(tab) {
    const closeable = this.closeable && (this.closeableIds.length === 0 || this.closeableIds.includes(tab.id));
    return !tab.disabled && !tab.titleTpl && closeable;
  }

  addOrDeleteTab(event, id?: number | string) {
    event.stopPropagation();
    const operation = id || id >= 0 ? 'delete' : 'add';
    this.addOrDeleteTabChange.emit({ id, operation });
  }

  getTabsWidth() {
    if (this.scrollMode && this.tabsViewport && this.tabsEle) {
      const tabs = this.tabsEle.nativeElement.querySelectorAll('li.devui-nav-tab-item[role=presentation]');
      this.tabsWidth = [];
      tabs.forEach((tab) => {
        const style = getComputedStyle(tab);
        const width = parseFloat(style.marginLeft) + tab.offsetWidth + parseFloat(style.marginRight);
        this.tabsWidth.push(width);
      });
    }
  }

  scroll(direction?: string, index?: number, tab?: TabComponent) {
    if (this.scrollMode && this.tabsEle) {
      let dom;
      const tabs = this.tabsEle.nativeElement.querySelectorAll('li[role=presentation]');
      if (direction) {
        const containerWidth = this.tabsEle.nativeElement.scrollWidth;
        const scrollLeft = this.tabsEle.nativeElement.scrollLeft;
        const viewportWidth = this.tabsViewport.nativeElement.offsetWidth;
        const distance = direction === 'next' ? scrollLeft + viewportWidth : scrollLeft - viewportWidth;
        let width = 0;
        for (let i = 0; i < this.tabsWidth.length; i++) {
          width += this.tabsWidth[i];
          if (width >= distance) {
            this.offsetIndex = direction === 'next' || i === 0 ? (containerWidth - width < viewportWidth ? tabs.length - 1 : i) : i + 1;
            break;
          }
        }
        dom = tabs[this.offsetIndex];
      } else if (index >= 0) {
        dom = tabs[index];
        this.offsetIndex = index;
        this.activeTab = tab.id;
        this.activeTabChange.emit(this.activeTab);
      }
      if (dom) {
        dom.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      }
    }
  }
}
