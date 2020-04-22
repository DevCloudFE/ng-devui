import { Subscription, fromEvent, Subject } from 'rxjs';
import { AfterViewInit, Directive, ElementRef, EventEmitter, HostBinding,
  Input, NgZone, OnDestroy, OnInit, Output, Renderer2, Host, Self, Optional } from '@angular/core';
import { DragDropService } from '../services/drag-drop.service';
import { Utils } from '../shared/utils';
import { PreserveNextEventEmitter } from './../shared/preserve-next-event-emitter';
import { DragPreviewDirective } from './drag-preview.directive';

@Directive({
    selector: '[dDraggable]'
})
/**
 * Makes an element draggable by adding the draggable html attribute
 */
export class DraggableDirective implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding('draggable') draggable = true;
  /**
   * The data that will be available to the droppable directive on its `onDrop()` event.
   */
  @Input() dragData;

  /**
   * The selector that defines the drag Handle. If defined drag will only be allowed if dragged from the selector element.
   */
  @HostBinding('attr.data-drag-handle-selector') // host-binding attribute for communicate with touch support js
  @Input() dragHandle: string;

  /**
   * Currently not used
   */
  @Input() dragEffect = 'move';

  /**
   * Defines compatible drag drop pairs. Values must match both in draggable and droppable.dropScope.
   */
  @Input() dragScope: string | Array<string> = 'default';

  @Input() dragHandleClass = 'drag-handle';
  /**
   * CSS class applied on the draggable that is applied when the item is being dragged.
   */
  @Input() dragOverClass: string;

  /**
   * Event fired when Drag is started
   */
  @Output() dragStartEvent: EventEmitter<any> = new EventEmitter<any>();

  /**
   * @deprecated
   * Event fired while the element is being dragged
   * 为了性能优化，该函数废弃，请用(drag)自行监听， 如果不需要angular脏检测则最好用runOutsideAngular的addEventListener监听以获得好的性能
   */
  @Output() dragEvent: PreserveNextEventEmitter<any> = new PreserveNextEventEmitter<any>();

  /**
   * Event fired when dragged ends
   */
  @Output() dragEndEvent: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Keeps track of mouse over element that is used to determine drag handles
   */
  private mouseOverElement: any;
  @Output() dropEndEvent: PreserveNextEventEmitter<any> = new PreserveNextEventEmitter<any>();
  @Input()
  public get disabled(): boolean {
      return this._disabled;
  }

  public set disabled(value: boolean) {
      this._disabled = value;
      this.draggable = !this._disabled;
  }
  private _disabled: boolean;


  @Input() enableDragFollow = false; // 默认false使用浏览器H5API拖拽, 否则使用原dom定位偏移
  @Input() dragFollowOptions: {
      appendToBody?: boolean;
    };
  @Input() originPlaceholder: {
    show?: boolean;
    tag?: string;
    style?: {[cssProperties: string]: string};
    text?: string;
    removeDelay?: number; // 单位: ms
  };
  @Input() dragIdentity: any; // 用于虚拟滚动的恢复

  @Input() dragItemParentName = ''; // 当前拖拽元素的类名或元素名称（类名需要加.）,主要用于子节点的截取操作
  @Input() dragItemChildrenName = ''; // 当前拖拽元素的子节点类名或元素名称（类名需要加.）

  dragsSub: Subscription = new Subscription();
  destroyDragEndSub: Subscription = new Subscription();
  isDestroyed: boolean;
  private delayRemoveOriginPlaceholderTimer;
  public batchDraggable;
  private dragOriginPlaceholder;
  private dragOriginPlaceholderNextSibling;
  public dragElShowHideEvent = new Subject<boolean>();
  public beforeDragStartEvent = new Subject<boolean>();

  constructor(public el: ElementRef, private renderer: Renderer2, private dragDropService: DragDropService, private ngZone: NgZone,
    @Optional() @Self() public dragPreviewDirective: DragPreviewDirective
    ) {
  }

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.dragsSub.add(fromEvent(this.el.nativeElement, 'mouseover').subscribe(event => this.mouseover(event)));
      this.dragsSub.add(fromEvent(this.el.nativeElement, 'dragstart').subscribe(event => this.dragStart(event)));
      this.dragsSub.add(fromEvent(this.el.nativeElement, 'dragend').subscribe(event => this.dragEnd(event)));
    });
  }

  dropSubscription() {
    this.dragDropService.newSubscription().add(
      this.dragDropService.dropEvent.subscribe((event) => {
        this.mouseOverElement = undefined;
        this.renderer.removeClass(this.el.nativeElement, this.dragOverClass);
        this.dropEndEvent.emit(event);
        // 兼容虚拟滚动后被销毁
        if (this.isDestroyed) {
          if (this.dropEndEvent.schedulerFns && this.dropEndEvent.schedulerFns.size > 0) {
            this.dropEndEvent.forceCallback(event, true);
          }
        }
        if (this.dragDropService.dragOriginPlaceholder) {
          if (this.originPlaceholder && this.originPlaceholder.removeDelay > 0
            && !this.dragDropService.dropOnOrigin) { // 非drop到自己的情况
            this.delayRemoveOriginPlaceholder();
          } else {
            this.removeOriginPlaceholder();
          }
          this.dragDropService.draggedElIdentity = undefined;
        }
        this.dragDropService.subscription.unsubscribe();
    })).add(
      this.dragDropService.dragElShowHideEvent.subscribe(this.dragElShowHideEvent)
    );
  }

  ngAfterViewInit() {
    this.applyDragHandleClass();
    if (this.dragIdentity) {
      if (this.dragDropService.draggedEl && this.dragIdentity === this.dragDropService.draggedElIdentity) {
        if (this.originPlaceholder && this.originPlaceholder.show !== false) {
            this.insertOriginPlaceholder();
        }
        this.dragDropService.draggedEl = this.el.nativeElement;
        this.el.nativeElement.style.display = 'none'; // recovery don't need to emit event
      }
    }
  }

  ngOnDestroy() {
    // 兼容虚拟滚动后被销毁
    this.isDestroyed = true;
    if (this.dragDropService.draggedEl === this.el.nativeElement) {
      this.destroyDragEndSub = new Subscription();
      this.destroyDragEndSub.add(fromEvent(this.el.nativeElement, 'dragend').subscribe(event => {
        this.dragEnd(event);
        if (this.dropEndEvent.schedulerFns && this.dropEndEvent.schedulerFns.size > 0) {
          this.dropEndEvent.forceCallback(event, true);
        }
        this.destroyDragEndSub.unsubscribe();
        this.destroyDragEndSub = undefined;
      }));
      if (this.originPlaceholder && this.originPlaceholder.show !== false
        && this.dragDropService.dragOriginPlaceholder && this.dragDropService.draggedElIdentity) {
        // 如果有originPlaceholder 则销毁
        this.removeOriginPlaceholder();
      }
    }
    this.dragsSub.unsubscribe();
  }

  dragStart(e) {
    if (this.allowDrag(e)) {
      this.renderer.addClass(this.el.nativeElement, this.dragOverClass);
      this.dragDropService.dragData = this.dragData;
      this.dragDropService.scope = this.dragScope;
      this.dragDropService.draggedEl = this.el.nativeElement;
      this.dragDropService.draggedElIdentity = this.dragIdentity;
      this.dragDropService.dragFollow = this.enableDragFollow;
      this.dragDropService.dragFollowOptions = this.dragFollowOptions;
      this.dragDropService.dragItemParentName = this.dragItemParentName;
      this.dragDropService.dragItemChildrenName = this.dragItemChildrenName;
      this.beforeDragStartEvent.next();
      if (this.dragPreviewDirective && this.dragPreviewDirective.dragPreviewTemplate) {
        this.dragDropService.dragFollow = true;
        this.dragDropService.dragPreviewDirective = this.dragPreviewDirective;
      }
      if (this.batchDraggable) {
        if (this.batchDraggable.dragData) {
          // 有dragData证明被加入到了group里
          if (this.dragDropService.batchDragData && this.dragDropService.batchDragData.length > 1 ) {
            this.dragDropService.batchDragging = true;
            this.dragDropService.batchDragStyle = this.batchDraggable.batchDragStyle;
          }
        } else if (this.batchDraggable.batchDragLastOneAutoActiveEventKeys) {
          const batchActiveAble = this.batchDraggable.batchDragLastOneAutoActiveEventKeys
            .map(key => e[key])
            .some(eventKey => eventKey === true);
          if (batchActiveAble) {
            if (this.dragDropService.batchDragData && this.dragDropService.batchDragData.length > 0 ) {
              this.batchDraggable.active();
              if (!this.batchDraggable.dragData) {
                // 如果用户没做任何处理把项目加到组里则加到组里
                this.batchDraggable.addToBatchGroup();
              }
              if (this.dragDropService.batchDragData.some(dragData => dragData.draggable === this)) {
                this.dragDropService.batchDragging = true;
                this.dragDropService.batchDragStyle = this.batchDraggable.batchDragStyle;
              }
            }
          }
        }
      }
      const targetOffset = this.el.nativeElement.getBoundingClientRect();
      if (this.dragDropService.dragFollow) {
        const mousePositionXY = this.mousePosition(e);
        // 用于出现transform的场景position:fixed相对位置变更
        const transformOffset = this.checkAndGetViewPointChange(this.el.nativeElement);
        this.dragDropService.dragOffset = {
          left: targetOffset.left,
          top: targetOffset.top,
          offsetLeft: mousePositionXY.x - targetOffset.left + transformOffset.offsetX,
          offsetTop: mousePositionXY.y - targetOffset.top + transformOffset.offsetY,
          width: targetOffset.width,
          height: targetOffset.height
        };
        this.dragDropService.enableDraggedCloneNodeFollowMouse();
      } else {
        this.dragDropService.dragOffset = {
          left: targetOffset.left,
          top: targetOffset.top,
          offsetLeft: null,
          offsetTop: null,
          width: targetOffset.width,
          height: targetOffset.height
        };
      }
      if (this.originPlaceholder && this.originPlaceholder.show !== false) {
        this.insertOriginPlaceholder(false);
      }
      if (this.dragDropService.batchDragging
        && this.dragDropService.batchDragData && this.dragDropService.batchDragData.length > 1 ) {
        this.dragDropService.batchDragData.map(dragData => dragData.draggable)
          .filter(draggable => draggable &&　draggable !== this)
          .forEach((draggable) => {
            if (draggable.originPlaceholder && draggable.originPlaceholder.show !== false) {
              draggable.insertOriginPlaceholder(true, false);
              draggable.el.nativeElement.style.display = 'none';
            } else {
              setTimeout(() => {draggable.el.nativeElement.style.display = 'none'; });
            }
          });
      }
      // Firefox requires setData() to be called otherwise the drag does not work.
      if (e.dataTransfer != null) {
          e.dataTransfer.setData('text', '');
      }
      e.dataTransfer.effectAllowed = this.dragEffect;
      this.dropSubscription();
      if (this.dragDropService.dragFollow) {
        if ('function' === typeof DataTransfer.prototype.setDragImage) {
          e.dataTransfer.setDragImage(this.dragDropService.dragEmptyImage, 0 , 0);
        } else {
          e.srcElement.style.display = 'none';
          this.dragDropService.dragElShowHideEvent.next(false);
        }
      }
      e.stopPropagation();
      this.dragStartEvent.emit(e);
      this.dragDropService.dragStartEvent.next(e);
    } else {
      e.preventDefault();
    }
  }

  dragEnd(e) {
    this.renderer.removeClass(this.el.nativeElement, this.dragOverClass);
    this.dragDropService.dragEndEvent.next(e);
    this.mouseOverElement = undefined;
    if (this.dragDropService.draggedEl) {
      // 当dom被清除的的时候不会触发dragend，所以清理工作部分交给了drop，但是内部排序的时候dom不会被清理，dragend防止和drop重复操作清理动作
      if (this.dragDropService.dragFollow) {
        this.dragDropService.disableDraggedCloneNodeFollowMouse();
      }
      if (this.dragDropService.dragOriginPlaceholder) {
        this.removeOriginPlaceholder();
      }
      if (this.dragDropService.batchDragging && this.dragDropService.batchDragData && this.dragDropService.batchDragData.length > 1 ) {
        this.dragDropService.batchDragData.map(dragData => dragData.draggable)
          .filter(draggable => draggable &&　draggable !== this)
          .forEach((draggable) => {
            if (draggable.originPlaceholder && draggable.originPlaceholder.show !== false) {
              draggable.el.nativeElement.style.display = '';
              draggable.removeOriginPlaceholder();
            } else {
              draggable.el.nativeElement.style.display = '';
            }
          } );
      }
      if (this.batchDraggable && !this.batchDraggable.batchDragActive) {
        this.batchDraggable.removeFromBatchGroup();
        this.dragDropService.batchDragging = false;
        this.dragDropService.batchDragStyle = undefined;
      }
      if (this.dragDropService.subscription) {
        this.dragDropService.subscription.unsubscribe();
      }
      this.dragDropService.dragData = undefined;
      this.dragDropService.scope = undefined;
      this.dragDropService.draggedEl = undefined;
      this.dragDropService.dragFollow = undefined;
      this.dragDropService.dragFollowOptions = undefined;
      this.dragDropService.dragOffset = undefined;
      this.dragDropService.draggedElIdentity = undefined;
      this.dragDropService.dragPreviewDirective = undefined;
    }
    e.stopPropagation();
    e.preventDefault();
    this.dragEndEvent.emit(e);
  }

  mouseover(e) {
    this.mouseOverElement = e.target;
  }

  private allowDrag(e) {
    if (!this.draggable) {
      return false;
    }
    if (this.batchDraggable &&　!this.batchDraggable.allowAddToBatchGroup()) {  // 批量拖拽判断group是否相同
      return false;
  }
    if (this.dragHandle) {
      if (e && e.fromTouch) {return true; } // from touchstart dispatch event
      if (!this.mouseOverElement) { return false; }
      return Utils.matches(this.mouseOverElement, this.dragHandle);
    } else {
      return true;
    }
  }

  private applyDragHandleClass() {
    const dragElement = this.getDragHandleElement();
    if (!dragElement) {
      return;
    }
    if (this.draggable) {
      Utils.addClass(dragElement, this.dragHandleClass);
    } else {
      Utils.removeClass(this.el, this.dragHandleClass);
    }
  }

  private getDragHandleElement() {
    let dragElement = this.el;
    if (this.dragHandle) {
      dragElement = this.el.nativeElement.querySelector(this.dragHandle);
    }
    return dragElement;
  }

  private mousePosition(event) {
    return {
      x: event.clientX,
      y: event.clientY
    };
  }
  public insertOriginPlaceholder = (directShow = true, updateService = true) => {
    if (this.delayRemoveOriginPlaceholderTimer) {
      clearTimeout(this.delayRemoveOriginPlaceholderTimer);
      this.delayRemoveOriginPlaceholderTimer = undefined;
    }

    const node = document.createElement(this.originPlaceholder.tag || 'div');
    const rect =  this.el.nativeElement.getBoundingClientRect();
    if (directShow) {
      node.style.display = 'block';
    } else {
      node.style.display = 'none';
    }

    node.style.width = rect.width + 'px';
    node.style.height = rect.height + 'px';
    node.classList.add('drag-origin-placeholder');
    if (this.originPlaceholder.text) {
      node.innerText = this.originPlaceholder.text;
    }
    if (this.originPlaceholder.style) {
      Utils.addElStyles(node, this.originPlaceholder.style);
    }
    if (updateService) {
      this.dragDropService.dragOriginPlaceholder = node;
      this.dragDropService.dragOriginPlaceholderNextSibling = this.el.nativeElement.nextSibling;
    } else {
      node.classList.add('side-drag-origin-placeholder');
      const originCloneNode = this.el.nativeElement.cloneNode(true);
      originCloneNode.style.margin = 0;
      originCloneNode.style.pointerEvents = 'none';
      originCloneNode.style.opacity = '0.3';
      node.appendChild(originCloneNode);
    }
    this.dragOriginPlaceholder = node;
    this.dragOriginPlaceholderNextSibling = this.el.nativeElement.nextSibling;
    this.el.nativeElement.parentElement.insertBefore(node, this.el.nativeElement.nextSibling);
  }

  public removeOriginPlaceholder = (updateService = true) => {
    if (this.dragOriginPlaceholder) {
      this.dragOriginPlaceholder.parentElement.removeChild(this.dragOriginPlaceholder);
    }
    if (updateService) {
      this.dragDropService.dragOriginPlaceholder = undefined;
      this.dragDropService.dragOriginPlaceholderNextSibling = undefined;
    }
    this.dragOriginPlaceholder = undefined;
    this.dragOriginPlaceholderNextSibling = undefined;
  }
  public delayRemoveOriginPlaceholder = (updateService = true) => {
    const timeout = this.originPlaceholder.removeDelay;
    const delayOriginPlaceholder = this.dragOriginPlaceholder;
    const dragOriginPlaceholderNextSibling = this.findNextSibling(this.dragOriginPlaceholderNextSibling);

    // 需要临时移动位置，保证被ngFor刷新之后位置是正确的
    // ngFor刷新的原理是有变化的部分都刷新，夹在变化部分中间的内容将被刷到变化部分之后的位置，所以需要恢复位置
    // setTimeout是等ngFor的View刷新, 后续需要订阅sortContainer的view的更新才需要重新恢复位置
    if (delayOriginPlaceholder.parentElement.contains(dragOriginPlaceholderNextSibling)) {
      delayOriginPlaceholder.parentElement.insertBefore(
        delayOriginPlaceholder,
        dragOriginPlaceholderNextSibling
      );
    }
    setTimeout(() => {
      if (delayOriginPlaceholder.parentElement.contains(dragOriginPlaceholderNextSibling)) {
        delayOriginPlaceholder.parentElement.insertBefore(
          delayOriginPlaceholder,
          dragOriginPlaceholderNextSibling
        );
      }
      delayOriginPlaceholder.classList.add('delay-deletion');
      this.delayRemoveOriginPlaceholderTimer = setTimeout(() => {
        delayOriginPlaceholder.parentElement.removeChild(delayOriginPlaceholder);
        if (document.body.contains(this.el.nativeElement)) {
          this.el.nativeElement.style.display = '';
          this.dragDropService.dragElShowHideEvent.next(false);
        }
      }, timeout);
      if (updateService) {
        this.dragDropService.dragOriginPlaceholder = undefined;
        this.dragDropService.dragOriginPlaceholderNextSibling = undefined;
      }
      this.dragOriginPlaceholder = undefined;
      this.dragOriginPlaceholderNextSibling = undefined;
    });
  }
  findNextSibling(currentNextSibling) {
    if (!this.dragDropService.batchDragData) {
      return currentNextSibling;
    } else {
      if (this.dragDropService.batchDragData
        .map(dragData => dragData.draggable && dragData.draggable.el.nativeElement)
        .indexOf(currentNextSibling) > -1 ) {
        currentNextSibling = currentNextSibling.nextSibling;
      }
      return currentNextSibling;
    }
  }

  private checkAndGetViewPointChange(element: HTMLElement) {
    if (!element.parentNode) { return null; }
    // 模拟一个元素测预测位置和最终位置是否符合，如果不符合则是有transform等造成的偏移
    const elementPosition = element.getBoundingClientRect();
    const testEl = document.createElement('div');
    Utils.addElStyles(testEl, {
      opacity: '0',
      position: 'fixed',
      top: elementPosition.top + 'px',
      left: elementPosition.left + 'px',
      width: '1px',
      height: '1px',
      zIndex: '-999999',
    });
    element.parentNode.appendChild(testEl);
    const testElPosition = testEl.getBoundingClientRect();
    element.parentNode.removeChild(testEl);
    return {
      offsetX: testElPosition.left - elementPosition.left,
      offsetY: testElPosition.top - elementPosition.top
    };
  }
}
