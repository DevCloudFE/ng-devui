import { Injectable, isDevMode } from '@angular/core';
import { DDGridStack, GridItemHTMLElement, GridStack, GridStackNode, Utils } from 'gridstack';
import { DDElement } from 'gridstack/dist/dd-element';
import { DashboardComponent } from './dashboard.component';
import { DashboardLibraryTrashDirective } from './widget-library/library-trash.directive';
import { DashboardLibraryWidgetDirective } from './widget-library/library-widget.directive';
@Injectable()
export class GridStackService {
  gridStack: GridStack;
  dragInWidget: DashboardLibraryWidgetDirective;
  lastColumn: number;
  lastStyleSheet: CSSStyleSheet;

  getDD() {
    return DDGridStack.get() as DDGridStack;
  }

  static cleanDragIn(el: HTMLElement) {
    if (el.classList.contains('ui-draggable')) {
      (DDGridStack.get() as DDGridStack).draggable(el, 'destroy');
    }
  }
  static isDraggable(el: HTMLElement) {
    return Boolean(el.classList.contains('ui-draggable'));
  }
  static isDroppable(el: HTMLElement) {
    return Boolean(el.classList.contains('ui-droppable'));
  }
  static enableDrag(el: HTMLElement) {
    if (!GridStackService.isDraggable(el)) {
      return;
    }
    (DDGridStack.get() as DDGridStack).draggable(el, 'enable');
  }
  static disableDrag(el: HTMLElement) {
    if (!GridStackService.isDraggable(el)) {
      return;
    }
    (DDGridStack.get() as DDGridStack).draggable(el, 'disable');
  }
  static enableDrop(el: HTMLElement) {
    if (!GridStackService.isDroppable(el)) {
      return;
    }
    (DDGridStack.get() as DDGridStack).droppable(el, 'enable');
  }
  static disableDrop(el: HTMLElement) {
    if (!GridStackService.isDroppable(el)) {
      return;
    }
    (DDGridStack.get() as DDGridStack).droppable(el, 'disable');
  }
  _itemRemoving = (el: GridItemHTMLElement, remove: boolean) => {
    const node = el ? el.gridstackNode : undefined;
    if (!node || !node.grid) {
      return;
    }
    remove ? ((node as any)._isAboutToRemove = true) : delete (node as any)._isAboutToRemove;
    remove ? el.classList.add('grid-stack-item-removing') : el.classList.remove('grid-stack-item-removing');
  };
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
    if (!this.getDD().isDroppable(this.gridStack.el)) {
      const that = this.gridStack;
      this.getDD().droppable(that.el, {
        accept: (el: GridItemHTMLElement) => {
          const node: GridStackNode = el.gridstackNode;
          // set accept drop to true on ourself (which we ignore) so we don't get "can't drop" icon in HTML5 mode while moving
          if (node && node.grid === that) {
            return true;
          }
          if (!that.opts.acceptWidgets) {
            return false;
          }
          // check for accept method or class matching
          let canAccept = true;
          if (typeof that.opts.acceptWidgets === 'function') {
            canAccept = that.opts.acceptWidgets(el);
          } else {
            const selector = that.opts.acceptWidgets === true ? '.grid-stack-item' : (that.opts.acceptWidgets as string);
            canAccept = el.matches(selector);
          }
          // finally check to make sure we actually have space left #1571
          if (canAccept && node && that.opts.maxRow) {
            const n = { w: node.w, h: node.h, minW: node.minW, minH: node.minH }; // only width/height matters and autoPosition
            canAccept = that.engine.willItFit(n);
          }
          return canAccept;
        },
      });
    }
    this.getDD()
      .off(this.gridStack.el, 'dropout')
      .on(this.gridStack.el, 'dropout', (event, el: GridItemHTMLElement, helper) => {
        // 覆盖这个方法是因为 float模式下 dropout影响了原来的布局
        const that: any = this.gridStack;
        const node = el.gridstackNode;
        if (!node.grid || node.grid === that) {
          that._leave(el, helper);
        }
        this.getDD().off(el, 'drag');
        return false;
      })
      .off(this.gridStack.el, 'drop')
      .on(this.gridStack.el, 'drop', (event, el: GridItemHTMLElement, helper: GridItemHTMLElement) => {
        // 覆盖这个方法是因为 drop的情况不想让它放进去而是只发射通知
        const that: any = this.gridStack;

        const node: GridStackNode = el.gridstackNode;
        if (node && node.grid === that && !(node as any)._isExternal) {
          return false;
        }

        const wasAdded = !!that.placeholder.parentElement;
        that.placeholder.remove();

        const origNode = (el as any)._gridstackNodeOrig;
        delete (el as any)._gridstackNodeOrig;

        if (!node) {
          return false;
        }
        if (wasAdded) {
          that.engine.cleanupNode(node); // 好像没用
          node.grid = that;
        }

        if (helper !== el) {
          helper.remove();
          el.gridstackNode = origNode; // original item (left behind) is re-stored to pre dragging as the node now has drop info
        } else {
          Utils.removePositioningStyles(el);
        }

        this.getDD().off(el, 'drag');
        that.engine.removeNode(node);

        that._updateContainerHeight();

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
    if (!trashZone) {
      return;
    }
    if (this.getDD().isDroppable(trashZone)) {
      // 清理掉了dropover和dropout 直接重新绑定对应的逻辑
      this.getDD().off(trashZone, 'dropover').off(trashZone, 'dropout');
    }
  }
  /* 设置新的可拖入的widget */
  setupDragIn(
    el: HTMLElement,
    widget: DashboardLibraryWidgetDirective,
    helper?: ((event: any) => HTMLElement) | string,
    notify?: (eventType: string) => (...args: any) => void
  ) {
    const _ddElement = DDElement.init(el);
    _ddElement.setupDraggable({
      ...widget.targetDashboard.finalOption.dragInOptions,
      ...{ helper: helper || widget.targetDashboard.finalOption.dragInOptions.helper, handle: this.gridStack.opts.handle },
      ...{
        start: () => {
          this.dragInWidget = widget;
          if (notify) {
            notify('dragStart')();
          }
        },
        stop: () => {
          // TODO: 升级gridstack@6.0.0后drop内dragInWidget一直为undefined ,因此删掉了 this.dragInWidget = undefined;
          if (notify) {
            notify('dragStop')();
          }
        },
      },
    });
  }
  destroyDragIn(el: HTMLElement) {
    this.getDD().draggable(el, 'destroy');
  }

  /* 设置自定义的回收站 */
  setupRemoveDropArea(trashZone: HTMLElement, dashboard: DashboardComponent, trash?: DashboardLibraryTrashDirective) {
    if (!this.gridStack) {
      if (isDevMode()) {
        console.warn('call setupRemoveDropArea after gridStack init');
      }
      return;
    }
    const trashEl = trashZone;
    this.getDD()
      .droppable(trashEl, this.gridStack.opts.removableOptions)
      .on(trashEl, 'dropover', (event, el) => this._itemRemoving(el, true))
      .on(trashEl, 'dropout', (event, el) => this._itemRemoving(el, false));
  }

  /* 清理自定义的回收站 */
  destroyRemoveDropAreas(trashZone: HTMLElement) {
    if (!this.gridStack) {
      console.warn('call destroyRemoveDropAreas after gridStack init');
      return;
    }
    const that = this.gridStack;
    if (!this.getDD().isDroppable(trashZone)) {
      return;
    }
    this.getDD().off(trashZone, 'dropover').off(trashZone, 'dropout').off(trashZone, 'drop');
  }

  // 设置背景
  updateBackgroundGridBlock() {
    if (this.gridStack) {
      if (!this.lastStyleSheet) {
        this.lastStyleSheet = Utils.createStylesheet(
          `d-dashboard-${(this.gridStack.opts as any)._styleSheetClass}`,
          this.gridStack.el.parentElement
        );
      } else {
        this.lastStyleSheet.removeRule(0);
      }
      const column = this.gridStack.opts.column as number;
      const margin = this.gridStack.opts.margin as number;
      const marginUnit = this.gridStack.opts.marginUnit;
      const cellHeight = this.gridStack.opts.cellHeight as number;
      const cellHeightUnit = this.gridStack.opts.cellHeightUnit;
      const prefix = `.${(this.gridStack.opts as any)._styleSheetClass}`;
      if (!this.lastStyleSheet) {
        return;
      }

      Utils.addCSSRule(
        this.lastStyleSheet,
        `${prefix}.d-dashboard-show-grid-block::before`,
        `
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
      `
      );
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
      Utils.removeStylesheet(`d-dashboard-${(this.gridStack.opts as any)._class}`);
    }
  }
}
