import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SplitterBarComponent } from './splitter-bar.component';
import { SplitterPaneComponent } from './splitter-pane.component';

@Injectable()
export class SplitterService {
  panes: SplitterPaneComponent[];
  bars: SplitterBarComponent[];
  private containerSize: Function;
  paneCount = 0;
  paneChangeSubject = new Subject();
  // 配置pane信息，panes列表，方向，容器大小，方便后续计算使用
  configPane({ panes, orientation, containerSize }) {
    this.panes = panes;
    this.panes.forEach((pane, index) => {
      pane.order = index * 2;
      pane.orientation = orientation;
    });
    this.paneCount = this.panes.length;
    this.containerSize = containerSize;
  }

  // 按下的时候计算pane的size信息
  dragState(splitbarIndex) {
    const prev = this.getPane(splitbarIndex);
    const next = this.getPane(splitbarIndex + 1);
    const total = prev.computedSize + next.computedSize;
    return {
      prev: {
        index: splitbarIndex,
        initialSize: prev.computedSize,
        // 设置有最小值，直接取值，如果没有设置就用两个pane总和减去相邻pane的最大值，都没设置（NAN）在取0
        minSize: this.toPixels(prev.minSize) || total - this.toPixels(next.maxSize) || 0,
        // 设置有最大值，直接取值，如果没有设置就用两个pane总和减去相邻pane的最小值，都没设置（NAN）在取两个pane总和
        maxSize: this.toPixels(prev.maxSize) || total - this.toPixels(next.minSize) || total,
      },
      next: {
        index: splitbarIndex + 1,
        initialSize: next.computedSize,
        minSize: this.toPixels(next.minSize) || total - this.toPixels(prev.maxSize) || 0,
        maxSize: this.toPixels(next.maxSize) || total - this.toPixels(prev.minSize) || total,
      },
    };
  }

  // 设置pane大小
  setSize(state, distance) {
    const prev = this.getPane(state.prev.index);
    const next = this.getPane(state.next.index);
    if (prev.size && next.size) {
      // 相邻的两个pane都指定了size，需要同时修改size
      this.resize(state.prev, distance);
      this.resize(state.next, -distance);
    } else if (next.size) {
      // 如果 next pane，指定了size就修改next pane
      this.resize(state.next, -distance);
    } else {
      // 最后不管pre pane，有没有指定，都修改 pre pane
      this.resize(state.prev, distance);
    }
  }

  // 大小限制函数，（max）小于最小值时取最小值， （min）大于最大值时取最大值
  clamp(minSize, maxSize, initialSize) {
    return Math.min(maxSize, Math.max(minSize, initialSize));
  }

  // resize pane的大小
  resize(paneState, moveSize) {
    const pane = this.getPane(paneState.index);
    const splitterSize = this.containerSize();
    const newSize = this.clamp(paneState.minSize, paneState.maxSize, paneState.initialSize + moveSize);
    let size = '';
    if (this.isPercent(pane.size)) {
      size = (100 * newSize) / splitterSize + '%';
    } else {
      size = newSize + 'px';
    }
    pane.size = size;
    pane.sizeChange.emit(size);
  }

  // 判断pane是否可以调整大小，只要有一边设置了不可调整或者收起，相邻pane调整就失效
  isResizable(splitBarIndex) {
    const prevPane = this.getPane(splitBarIndex);
    const nextPane = this.getPane(splitBarIndex + 1);
    const paneCollapsed = prevPane.collapsed || nextPane.collapsed;
    return prevPane.resizable && nextPane.resizable && !paneCollapsed;
  }

  // 判断分割条是否是固定的，只要有一边不能调整, 就是禁用状态固定bar
  isStaticBar(splitBarIndex) {
    const prevPane = this.getPane(splitBarIndex);
    const nextPane = this.getPane(splitBarIndex + 1);
    return !(prevPane.resizable && nextPane.resizable);
  }

  // 获取pane，防止没有初始化的时候调用内部方法取值
  getPane(index) {
    if (!this.panes || index < 0 || index >= this.panes.length) {
      throw new Error('no pane can return.');
    }
    return this.panes[index];
  }

  getBar(index) {
    if (!this.bars || index < 0 || index >= this.bars.length) {
      return;
    }
    return this.bars[index];
  }

  // 判断是不是百分比设置宽度
  isPercent(size) {
    return /%$/.test(size);
  }

  // 计算时把百分比转换为像素
  toPixels(size) {
    // 值不满足转换时，result为NAN，方便计算最小、最大宽度判断
    let result = parseFloat(size);
    if (this.isPercent(size)) {
      result = (this.containerSize() * result) / 100;
    }
    return result;
  }

  // 切换pane展开，收起
  togglePane(paneIndex, nearPaneIndex, lockStatus?) {
    const pane = this.getPane(paneIndex);
    const nearPane = this.getPane(nearPaneIndex);
    if (pane.collapsible) {
      pane._collapsed = lockStatus ? pane._collapsed : !pane._collapsed;
      pane.toggleCollapseClass();
      nearPane.toggleNearPaneFlexGrow(pane._collapsed);
      pane.collapsedChange.emit(pane._collapsed);
    }
  }
}
