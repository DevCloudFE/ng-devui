import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, NgZone } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { DragPreviewDirective } from '../directives/drag-preview.directive';
import { Utils } from '../shared/utils';
import { DragDropTouch } from '../touch-support/dragdrop-touch';
import { DraggableDirective } from './../directives/draggable.directive';

@Injectable()
export class DragDropService {
  dragData: any;
  draggedEl: any;
  draggedElIdentity: any;
  batchDragData: Array<{
    identity?: any;
    draggable: DraggableDirective;
    dragData: any;
  }>;
  batchDragGroup: string;
  batchDragStyle: Array<string>;
  batchDragging: boolean;
  scope: string | Array<string>;
  dropTargets = [];
  dropEvent: Subject<any> = new Subject();
  dragEndEvent = new Subject<any>();
  dragStartEvent = new Subject<any>();
  dropOnItem: boolean;
  dragFollow: boolean;
  dragFollowOptions: {
    appendToBody?: boolean;
  };
  dropOnOrigin: boolean;
  draggedElFollowingMouse: boolean;
  dragOffset: {
    top: number;
    left: number;
    offsetLeft: number;
    offsetTop: number;
    width?: number;
    height?: number;
  };
  subscription: Subscription = new Subscription();
  dragEmptyImage = new Image();
  dragCloneNode: any;
  dragOriginPlaceholder: any;
  dragItemContainer: any;
  dragItemParentName = '';
  dragItemChildrenName = '';
  intersectionObserver: any = null;
  sub;
  dragOriginPlaceholderNextSibling: any;
  touchInstance;

  /* 协同拖拽需要 */
  dragElShowHideEvent = new Subject<boolean>();
  dragSyncGroupDirectives;
  /* 预览功能 */
  dragPreviewDirective: DragPreviewDirective;
  document: Document;

  constructor(private ngZone: NgZone, @Inject(DOCUMENT) private doc: any) {
    this.touchInstance = DragDropTouch.getInstance();
    // service not support OnInit, only support OnDestroy, so write in constructor
    // safari的img必须要有src
    this.dragEmptyImage.src =
      'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==';
    this.document = this.doc;
  }
  newSubscription() {
    this.subscription.unsubscribe();
    // eslint-disable-next-line no-return-assign
    return (this.subscription = new Subscription());
  }

  enableDraggedCloneNodeFollowMouse() {
    if (!this.dragCloneNode) {
      this.dragItemContainer = this.draggedEl.parentElement;
      if (this.dragPreviewDirective && this.dragPreviewDirective.dragPreviewTemplate) {
        this.dragPreviewDirective.createPreview();
        this.dragCloneNode = this.dragPreviewDirective.getPreviewElement();
        this.dragItemContainer = this.document.body;
      } else {
        this.dragCloneNode = this.draggedEl.cloneNode(true);
      }

      this.dragCloneNode.style.margin = '0';
      if (this.dragFollowOptions && this.dragFollowOptions.appendToBody) {
        this.dragItemContainer = this.document.body;
        this.copyStyle(this.draggedEl, this.dragCloneNode);
      }

      if (this.dragItemChildrenName !== '') {
        const parentElement = this.dragItemParentName === '' ? this.dragCloneNode : this.document.querySelector(this.dragItemParentName);
        const dragItemChildren = parentElement.querySelectorAll(this.dragItemChildrenName);
        this.interceptChildNode(parentElement, dragItemChildren);
      }
      // 拷贝canvas的内容
      const originCanvasArr = this.draggedEl.querySelectorAll('canvas');
      const targetCanvasArr = this.dragCloneNode.querySelectorAll('canvas');
      [].forEach.call(targetCanvasArr, (canvas, index) => {
        canvas.getContext('2d').drawImage(originCanvasArr[index], 0, 0);
      });

      this.ngZone.runOutsideAngular(() => {
        this.document.addEventListener('dragover', this.followMouse4CloneNode, { capture: true, passive: true });
      });
      this.dragCloneNode.style.width = this.dragOffset.width + 'px';
      this.dragCloneNode.style.height = this.dragOffset.height + 'px';

      if (
        !(
          this.dragPreviewDirective &&
          this.dragPreviewDirective.dragPreviewTemplate &&
          this.dragPreviewDirective.dragPreviewOptions &&
          this.dragPreviewDirective.dragPreviewOptions.skipBatchPreview
        )
      ) {
        // 批量拖拽样式
        if (this.batchDragging && this.batchDragData && this.batchDragData.length > 1) {
          // 创建一个节点容器
          const node = this.document.createElement('div');
          node.appendChild(this.dragCloneNode);
          node.classList.add('batch-dragged-node');

          /* 计数样式定位 */
          if (this.batchDragStyle && this.batchDragStyle.length && this.batchDragStyle.indexOf('badge') > -1) {
            const badge = this.document.createElement('div');
            badge.innerText = String(this.batchDragData.length);
            badge.classList.add('batch-dragged-node-count');
            node.style.position = 'relative';
            const style = {
              position: 'absolute',
              right: '5px',
              top: '-12px',
              height: '24px',
              width: '24px',
              borderRadius: '12px',
              fontSize: '14px',
              lineHeight: '24px',
              textAlign: 'center',
              color: '#fff',
              background: ['#5170ff', 'var(--brand-1, #5170ff)'],
            };
            Utils.addElStyles(badge, style);
            node.appendChild(badge);
          }

          /* 层叠感样式定位 */
          if (this.batchDragStyle && this.batchDragStyle.length && this.batchDragStyle.indexOf('stack') > -1) {
            let stack = 2;
            if (this.batchDragData.length === 2) {
              stack = 1;
            }
            for (let i = 0; i < stack; i++) {
              const stackNode = this.dragCloneNode.cloneNode(false);
              const stackStyle = {
                position: 'absolute',
                left: -5 * (i + 1) + 'px',
                top: -5 * (i + 1) + 'px',
                zIndex: String(-(i + 1)),
                width: this.dragOffset.width + 'px',
                height: this.dragOffset.height + 'px',
                background: '#fff',
                border: ['1px solid #5170ff', '1px solid var(--brand-1, #5170ff)'],
              };
              Utils.addElStyles(stackNode, stackStyle);
              node.appendChild(stackNode);
            }
          }
          this.dragCloneNode = node;
        }
      }

      this.dragCloneNode.classList.add('drag-clone-node');
      if (!(this.dragPreviewDirective && this.dragPreviewDirective.dragPreviewTemplate)) {
        this.dragCloneNode.style.width = this.dragOffset.width + 'px';
        this.dragCloneNode.style.height = this.dragOffset.height + 'px';
      }
      this.dragCloneNode.style.position = 'fixed';
      this.dragCloneNode.style.zIndex = '1090';
      this.dragCloneNode.style.pointerEvents = 'none';
      this.dragCloneNode.style.top = this.dragOffset.top + 'px';
      this.dragCloneNode.style.left = this.dragOffset.left + 'px';
      this.dragCloneNode.style.willChange = 'left, top';
      this.dragItemContainer.appendChild(this.dragCloneNode);
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          if (this.draggedEl) {
            this.draggedEl.style.display = 'none';
            this.dragElShowHideEvent.next(false);
            if (this.dragOriginPlaceholder) {
              this.dragOriginPlaceholder.style.display = 'block';
            }
          }
        });
      });
    }
  }

  disableDraggedCloneNodeFollowMouse() {
    if (this.dragCloneNode) {
      this.document.removeEventListener('dragover', this.followMouse4CloneNode, { capture: true });
      this.dragItemContainer.removeChild(this.dragCloneNode);
      this.draggedEl.style.display = '';
      this.dragElShowHideEvent.next(true);
    }
    if (this.dragPreviewDirective && this.dragPreviewDirective.dragPreviewTemplate) {
      this.dragPreviewDirective.destroyPreview();
    }
    this.dragCloneNode = undefined;
    this.dragItemContainer = undefined;

    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  interceptChildNode(parentNode, childNodeList) {
    const interceptOptions = {
      root: parentNode,
    };
    this.intersectionObserver = new IntersectionObserver(this.setChildNodeHide, interceptOptions);
    [].forEach.call(childNodeList, (childNode) => {
      this.intersectionObserver.observe(childNode);
    });
  }

  setChildNodeHide(entries) {
    entries.forEach((element) => {
      const { isIntersecting, target: childNode } = element;
      if (isIntersecting) {
        childNode.style.display = 'block';
      } else {
        childNode.style.display = 'none';
      }
    });
  }

  followMouse4CloneNode = (event) => {
    const { offsetLeft, offsetTop } = this.dragOffset;
    const { clientX, clientY } = event;
    requestAnimationFrame(() => {
      if (!this.dragCloneNode) {
        return;
      }
      this.dragCloneNode.style.left = clientX - offsetLeft + 'px';
      this.dragCloneNode.style.top = clientY - offsetTop + 'px';
    });
  };

  getBatchDragData(identity?, order: ((a: any, b: any) => number) | 'select' | 'draggedElFirst' = 'draggedElFirst') {
    const result = this.batchDragData.map((dragData) => dragData.dragData);
    if (typeof order === 'function') {
      result.sort(<(a: any, b: any) => number>order);
    } else if (order === 'draggedElFirst') {
      let dragData = this.dragData;
      if (identity) {
        const realDragData = this.batchDragData.filter((dd) => dd.identity === identity).pop().dragData;
        dragData = realDragData;
      }
      result.splice(result.indexOf(dragData), 1);
      result.splice(0, 0, dragData);
    }
    return result;
  }

  /** usage:
   * constructor(..., private dragDropService: DragDropService) {}
   * cleanBatchDragData() { this.dragDropService.cleanBatchDragData(); }
   */
  public cleanBatchDragData() {
    const batchDragData = this.batchDragData;
    if (this.batchDragData) {
      this.batchDragData
        .filter((dragData) => dragData.draggable)
        .map((dragData) => dragData.draggable)
        .forEach((draggable) => {
          draggable.batchDraggable.dragData = undefined;
        });
      this.batchDragData = undefined;
      this.batchDragGroup = undefined;
    }
    return batchDragData;
  }

  public copyStyle(source, target) {
    ['id', 'class', 'style', 'draggable'].forEach((att) => {
      target.removeAttribute(att);
    });

    // copy style (without transitions)
    const computedStyle = getComputedStyle(source);
    for (let i = 0; i < computedStyle.length; i++) {
      const key = computedStyle[i];
      if (key.indexOf('transition') < 0) {
        target.style[key] = computedStyle[key];
      }
    }
    target.style.pointerEvents = 'none';
    // and repeat for all children
    for (let i = 0; i < source.children.length; i++) {
      this.copyStyle(source.children[i], target.children[i]);
    }
  }
}
