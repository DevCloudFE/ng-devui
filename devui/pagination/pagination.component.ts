import { ConnectedPosition } from '@angular/cdk/overlay';
import {
  AfterViewInit,
  ApplicationRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { DropDownAppendToBodyComponent } from 'ng-devui/dropdown';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { AppendToBodyDirection } from 'ng-devui/utils';
import { Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'd-pagination',
  styleUrls: ['./pagination.component.scss'],
  templateUrl: './pagination.component.html',
  exportAs: 'pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class PaginationComponent implements OnChanges, AfterViewInit, OnDestroy, OnInit {
  static EFFECT_PAGE_RANGE_KEYS = ['total', 'pageSize', 'pageIndex', 'maxItems', 'pageSizeOptions'];

  /**
   * 【可选】每页显示最大条目数量，默认10条
   */
  @Input() pageSize = 10;
  /**
   * 【可选】用于选择更改分页每页最大条目数量的下拉框的数据源，默认为`[5, 10, 20, 50]`
   */
  @Input() pageSizeOptions: number[] = [5, 10, 20, 50];
  @Input() pageSizeDirection: Array<AppendToBodyDirection | ConnectedPosition> = ['rightDown', 'rightUp'];
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
  @Input() maxItems = 10;
  /**
   * @depreted 存在xxs风险，后续将替换为模板，使用方需根据自身场景做好防护
   * 【可选】前一页按钮文字，默认为左箭头图标
   */
  @Input() preLink: string;
  /**
   * @depreted 存在xxs风险，后续将替换为模板，使用方需根据自身场景做好防护
   * 【可选】后一页按钮文字，默认为左箭头图标
   */
  @Input() nextLink: string;
  /**
   * 【可选】分页组件尺寸
   */
  @Input() size: '' | 'sm' | 'lg' = '';
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
  /**
   * @deprecated
   */
  @Input() cssClass: string;
  // 是否显示跳转按钮，默认不显示
  @Input() showJumpButton = false;
  // 翻过了页的需求要显示当前真实页面
  @Input() showTruePageIndex = false;
  /**
   * @deprecated
   */
  @Input() id;
  showPages = [];
  totalPage = 1;
  _total = 0;
  jumpPage = null;
  rotateDegrees = 0;

  @Input() totalItemText: string;
  @Input() goToText: string;
  /**
   * @deprecated
   * 下拉菜单默认方向
   */
  @Input() selectDirection: 'auto' | 'up' | 'down' = 'auto';

  /**
   * 极简模式开关
   */
  @Input() lite = false;
  @Input() showPageSelector = true;
  @Input() haveConfigMenu = false;
  @Input() autoFixPageIndex = true;
  /**
   * 是否自动隐藏
   */
  @Input() autoHide = false;
  minPageSizeOptions: number;
  litePaginatorIndex: { value: number; label: string } | null;
  litePaginatorOptions: any[] = [];
  private litePaginatorOptionsLengthCache = 0;
  showConfig = false;
  @ViewChild('litePaginator') litePaginator: ElementRef;
  @ViewChild('dropDownElement') dropDownElement: DropDownAppendToBodyComponent;
  @ViewChild('activeBlock') activeBlock: ElementRef;
  private configButtonLoseFocusHandler: Subscription | null = null;
  private loseFocusListener: any = null;
  i18nText: I18nInterface['pagination'];
  i18nLocale: I18nInterface['locale'];
  i18nSubscription: Subscription;
  activeBlockInfo;
  constructor(private ref: ChangeDetectorRef, private i18n: I18nService, private appRef: ApplicationRef) {}

  ngOnInit(): void {
    this.i18nText = this.i18n.getI18nText().pagination;
    this.i18nLocale = this.i18n.getI18nText().locale;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nText = data.pagination;
      this.i18nLocale = data.locale;
      this.ref.markForCheck();
    });
    if (this.lite && this.showPageSelector) {
      this.constructLitePaginatorOptions();
    }
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
    let pageInput = parseInt(this.jumpPage, 10);
    if (pageInput && (pageInput < this.totalPage || this.pageIndex < this.totalPage)) {
      if (pageInput > this.totalPage) {
        this.jumpPage = this.totalPage;
        pageInput = this.totalPage;
      }
      this.onPageIndexChange(pageInput);
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
      if (this.lite) {
        this.litePaginatorIndex = {
          value: this.pageIndex,
          label: `${this.pageIndex}/${this.totalPage}`,
        };
      }
      this.pageIndexChange.emit(pageIndex);
    }
  }

  onPageSizeChange(size) {
    if (this.pageSize !== size) {
      this.pageSize = size;
      this.pageSizeChange.emit(size);
      if (this.autoFixPageIndex && Math.ceil(this.total / size) < this.totalPage) {
        this.totalPage = Math.ceil(this.total / size);
        this.onPageIndexChange(this.totalPage <= this.pageIndex ? this.totalPage : this.pageIndex);
      }
      this.adjustPaginatorWidth();
    }
    if (this.dropDownElement) {
      this.dropDownElement.dropDown.toggle();
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
    this.activeBlockInfo = this.activeBlock?.nativeElement.getBoundingClientRect();
    const shouldUpdateRanges = PaginationComponent.EFFECT_PAGE_RANGE_KEYS.some((key) => !!changes[key]);
    if (shouldUpdateRanges) {
      this.minPageSizeOptions = Math.min(...this.pageSizeOptions);
      this.totalPage = this.getTotalPage();
      if (!this.showTruePageIndex) {
        this.pageIndex = Math.max(Math.min(this.pageIndex, this.totalPage), 1);
      }
      this.jumpPage = this.pageIndex;
      this.updateShowPageRange();
      if (this.lite && this.showPageSelector) {
        this.constructLitePaginatorOptions();
      }
      this.adjustPaginatorWidth();
      if (this.activeBlockInfo && changes.pageIndex) {
        this.setActiveAnimation();
      }
    }
  }

  ngAfterViewInit() {
    this.adjustPaginatorWidth();
  }

  setActiveAnimation() {
    new Promise((resolve, reject) => {
      resolve(true);
    }).then(() => {
      const curInfo = this.activeBlock.nativeElement.getBoundingClientRect();
      const element = this.activeBlock.nativeElement;
      this.activeBlock.nativeElement.style.opacity = 1;
      element.style.transform = `translate(${this.activeBlockInfo.left - curInfo.left}px)`;
      setTimeout(() => {
        element.style.transition = 'transform .25s ease-in-out';
        element.style.transform = 'translate(0, 0)';
      });
    });
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

    const arriveLeftBound = (index) => index < 1;
    const arriveRightBound = (index) => index > this.totalPage;
    const fullPageRang = (pages) => pages.length >= this.maxItems - 2;

    while (!(fullPageRang(showPages) || (arriveLeftBound(start) && arriveRightBound(end)))) {
      if (!arriveLeftBound(start)) {
        showPages.unshift(start--);
      }

      if (!fullPageRang(showPages) && !arriveRightBound(end)) {
        showPages.push(end++);
      }
    }
    return showPages;
  }

  private constructLitePaginatorOptions(): void {
    if (this.litePaginatorOptions.length === 0 || this.litePaginatorOptions.length !== this.litePaginatorOptionsLengthCache) {
      this.litePaginatorOptions = Array.from({ length: this.totalPage }).map((v, index: number) => {
        return {
          label: `${index + 1}/${this.totalPage}`,
          value: index + 1,
        };
      });
    }
    this.litePaginatorIndex = {
      value: this.pageIndex,
      label: `${this.pageIndex}/${this.totalPage}`,
    };
  }

  private adjustPaginatorWidth() {
    if (this.litePaginator && this.litePaginator.nativeElement && this.litePaginatorOptions.length > 0) {
      const lastOption = this.litePaginatorOptions[this.litePaginatorOptions.length - 1];
      const lastLabel = lastOption ? lastOption.label : '';
      const minWidth = 100;
      const width = lastLabel.length * 4 + 80;
      this.litePaginator.nativeElement.style.width = `${Math.max(minWidth, width)}px`;
    }
  }

  onToggle(event) {
    this.rotateDegrees = event ? 180 : 0;
  }

  toggleMenu(force: boolean = null) {
    if (force !== null) {
      this.showConfig = force;
    } else {
      this.showConfig = !this.showConfig;
    }
    this.ref.markForCheck();
    if (this.showConfig) {
      this.subscribeLoseFocusHandler();
    } else {
      this.unsubscribeLoseFocusHandler();
    }
  }

  private closeMenu() {
    this.toggleMenu(false);
  }

  private unsubscribeLoseFocusHandler() {
    if (this.configButtonLoseFocusHandler) {
      this.configButtonLoseFocusHandler.unsubscribe();
      this.configButtonLoseFocusHandler = null;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeLoseFocusHandler();
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();
    }
  }

  private subscribeLoseFocusHandler() {
    if (this.loseFocusListener === null) {
      this.loseFocusListener = fromEvent(document, 'click');
    }
    if (this.configButtonLoseFocusHandler === null) {
      this.configButtonLoseFocusHandler = this.loseFocusListener.subscribe(this.closeMenu.bind(this));
    }
  }
}
