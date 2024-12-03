import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, Subscription, fromEvent, of } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';

@Component({
  selector: 'd-toggle-menu-search',
  templateUrl: './toggle-menu-search.component.html',
  styleUrls: [`./toggle-menu-search.component.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class ToggleMenuSearchComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() searchPlaceholder: string;
  @Input() isShowSearchIcon = true;
  @Input() inputValue: string;
  @Input() inputWidth: string;
  @Input() filterKey: string;
  @Input() maxLength: number;
  @Input() disabled = false;
  @Input() spellcheck = false;
  @Input() options = [];
  @Input() delay = 300;
  /**
   * 【可选】决定下拉框没项文字如何显示，默认显示filterKey字段或者本身的值
   */
  // @deprecated
  @Input() formatter: (item: any) => string;
  /**
   * 【可选】搜索函数，当需要自定义下拉选择过滤规则时可以使用
   *  请保证返回值有id和option字段，id是确保尤其多选的时候能正确索引对应选项
   *  简单实现参考：
   *  search = (term) => {
   *    return of(
   *     [Lily, May, Jorsh, Shiwa, Nanth]
   *     .map((option, index) => ({id: index, option: option}))
   *     .filter(item => item.option.name.toLowerCase().indexOf(term.toLowerCase()) !== -1)
   *   );
   *  }
   */
  @Input() searchFn: (term: string) => Observable<Array<{ id: string | number; option: any }>>;
  @Output() searchInputValueChange = new EventEmitter<any>();
  @HostBinding('style.width')
  get width() {
    return this.inputWidth || 'inherit';
  }

  filterSubscription: Subscription;

  constructor(public el: ElementRef) {
    this.formatter = (item) => {
      const str = String(item) ? item.toString() : '';
      return typeof item === 'object' ? item[this.filterKey] || '' : str;
    };
  }

  ngOnInit() {
    if (!this.searchFn) {
      this.searchFn = (term: any) => {
        return of(
          (this.options ? this.options : [])
            .map((option, index) => ({ id: index, option }))
            .filter((item) => this.formatter(item.option).toLowerCase().indexOf(term.toLowerCase()) !== -1)
        );
      };
    }
  }

  ngAfterViewInit() {
    this.el.nativeElement.focus();
    if (!this.filterSubscription) {
      // 避免重复订阅
      this.filterSubscription = fromEvent(this.el.nativeElement, 'input')
        .pipe(
          map((e: any) => e.target.value),
          filter((term) => !this.disabled && this.searchFn && term.length >= 0),
          debounceTime(this.delay)
        )
        .subscribe((term) => this.searchInputValueChange.emit(term));
    }
  }

  ngOnDestroy() {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }
}
