import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ChangeDetectionStrategy,
  SimpleChanges,
  HostBinding,
  ChangeDetectorRef
} from '@angular/core';
import { DevUIConfig } from '../devui.config';
@Component({
  selector: 'ave-pagination',
  styleUrls: ['./pagination.component.scss'],
  templateUrl: './pagination.component.html',
  exportAs: 'pagination',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnChanges {
  static EFFECT_PAGE_RANGE_KEYS = ['total', 'pageSize', 'pageIndex', 'maxItems'];

  /**
   * 【可选】每页显示最大条目数量，默认10条
   */
  @Input() pageSize: number;
  /**
   * 【可选】用于选择更改分页每页最大条目数量的下拉框的数据源，默认为`[5, 10, 20, 50]`
   */
  @Input() pageSizeOptions: number[];
  /**
   * 【可选】初始化页码
   */
  @Input() pageIndex = 1;
  /**
   * 页码变化的回调
   */
  @Output() pageIndexChange = new EventEmitter<number>();
  /**
   * 每页最大条目数量变更时的回调
   */
  @Output() pageSizeChange = new EventEmitter<number>();
  /**
   * 分页最多显示几个按钮，默认10个
   */
  @Input() maxItems: number;
  /**
   * 【可选】前一页按钮文字，默认为左箭头图标
   */
  @Input() preLink: string;
  /**
   * 【可选】后一页按钮文字，默认为左箭头图标
   */
  @Input() nextLink: string;
  /**
   * 【可选】分页组件尺寸
   */
  @Input() size: '' | 'sm' | 'lg';
  /**
   * 【可选】是否显示分页输入跳转
   */
  @Input() canJumpPage: boolean;
  /**
   * 【可选】是否显示用于选择更改分页每页最大条目数量的下拉框
   */
  @Input() canChangePageSize: boolean;
  /**
   * 【可选】是否显示总条目
   */
  @Input() canViewTotal: boolean;
  @Input() cssClass: string;
  // 是否显示跳转按钮，默认不显示
  @Input() showJumpButton = false;
  // 翻过了页的需求要显示当前真实页面
  @Input() showTruePageIndex = false;
  @Input() id;
  @HostBinding('attr.ave-ui') aveUi = true;
  showPages = [];
  totalPage = 1;
  _total = 0;
  jumpPage = null;


  @Input() totalItemText: string;
  @Input() gotToText: string;
  /**
   * 下拉菜单默认方向
   */
  @Input() selectDirection: 'auto' | 'up' | 'down' = 'auto';

  constructor(private avenueUIConfig: DevUIConfig, private ref: ChangeDetectorRef ) {
    this.pageSize = this.avenueUIConfig['paginationCN'].pageSize;
    this.pageSizeOptions = this.avenueUIConfig['paginationCN'].pageSizeOptions;
    this.maxItems = this.avenueUIConfig['paginationCN'].maxItems;
    this.size = <any>this.avenueUIConfig['paginationCN'].size;
    this.totalItemText = this.avenueUIConfig['paginationCN'].totalItemText;
    this.gotToText = this.avenueUIConfig['paginationCN'].gotToText;
  }

  @Input() set total(total: any) {
    if (total === undefined) {
      this._total = 0;
    } else {
      if (!isNaN(parseInt(total, 10))) {
        this._total = parseInt(total, 10);
      }
    }
  }

  get total() {
    return this._total;
  }

  first() {
    if (this.pageIndex !== 1) {
      this.onPageIndexChange(1);
    }
  }

  last() {
    const last = Math.max(this.totalPage, 1);
    if (this.pageIndex !== last) {
      this.onPageIndexChange(last);
    }
  }

  prev(): void {
    if (this.hasPrev()) {
      this.onPageIndexChange(this.pageIndex - 1);
    }
  }

  next(): void {
    if (this.hasNext()) {
      this.onPageIndexChange(this.pageIndex + 1);
    }
  }

  jump() {
    const to = parseInt(this.jumpPage, 10);
    if (to) {
      if (to > 0 && to <= this.totalPage) {
        this.onPageIndexChange(to);
      }
    }
  }

  validateInput() {
    if (this.jumpPage === '') {
      return;
    }
    const value = parseInt(this.jumpPage, 10);
    this.jumpPage = value;
    if (isNaN(value)) {
      this.jumpPage = this.pageIndex;
    }
  }

  preRange() {
    const pre = this.showPages[0] - 1;
    this.onPageIndexChange(Math.max(pre, 1));
  }

  nextRange() {
    const next = this.showPages[this.showPages.length - 1] + 1;
    this.onPageIndexChange(Math.min(next, this.totalPage));
  }

  onPageIndexChange(pageIndex: number) {
    if (this.pageIndex !== pageIndex) {
      this.pageIndexChange.emit(pageIndex);
    }
  }

  onPageSizeChange(size) {
    if (this.pageSize !== size) {
      this.pageSizeChange.emit(size);
      if (Math.ceil(this.total / size) < this.totalPage) {
        this.totalPage = Math.ceil(this.total / size);
        this.onPageIndexChange(this.totalPage <= this.pageIndex ? this.totalPage : this.pageIndex);
      }
    }
  }

  hasPrev(): boolean {
    return this.pageIndex > 1;
  }

  hasNext(): boolean {
    return this.pageIndex < this.totalPage;
  }

  private getTotalPage(): number {
    return Math.ceil(this.total / this.pageSize);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const shouldUpdateRanges = PaginationComponent.EFFECT_PAGE_RANGE_KEYS.some(key => !!changes[key]);
    if (shouldUpdateRanges) {
      this.totalPage = this.getTotalPage();
      if (!this.showTruePageIndex) {
          this.pageIndex = Math.max(Math.min(this.pageIndex, this.totalPage), 1);
      }
      this.jumpPage = this.pageIndex;
      this.updateShowPageRange();
    }
  }

  private updateShowPageRange() {
    if (!this.totalPage) {
      this.showPages = [1];
      return;
    }

    if (this.totalPage <= this.maxItems) {
      this.showPages = new Array<number>(this.totalPage).fill(0).map((_, i) => i + 1);
      return;
    }
    this.showPages = this.extractRange();
  }

  private extractRange() {
    const showPages = [this.pageIndex];
    let start = this.pageIndex - 1;
    let end = this.pageIndex + 1;

    const arriveLeftBound = index => index < 1;
    const arriveRightBound = (index) => index > this.totalPage;
    const fullPageRang = (pages) => pages.length >= this.maxItems - 2;

    while (!(fullPageRang(showPages) || (arriveLeftBound(start) && arriveRightBound(end)))) {
      if (!arriveLeftBound(start)) {
        showPages.unshift((start--));
      }

      if (!fullPageRang(showPages) && !arriveRightBound(end)) {
        showPages.push(end++);
      }
    }
    return showPages;
  }
}
