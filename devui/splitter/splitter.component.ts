import { ChangeDetectionStrategy, Component, Input, ContentChildren, QueryList, HostBinding,
  OnChanges, AfterContentInit, SimpleChanges, ElementRef, OnDestroy } from '@angular/core';
import { SplitterPaneComponent } from './splitter-pane.component';
import { SplitterOrientation } from './splitter.types';
import { SplitterService } from './splitter.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'd-splitter',
  exportAs: 'dSplitter',
  templateUrl: './splitter.component.html',
  styleUrls: ['./splitter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    SplitterService
  ]
})

export class SplitterComponent implements OnChanges, AfterContentInit, OnDestroy {
  // 指定Splitter中窗格的方向，默认水平分割。
  @Input() orientation: SplitterOrientation = 'horizontal';
  // 分隔条大小
  @Input() splitBarSize = '2px';
  // pane设置为不可调整大小时，生效
  @Input() disabledBarSize = '1px';

  @HostBinding('class') get class() {
    return 'devui-splitter devui-splitter-' + this.orientation;
  }
  // 内嵌面板
  @ContentChildren(SplitterPaneComponent) panes: QueryList<SplitterPaneComponent>;
  paneChangesSubscription: Subscription;

  constructor(private el: ElementRef, private splitter: SplitterService) {

  }

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
    });
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
      }
    });
  }
}
