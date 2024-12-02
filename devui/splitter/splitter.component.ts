import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SplitterBarComponent } from './splitter-bar.component';
import { SplitterPaneComponent } from './splitter-pane.component';
import { SplitterService } from './splitter.service';
import { SplitterOrientation } from './splitter.types';
@Component({
  selector: 'd-splitter',
  exportAs: 'dSplitter',
  templateUrl: './splitter.component.html',
  styleUrls: ['./splitter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SplitterService],
  preserveWhitespaces: false,
})
export class SplitterComponent implements OnChanges, AfterContentInit, OnDestroy {
  // 指定Splitter中窗格的方向，默认水平分割。
  @Input() orientation: SplitterOrientation = 'horizontal';
  // 分隔条大小
  @Input() splitBarSize = '2px';
  // pane设置为不可调整大小时，生效
  @Input() disabledBarSize = '1px';
  // 是否显示展开/收缩按钮
  @Input() showCollapseButton = true;
  @Input() collapsePosLeft: string;
  @Input() collapsePosTop: string;

  @HostBinding('class') get class() {
    return 'devui-splitter devui-splitter-' + this.orientation;
  }
  // 内嵌面板
  @ContentChildren(SplitterPaneComponent) panes: QueryList<SplitterPaneComponent>;
  @ViewChildren('bar') splitterBars: QueryList<SplitterBarComponent>;
  paneChangesSubscription: Subscription;

  constructor(private el: ElementRef, private splitter: SplitterService, private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.orientation && !changes.orientation.isFirstChange()) {
      this.reconfigure();
    }
  }

  ngAfterContentInit() {
    this.reconfigure();
    // contentChildren 变化时，触发重新设置pane
    this.paneChangesSubscription = this.panes.changes.subscribe((panes) => {
      this.reconfigure();
      this.cdr.detectChanges();
    });
  }

  public toggleCollapsed(index = 0) {
    const target = this.splitterBars.toArray()[index];
    target.collapsePrePane();
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    if (this.paneChangesSubscription) {
      this.paneChangesSubscription.unsubscribe();
    }
  }

  // 配置pane
  reconfigure() {
    this.splitter.configPane({
      panes: this.panes.toArray(),
      orientation: this.orientation,
      // 内容投影进组件之后，组件还没有渲染出dom，此时获取不到宽度，此处设置一个回调函数
      containerSize: () => {
        if (this.orientation === 'vertical') {
          return this.el.nativeElement.clientHeight;
        } else {
          return this.el.nativeElement.clientWidth;
        }
      },
    });
    // 投影后获取panes才能循环渲染出bar
    setTimeout(() => {
      if (this.splitterBars.length) {
        this.splitter.bars = this.splitterBars.toArray();
      }
    });
  }
}
