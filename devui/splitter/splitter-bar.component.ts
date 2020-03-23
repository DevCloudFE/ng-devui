import { ChangeDetectionStrategy, Component, ElementRef, Host,
   HostBinding, Input, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map, switchMap, takeUntil, tap, filter } from 'rxjs/operators';
import { ResizeDirective } from './resize.directive';
import { SplitterService } from './splitter.service';
import { SplitterOrientation } from './splitter.types';

@Component({
  selector: 'd-splitter-bar',
  templateUrl: './splitter-bar.component.html',
  styleUrls: ['./splitter-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SplitterBarComponent implements OnInit, OnDestroy {
  // 当前pane索引
  @Input() index: number;
  // 窗格排列方向
  @Input() orientation: SplitterOrientation;
  // 分隔条大小
  _splitBarSize;
  @Input()
  set splitBarSize(size) {
    this._splitBarSize = size;
    this.renderer.setStyle(this.el.nativeElement, 'flex-basis', size);
  }
  get splitBarSize() {
    return this._splitBarSize;
  }
  @Input() disabledBarSize;

  @HostBinding('class') get class() {
    let bindClass = 'devui-splitter-bar devui-splitter-bar-' + this.orientation;
    if (!this.splitter.isStaticBar(this.index)) {
      bindClass += ' resizable';
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'flex-basis', this.disabledBarSize);
    }
    return bindClass;
  }

  subscriptions = new Subscription();
  // 移动的时候，阻止事件冒泡
  private stopPropagation = ({ originalEvent: event }) => {
    event.stopPropagation();
    if (event.cancelable) {
      event.preventDefault();
    }
  }

  // 处理移动过程中的数据流, 合并到pressEvent事件流中
  private moveStream = resize => mouseDown =>
    resize.dragEvent.pipe(
      takeUntil(resize.releaseEvent),
      map(({ pageX, pageY }) => ({
        originalX: mouseDown.pageX,
        originalY: mouseDown.pageY,
        pageX,
        pageY
      }))
  )

  constructor(private el: ElementRef,
    private splitter: SplitterService,
    private renderer: Renderer2,
    @Host() private resize: ResizeDirective
  ) {}

  ngOnInit(): void {
    let state;
    const resizeListener = this.resize.pressEvent
      .pipe(
        tap(this.stopPropagation),
        filter(() => this.splitter.isResizable(this.index)),
        tap(() => state = this.splitter.dragState(this.index)),
        switchMap(this.moveStream(this.resize))
      )
      .subscribe(({ pageX, pageY, originalX, originalY }) => {
        let distance;
        if (this.orientation === 'vertical') {
          distance = pageY - originalY;
        } else {
          distance = pageX - originalX;
        }
        this.splitter.setSize(state, distance);
      });
    this.subscriptions.add(resizeListener);
  }


  collapsePrePane() {
    const nearIndex = this.index + 1;
    this.splitter.togglePane(this.index, nearIndex);
    this.toggleResize(this.index);
  }

  collapseNextPane() {
    this.splitter.togglePane(this.index + 1, this.index);
    this.toggleResize(this.index + 1);
  }

  // 切换是否允许拖拽，收起时不能拖拽
  toggleResize(paneIndex) {
    const pane = this.splitter.getPane(paneIndex);
    const isCollapsed = pane.collapsed;
    if (isCollapsed) {
      this.renderer.addClass(this.el.nativeElement, 'none-resizable');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'none-resizable');
    }
  }

  // 计算前面板收起操作样式
  get prevClass() {
    const pane = this.splitter.getPane(this.index);
    const nearPane = this.splitter.getPane(this.index + 1);
    // 第一个面板或者其它面板折叠方向不是向后的显示操作按钮
    const showIcon = (pane.collapseDirection !== 'after' || this.index === 0);
    return this.generateCollapseClass(pane, nearPane, showIcon);
  }

  // 计算相邻面板收起操作样式
  get nextClass() {
    const pane = this.splitter.getPane(this.index + 1);
    const nearPane = this.splitter.getPane(this.index);
    // 最后一个面板或者其它面板折叠方向不是向前的显示操作按钮
    const showIcon = (pane.collapseDirection !== 'before' || this.index + 1 === this.splitter.paneCount - 1);
    return this.generateCollapseClass(pane, nearPane, showIcon);
  }

  // 生成拼接样式
  generateClass(classes) {
    return Object.keys(classes).filter(c => classes[c]).join(' ');
  }

  // 根据当前状态生成收起按钮样式
  generateCollapseClass(pane, nearPane, showIcon) {
     // 是否允许收起
    const isCollapsible = pane.collapsible && showIcon;
    // 当前收起状态
    const isCollapsed = pane.collapsed;
    // 是否是固定pane
    const isStaticBar = this.splitter.isStaticBar(this.index);
    // 一个pane收起的时候，隐藏相邻pane的收起按钮
    const isNearPaneCollapsed = nearPane.collapsed;
    return this.generateClass({
      'devui-collapse': isCollapsible,
      'collapsed': isCollapsed,
      'hidden': isNearPaneCollapsed
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
