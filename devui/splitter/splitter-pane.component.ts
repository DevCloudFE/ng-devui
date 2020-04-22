import { AfterViewChecked, ChangeDetectionStrategy, Component, ElementRef, EventEmitter,
  HostBinding, Input, Output, Renderer2, OnChanges, SimpleChanges } from '@angular/core';
import { SplitterOrientation, CollapseDirection } from './splitter.types';
import { SplitterService } from './splitter.service';
@Component({
  selector: 'd-splitter-pane',
  templateUrl: './splitter-pane.component.html',
  styleUrls: ['./splitter-pane.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SplitterPaneComponent implements OnChanges, AfterViewChecked {
   // pane的最小值
   @Input() minSize: string;
   // pane的最大值
   @Input() maxSize: string;
   // 当前panel是否可调整大小
   @Input() resizable = true;
   // 面板是否可折叠
   @Input() collapsible = false;
   // 面板初始化是否折叠，默认不折叠
   @Input() collapsed = false;
   // 非边缘面板折叠方向，before只生成向前折叠的按钮，after生成向后折叠按钮，both生成两个
   @Input() collapseDirection: CollapseDirection = 'both';
  // pane初始化大小
  _size;
  @Input()
  set size(newSize) {
    this._size = newSize;
    this.renderer.setStyle(this.element, 'flex-basis', newSize);
    const paneFixedClass = 'devui-splitter-pane-fixed';
    if (this.size) {
      // 设置 flex-grow 和 flex-shrink
      this.renderer.addClass(this.element, paneFixedClass);
    } else {
      this.renderer.removeClass(this.element, paneFixedClass);
    }
  }
  get size() {
    return this._size;
  }
  // 大小改变事件
  @Output() sizeChange = new EventEmitter<any>();

  // 收起和展开事件
  @Output() collapsedChange = new EventEmitter<any>();

  @HostBinding('class.devui-splitter-pane') paneClass = true;

  orientation: SplitterOrientation; // 分割条方向
  _order = 0; // flex布局下pane位置
  element; // nativeElement句柄

  set order(paneOrder) {
    this._order = paneOrder;
    this.setOrderStyles();
  }
  get order() {
      return this._order;
  }

  constructor(private splitter: SplitterService, private el: ElementRef, private renderer: Renderer2) {
    this.element = this.el.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes.collapsible && !changes.collapsible.isFirstChange()) || (changes.collapsed && !changes.collapsed.isFirstChange())) {
      this.splitter.paneChangeSubject.next(true);
    }
  }

  // 设置order
  setOrderStyles() {
    this.renderer.setStyle(this.element, 'order', this.order);
  }

  // 获取当前pane大小
  get computedSize() {
    if (this.orientation === 'vertical') {
      return this.element.offsetHeight;
    } else {
      return this.element.offsetWidth;
    }
  }

  // 收起时隐藏当前pane
  toggleCollapseClass() {
    const paneHiddenClass = 'devui-splitter-pane-hidden';
    if (!this.collapsed) {
      this.renderer.removeClass(this.element, paneHiddenClass);
    } else {
      this.renderer.addClass(this.element, paneHiddenClass);
    }
  }

  // 收起时用于改变相邻pane的flex-grow属性来改变非自适应pane的size
  toggleNearPaneFlexGrow() {
    const flexGrowClass = 'devui-splitter-pane-grow';
    const hasFlexGrowClass = this.element.classList.contains(flexGrowClass);
    if (hasFlexGrowClass) {
      this.renderer.removeClass(this.element, flexGrowClass);
    } else {
      this.renderer.addClass(this.element, flexGrowClass);
    }
  }

  ngAfterViewChecked() {
    // 视图检查完对resizeable pane设置flex属性
    if (!this.size && !this.resizable) {
      this.renderer.addClass(this.element, 'devui-splitter-pane-fixed');
    }
  }
}
