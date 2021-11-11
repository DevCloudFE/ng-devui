import { Injectable, isDevMode } from '@angular/core';
import { $, GridItemHTMLElement, GridStack, GridStackNode, Utils } from 'gridstack';
import { DashboardComponent } from './dashboard.component';
import { DashboardLibraryTrashDirective } from './widget-library/library-trash.directive';
import { DashboardLibraryWidgetDirective } from './widget-library/library-widget.directive';

@Injectable()
export class GridStackService {
  gridStack: GridStack;
  dragInWidget: DashboardLibraryWidgetDirective;
  lastColumn: number;
  lastStyleSheet: CSSStyleSheet;

  static cleanDragIn(el: HTMLElement) {
    if (Boolean($(el).data('ui-draggable'))) {
      $(el).draggable('destroy');
    }
  }

  static isDraggable(el) { return Boolean($(el).data('ui-draggable')); }
  static isDroppable(el) { return Boolean($(el).data('ui-droppable')); }
  static enableDrag(el) {
    if (!GridStackService.isDraggable(el)) {return; }
    $(el).draggable('enable');
  }
  static disableDrag(el) {
    if (!GridStackService.isDraggable(el)) {return; }
    $(el).draggable('disable');
  }
  static enableDrop(el) {
    if (!GridStackService.isDroppable(el)) {return; }
    $(el).droppable('enable');
  }
  static disableDrop(el) {
    if (!GridStackService.isDroppable(el)) {return; }
    $(el).droppable('disable');
  }

  resetAcceptWidget(dashboard: DashboardComponent) {
    if (!this.gridStack) {
      if (isDevMode()) {
        console.warn('call resetAcceptWidget after gridStack init');
      }
      return;
    }
    if (this.gridStack.opts.staticGrid || !this.gridStack.opts.acceptWidgets) {
      return;
    }
    if (!Boolean($(this.gridStack.el).data('ui-droppable'))) {
      const that = this.gridStack;
      this.gridStack.dd.droppable(that.el, {
        accept: (el: GridItemHTMLElement) => {
          const node: GridStackNode = el.gridstackNode;
          if (node && node.grid === that) {
            return false;
          }
          if (typeof that.opts.acceptWidgets === 'function') {
            return that.opts.acceptWidgets(el);
          }
          const selector = (that.opts.acceptWidgets === true ? '.grid-stack-item' : that.opts.acceptWidgets as string);
          return el.matches(selector);
        }
      });
    }
    const onDrag = (event, el, helper?: HTMLElement) => {
      const that = this.gridStack;
      const node = el.gridstackNode;
      // 修改为与被拖拽元素对齐而不是鼠标， 与板块内拖拽体验一致
      const {left, top} = (helper || el).getBoundingClientRect();
      const cellWidth = that.cellWidth();
      const cellHeight = that.getCellHeight();
      const pos = that.getCellFromPixel({
        left: left + cellWidth / 2,
        top: top + cellHeight / 2 + document.documentElement.scrollTop
      }, true); // 重写了ondrag的这行
      const x = Math.max(0, pos.x);
      const y = Math.max(0, pos.y);
      if (!node['_added']) {
        node['_added'] = true;

        node.el = el;
        node.x = x;
        node.y = y;
        delete node.autoPosition;
        that.engine.cleanNodes();
        that.engine.beginUpdate(node);
        that.engine.addNode(node);

        that['_writeAttrs'](that['placeholder'], node.x, node.y, node.width, node.height);
        that.el.appendChild(that['placeholder']);
        node.el = that['placeholder']; // dom we update while dragging...
        node._beforeDragX = node.x;
        node._beforeDragY = node.y;

        that['_updateContainerHeight']();
      } else if ((x !== node.x || y !== node.y) && that.engine.canMoveNode(node, x, y)) {
        that.engine.moveNode(node, x, y);
        that['_updateContainerHeight']();
      }
    };

    this.gridStack.dd
      .off(this.gridStack.el, 'dropover')
      .on(this.gridStack.el, 'dropover', (event, el) => {
        // 覆盖这个方法为了重写onDrag里的一行
        const that = this.gridStack;
        let width, height;

        // see if we already have a node with widget/height and check for attributes
        let node = el.gridstackNode;
        if (!node || !node.width || !node.height) {
          const w = parseInt(el.getAttribute('data-gs-width'), 10);
          if (w > 0) { node = node || {}; node.width = w; }
          const h = parseInt(el.getAttribute('data-gs-height'), 10);
          if (h > 0) { node = node || {}; node.height = h; }
        }

        // if not calculate the grid size based on element outer size
        const cellWidth = that.cellWidth();
        const cellHeight = that.getCellHeight();
        width = node && node.width ? node.width : Math.round(el.offsetWidth / cellWidth) || 1;
        height = node && node.height ? node.height : Math.round(el.offsetHeight / cellHeight) || 1;

        const newNode = (that.engine as any)['prepareNode']({width, height, _added: false, _temporary: true});
        newNode['_isOutOfGrid'] = true;
        el.gridstackNode = newNode;
        el['_gridstackNodeOrig'] = node;

        that.dd.on(el, 'drag', onDrag);
        return false;
      })
      .off(this.gridStack.el, 'dropout')
      .on(this.gridStack.el, 'dropout', (event, el: GridItemHTMLElement) => {
        // 覆盖这个方法是因为 float模式下 dropout影响了原来的布局
        const that = this.gridStack;
        const node = el.gridstackNode;
        if (!node || !node['_isOutOfGrid']) {
          return;
        }
        this.fixFloat(that, node); // 增加了float模式下的恢复
        that.dd.off(el, 'drag');
        node.el = null;
        that.engine.removeNode(node);
        if (that['placeholder'].parentNode === that.el) {
          that.el.removeChild(that['placeholder']);
        }
        that['_updateContainerHeight']();

        el.gridstackNode = el['_gridstackNodeOrig'];
        return false;
      })
      .off(this.gridStack.el, 'drop')
      .on(this.gridStack.el, 'drop', (event, el: GridItemHTMLElement, helper: GridItemHTMLElement) => {
        // 覆盖这个方法是因为 drop的情况不想让它放进去而是只发射通知
        const that = this.gridStack;

        that['placeholder'].remove();

        const origNode = el['_gridstackNodeOrig'];
        delete el['_gridstackNodeOrig'];

        const node: GridStackNode = el.gridstackNode;
        that.engine.cleanupNode(node); // 好像没用

        node.grid = that;
        if (helper !== el) {
          helper.remove();
          el.gridstackNode = origNode; // original item (left behind) is re-stored to pre dragging as the node now has drop info
        } else {
          Utils.removePositioningStyles(el);
        }

        that.dd.off(el, 'drag');
        that.engine.removeNode(node);
        this.fixFloat(that, node);

        that['_updateContainerHeight']();

        dashboard.handleDragInNode(node, origNode, this.dragInWidget);
      });
  }
  resetRemoveDrop(dashboard: DashboardComponent) {
    if (!this.gridStack) {
      if (isDevMode()) {
        console.warn('call resetDragDrop after gridStack init');
      }
      return;
    }
    if (!(!this.gridStack.opts.staticGrid && typeof this.gridStack.opts.removable === 'string')) {
      return;
    }
    const trashZone = document.querySelector(this.gridStack.opts.removable) as HTMLElement;
    if (!trashZone) { return; }
    if (this.gridStack.dd.isDroppable(trashZone)) {
      // 清理掉了dropover和dropout 直接重新绑定对应的逻辑
      this.gridStack.dd.off(trashZone, 'dropover').off(trashZone, 'dropout');
    }
  }

  private fixFloat(gridstack: GridStack, node: GridStackNode) {
    if (gridstack.getFloat()) {
      gridstack.engine.batchUpdate();
      gridstack.engine.nodes.filter(n => n !== node).reverse().forEach(n => {
        if (n['_origX'] !== undefined || n['_origY'] !== undefined) {
          n.x = n['_origX'] !== undefined ? n['_origX'] : n.x;
          n.y = n['_origY'] !== undefined ? n['_orig&'] : n.y;
          gridstack.engine.moveNode(n, n.x, n.y);
          gridstack['_writeAttrs'](n.el, n.x, n.y);
        }
      });
      gridstack.engine.commit();
    }
  }
  /* 设置新的可拖入的widget */
  setupDragIn(
    el: HTMLElement,
    widget: DashboardLibraryWidgetDirective,
    helper?: ((event: any) => HTMLElement)|string,
    notify?: (eventType: string) => (...args) => void
  ) {
    this.gridStack.dd.dragIn(el, Object.assign({},
      this.gridStack.opts.dragInOptions,
      { helper: helper || this.gridStack.opts.dragInOptions.helper },
      {
        start: () => {
          this.dragInWidget = widget;
          if (notify) { notify('dragStart')(); }
        },
        stop: () => {
          this.dragInWidget = undefined;
          if (notify) { notify('dragStop')(); }
        }
      }
      ));
  }
  destroyDragIn(el: HTMLElement) {
    this.gridStack.dd.draggable(el, 'destroy');
  }

  /* 设置自定义的回收站 */
  setupRemoveDropArea(trashZone: HTMLElement, dashboard: DashboardComponent, trash?: DashboardLibraryTrashDirective) {
    if (!this.gridStack) {
      if (isDevMode()) {
        console.warn('call setupRemoveDropArea after gridStack init');
      }
      return;
    }
    const that = this.gridStack;
    if (!that.dd.isDroppable(trashZone)) {
      that.dd.droppable(trashZone, that.opts.removableOptions);
    }
    that.dd
      .on(trashZone, 'dropover', (event, el) => {
        el.classList.add('grid-stack-item-removing');
      })
      .on(trashZone, 'dropout', (event, el) => {
        el.classList.remove('grid-stack-item-removing');
      })
      .on(trashZone, 'drop', (event, el) => {
        el.classList.remove('grid-stack-item-removing');
        const node = el.gridstackNode;
        dashboard.handleDragOutNode(node, trash);
      });
  }

  /* 清理自定义的回收站 */
  destroyRemoveDropAreas(trashZone: HTMLElement) {
    if (!this.gridStack) {
      console.warn('call destroyRemoveDropAreas after gridStack init');
      return;
    }
    const that = this.gridStack;
    if (!that.dd.isDroppable(trashZone)) {
      return;
    }
    that.dd.off(trashZone, 'dropover').off(trashZone, 'dropout').off(trashZone, 'drop');
  }

  // 设置背景
  updateBackgroundGridBlock() {
    if (this.gridStack) {
      if (!this.lastStyleSheet) {
        this.lastStyleSheet = Utils.createStylesheet('d-dashboard-' + this.gridStack.opts['_class']);
      } else {
        this.lastStyleSheet.removeRule(0);
      }
      const column = this.gridStack.opts.column;
      const margin = this.gridStack.opts.margin as number;
      const marginUnit = this.gridStack.opts.marginUnit;
      const cellHeight = this.gridStack.opts.cellHeight as number;
      const cellHeightUnit = this.gridStack.opts.cellHeightUnit;
      const prefix = `.${this.gridStack.opts['_class']}`;

      Utils.addCSSRule(this.lastStyleSheet, `${prefix}.d-dashboard-show-grid-block::before`, `
      background-image:
        linear-gradient(#fff 0, #fff ${margin * 2}${marginUnit},
          transparent ${margin * 2}${marginUnit}, transparent 100%),
        linear-gradient(90deg, #fff 0, #fff ${margin * 2}${marginUnit},
          transparent ${margin * 2}${marginUnit}, transparent 100%),
        linear-gradient(#f8f8f8 0 , #f8f8f8 100%);
      background-image:
        linear-gradient(var(--devui-base-bg, #fff) 0, var(--devui-base-bg, #fff) ${margin * 2}${marginUnit},
          transparent ${margin * 2}${marginUnit}, transparent 100%),
        linear-gradient(90deg, var(--devui-base-bg, #fff) 0, var(--devui-base-bg, #fff) ${margin * 2}${marginUnit},
          transparent ${margin * 2}${marginUnit}, transparent 100%),
        linear-gradient(var(--devui-area, #f8f8f8) 0 , var(--devui-area, #f8f8f8) 100%);
      background-size: ${100 / column}% ${cellHeight}${cellHeightUnit};
      background-position: -${margin}${marginUnit} -${margin}${marginUnit};
      `);
      this.lastColumn = column;
    }
  }

  setBackgroundGridBlockIfColumnChange() {
    if (this.gridStack?.opts?.column !== this.lastColumn) {
      this.updateBackgroundGridBlock();
    }
  }

  removeBackgroundGridBlockStyleSheet() {
    if (this.lastStyleSheet) {
      Utils.removeStylesheet('d-dashboard-' + this.gridStack.opts['_class']);
    }
  }

}
