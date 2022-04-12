import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Observable } from 'rxjs';
import { TabComponent } from './tab.component';

@Component({
  selector: 'd-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  exportAs: 'tabs',
  preserveWhitespaces: false,
})
export class TabsComponent implements OnInit, AfterContentInit, OnChanges, AfterViewInit {
  static ID_SEED = 0;
  @Input() type: 'tabs' | 'pills' | 'options' | 'wrapped' | 'slider' = 'tabs';
  @Input() showContent = true;
  @Input() activeTab: number | string;
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
  @Input() customWidth: string;
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  @Output() activeTabChange = new EventEmitter<number | string>();
  @Input() beforeChange: (value) => boolean | Promise<boolean> | Observable<boolean>;
  @Input() reactivable = false;
  @ViewChild('tabsEle') tabsEle: ElementRef;
  offsetLeft;
  offsetWidth;
  id;
  constructor() {
    this.id = 'devuiTabs' + TabsComponent.ID_SEED++;
  }
  ngAfterViewInit(): void {
    if (this.type === 'slider' && this.activeTab === undefined && this.tabs.length > 0 && this.tabs[0]) {
      this.select(this.tabs.first.id, this.tabsEle.nativeElement.getElementById(this.tabs[0].id));
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.type === 'slider' && changes['activeTab']) {
      // 延时等待active样式切换至正确的tab
      setTimeout(() => {
        const tabEle = this.tabsEle.nativeElement.querySelector('#' + this.id + ' li.active');
        if (tabEle) {
          this.offsetLeft = tabEle.getBoundingClientRect().left - this.tabsEle.nativeElement.getBoundingClientRect().left;
          this.offsetWidth = tabEle.getBoundingClientRect().width;
        }
      });
    }
  }

  ngOnInit() {
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
  ngAfterContentInit(): void {
    if (this.type !== 'slider' && this.activeTab === undefined && this.tabs.length > 0) {
      this.select(this.tabs.first.id);
    }
  }

  select(id: number | string, tabEl?) {
    if (!this.reactivable && this.activeTab === id) {
      return;
    }
    this.canChange(id).then((change) => {
      if (!change) {
        return;
      }
      const tab = this.tabs.find(item => item.id === id);
      if (tab && !tab.disabled) {
        this.activeTab = id;
        if (this.type === 'slider' && tabEl && this.tabsEle) {
          this.offsetLeft = tabEl.getBoundingClientRect().left - this.tabsEle.nativeElement.getBoundingClientRect().left;
          this.offsetWidth = tabEl.getBoundingClientRect().width;
        }
        this.activeTabChange.emit(id);
      }
    });
  }

}
