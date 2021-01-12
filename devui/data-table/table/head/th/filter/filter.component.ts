import {
  ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit,
  Output, SimpleChanges, TemplateRef, ViewChild
} from '@angular/core';
import { DropDownDirective } from 'ng-devui/dropdown';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { BehaviorSubject, fromEvent, Observable, of, Subscription } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { FilterConfig } from '../../../../data-table.model';
import { TableThComponent } from '../th.component';

@Component({
  selector: 'd-table-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnChanges, OnDestroy {
  @Input() beforeFilter: (value) => boolean | Promise<boolean> | Observable<boolean>;
  @Input() customFilterTemplate: TemplateRef<any>;
  @Input() searchFn: (term: string) => Observable<Array<any>>;
  @Input() filterList: Array<FilterConfig>;
  @Input() filterIconActive: boolean;
  @Input() filterMultiple = true;
  @Input() filterBoxWidth: any;
  @Input() filterBoxHeight: any;
  @Input() column: any; // 为配置column方式兼容自定义过滤模板context
  @Input() closeWhenScroll: boolean;

  @Output() filterIconActiveChange = new EventEmitter<boolean>(true);
  @Output() filterChange = new EventEmitter<FilterConfig[]>();

  @ViewChild('filterDropdown') filterDropdown;
  private sourceSubject: BehaviorSubject<any>;
  private sourceSubscription: Subscription;
  private filterSubscription: Subscription;
  private i18nSubscription: Subscription;
  private searchElement;
  checkedListForFilter = [];
  filterListDisplay = [];
  searchText = '';
  selectedItem: any;
  isFilterHidden = false;
  filterHalfChecked: boolean;
  filterAllChecked: boolean;
  i18nCommonText: I18nInterface['common'];
  filterIconActiveInner: boolean;
  DEBONCE_TIME = 300;
  constructor(private ref: ChangeDetectorRef, private i18n: I18nService, private thComponent: TableThComponent) {
    this.i18nCommonText = this.i18n.getI18nText().common;
  }

  ngOnInit() {
    if (!this.searchFn) {
      this.searchFn = (item) => {
        return of(
          (this.filterList ? this.filterList : [])
            .filter(value => value.name.toLowerCase().includes(item.toLowerCase()))
        );
      };
    }
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nCommonText = data.common;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterList'] || changes['filterMultiple'] || changes['filterIconActive']) {
      if (this.filterIconActive !== undefined) { return; }
      if (this.filterList) {
        if (!this.filterMultiple) {
          this.selectedItem = this.filterList.filter(item => item.selected)[0];
          this.filterIconActiveInner = (this.selectedItem !== undefined && !!Object.keys(this.selectedItem).length);
        } else {
          const checkedList = this.filterList.filter(item => item.checked);
          if (checkedList.length) {
            this.filterIconActiveInner = true;
          } else {
            this.filterIconActiveInner = false;
          }
        }
      }
      this.filterIconActiveChange.emit(this.filterIconActiveInner);
    }
  }

  closeFilter(dropdown: DropDownDirective) {
    dropdown.toggle();
  }

  getFilterDataMultiple() {
    // 兼容当前当用户未传入id时，使用name做重名判断
    const keyValue = this.checkedListForFilter.length ? this.checkedListForFilter[0].hasOwnProperty('id') ? 'id' : 'name' : '';
    const checkedList = this.removeDuplication(this.checkedListForFilter, keyValue).filter(item => item.checked);
    this.setFilterIconActive(checkedList);
    this.filterChange.emit(checkedList);
  }

  removeDuplication(array, key) {
    const hash = {};
    return array.reduceRight((item, next) => {
      if (!hash[next[key]]) {
        hash[next[key]] = true;
        item.push(next);
      }
      return item;
    }, []);
  }

  setFilterIconActive(checkedData) {
    if (this.filterIconActive === undefined && (Array.isArray(checkedData) ? checkedData.length : checkedData)) {
      this.filterIconActiveInner = true;
    } else {
      this.filterIconActiveInner = false;
    }
    this.filterIconActiveChange.emit(this.filterIconActiveInner);
  }

  getFilterDataRadio(item) {
    this.selectedItem = item;
    this.setFilterIconActive(item);
    this.filterChange.emit(item);
  }

  canFilter(isOpen) {
    let changeResult = Promise.resolve(true);

    if (this.beforeFilter) {
      const result: any = this.beforeFilter(isOpen);
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

  resetSources() {
    this.checkedListForFilter = [];
    if (this.sourceSubscription) {
      this.sourceSubscription.unsubscribe();
    }
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }

  onContainerScroll = () => {
    this.closeFilter(this.filterDropdown);
  }

  showFilterContent($event) {
    if (this.closeWhenScroll) {
      const tableViewElement = this.thComponent.tableViewRefElement.nativeElement.querySelector('.devui-scrollbar.scroll-view');
      if ($event) {
        document.addEventListener('scroll', this.onContainerScroll);
        tableViewElement?.addEventListener('scroll', this.onContainerScroll);
      } else {
        document.removeEventListener('scroll', this.onContainerScroll);
        tableViewElement?.removeEventListener('scroll', this.onContainerScroll);
      }
    }
    this.searchText = '';
    this.canFilter(!$event).then((change) => {
      if (!$event) {
        this.resetSources();
        return;
      }
      if (!change) {
        this.isFilterHidden = true;
        return;
      }
      this.isFilterHidden = false;
      if (!this.customFilterTemplate) {
        this.registerFilterChange();
      }
    });
  }

  filterCheckAll($event) {
    this.filterHalfChecked = false;
    this.filterListDisplay.forEach(item => {
      item.checked = $event;
      this.checkedListForFilter.push(item);
    });
  }

  setHalfChecked() {
    this.filterHalfChecked = false;
    const checked = this.filterListDisplay.filter(item => item.checked);
    if (checked.length === this.filterListDisplay.length) {
      this.filterAllChecked = true;
    } else if (checked.length > 0) {
      this.filterHalfChecked = true;
    } else {
      this.filterAllChecked = false;
      this.filterHalfChecked = false;
    }
  }

  checkboxChange($event, item) {
    this.checkedListForFilter.push(item);
    this.setHalfChecked();
  }

  searchInputValueChangeEvent() {
    this.filterSubscription = fromEvent(this.searchElement, 'input')
      .pipe(
        map((e: any) => e.target.value),
        debounceTime(this.DEBONCE_TIME) // hard code need refactory
      )
      .subscribe(term => {
        return this.sourceSubject.next(term);
      });
  }

  registerFilterChange(): void {
    this.sourceSubject = new BehaviorSubject<any>('');
    setTimeout(() => {
      this.searchElement = document.querySelector('.data-table-column-filter-content input');
      this.searchInputValueChangeEvent();
    });
    this.sourceSubscription = this.sourceSubject.pipe(switchMap(term => this.searchFn(term))).subscribe(options => {
      this.filterListDisplay = options;
      this.checkedListForFilter.push(...options.filter(item => item.checked));
      this.setHalfChecked();
      this.ref.markForCheck();
    });
  }

  ngOnDestroy() {
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();
    }
    this.resetSources();
  }
}
