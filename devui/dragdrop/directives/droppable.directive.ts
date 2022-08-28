import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  Renderer2
} from '@angular/core';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { DragDropService } from '../services/drag-drop.service';
import { DropEvent } from '../shared/drop-event.model';
import { Utils } from '../shared/utils';
import { DraggableDirective } from './draggable.directive';
import { DragPlaceholderInsertionEvent, DragPlaceholderInsertionIndexEvent } from './placeholder-insertion-event.type';

export type DropIndexFlag = 'beforeAll' | 'afterAll';
@Directive({
  selector: '[dDroppable]'
})
export class DroppableDirective implements OnInit, AfterViewInit, OnDestroy {

  /**
     *  Event fired when Drag dragged element enters a valid drop target.
     */
  @Output() dragEnterEvent: EventEmitter<any> = new EventEmitter<any>();

  /**
     * Event fired when an element is being dragged over a valid drop target
     */
  @Output() dragOverEvent: EventEmitter<any> = new EventEmitter<any>();

  /**
     * Event fired when a dragged element leaves a valid drop target.
     */
  @Output() dragLeaveEvent: EventEmitter<any> = new EventEmitter<any>();

  /**
     * Event fired when an element is dropped on a valid drop target.
     */
  @Output() dropEvent: EventEmitter<DropEvent> = new EventEmitter<DropEvent>(); // 注意使用了虚拟滚动后，DropEvent中的dragFromIndex无效

  /**
     * CSS class applied on the draggable that is applied when the item is being dragged.
     */
  @Input() dragOverClass: string;

  /**
     * Defines compatible drag drop pairs. Values must match both in draggable and droppable.dropScope.
     */
  @Input() dropScope: string | Array<string> = 'default';

  @Input() placeholderTag = 'div';

  @Input() placeholderStyle: any = {backgroundColor: ['#859bff', `var(--devui-brand-foil, #859bff)`], opacity: '.4'};

  /**
     * 设置placeholder的提示性文字，仅支持文本（安全起见）
     */
  @Input() placeholderText = '';

  /**
     * 用于允许拖动到元素上，方便树形结构的拖动可以成为元素的子节点
     */
  @Input() allowDropOnItem = false;

  /**
     * allowDropOnItem为true时，才有效，用于允许拖动到元素上后，被命中的元素增加样式
     */
  @Input() dragOverItemClass: string;

  /**
     *  用于修正有内嵌列表后，父项高度被撑大，此处height，width为父项自己的高度（用于纵向拖动），宽度（用于横向拖动）
     * */
  @Input() nestingTargetRect: {height?: number; width?: number};

  /**
    *  是否启用越过立即交换位置的算法, 不能与allowDropOnItem一起用，allowDropOnItem为true时，此规则无效
    * */
  @Input() switchWhileCrossEdge = false;

  /**
    *  sortable的情况下，拖动到可以drop但不在sortContainer里的时候默认drop的位置
    * */
  @Input() defaultDropPosition: 'closest' | 'before' | 'after' = 'closest';

  /**
    *  sortable的情况下，列表如果使用了virtual scroll等部分加载技术时候返回正确的dropIndex
    * */
  @Input() dropSortCountSelector: string;
  @Input() dropSortVirtualScrollOption: {
    totalLength?: number;
    startIndex?: number;
    // innerSortContainer?: HTMLElement | string; // 用于虚拟滚动列表结构发生内嵌
  };
  private dropFlag: DropIndexFlag;

  private sortContainer: any;
  private sortDirection: 'v' | 'h';
  private sortDirectionZMode: boolean;
  private placeholder: any;

  // 用于修复dragleave多次触发
  private dragCount = 0;

  private dropIndex = undefined;

  private dragStartSubscription: Subscription;
  private dragEndSubscription: Subscription;
  private dropEndSubscription: Subscription;

  // 记录上一次悬停的元素，用于对比悬停的元素等是否发生变化
  private overElement;

  private dragPartEventSub: Subscription;
  private allowDropCache: boolean;
  private dragElIndex;
  /* 协同拖拽需要 */
  placeholderInsertionEvent = new Subject<DragPlaceholderInsertionEvent>();
  placeholderRenderEvent = new Subject<any>();
  document: Document;

  constructor(protected el: ElementRef, private renderer: Renderer2, private dragDropService: DragDropService, private ngZone: NgZone,
              @Inject(DOCUMENT) private doc: any) {
    this.document = this.doc;
  }

  ngOnInit() {
    this.placeholder = this.document.createElement(this.placeholderTag);
    this.placeholder.className = 'drag-placeholder';
    this.placeholder.innerText = this.placeholderText;
    this.dragStartSubscription = this.dragDropService.dragStartEvent.subscribe(() => this.setPlaceholder());
    if (this.dragDropService.draggedEl) {
      this.setPlaceholder(); // 虚拟滚动生成元素过程中
    }
    this.dropEndSubscription = this.dragDropService.dropEvent.subscribe(() => {
      if (this.dragDropService.draggedEl) {
        if (!this.dragDropService.dragFollow) {
          this.renderer.setStyle(this.dragDropService.draggedEl, 'display', '');
          this.dragDropService.dragElShowHideEvent.next(true);
        }
      }
      this.removePlaceholder();
      this.overElement = undefined;
      this.allowDropCache = undefined;
      this.dragElIndex = undefined;
      this.dropIndex = undefined;
    });
    this.dragEndSubscription = this.dragDropService.dragEndEvent.subscribe(() => {
      if (this.dragDropService.draggedEl) {
        if (!this.dragDropService.dragFollow) {
          this.renderer.setStyle(this.dragDropService.draggedEl, 'display', '');
          this.dragDropService.dragElShowHideEvent.next(true);
        }
      }
      this.removePlaceholder();
      this.dragCount = 0;
      this.overElement = undefined;
      this.allowDropCache = undefined;
      this.dragElIndex = undefined;
      this.dropIndex = undefined;
    });
    this.ngZone.runOutsideAngular (() => {
      this.dragPartEventSub = new Subscription();
      this.dragPartEventSub.add(fromEvent<DragEvent>(this.el.nativeElement, 'dragover')
        .pipe(
          filter(event => this.allowDrop(event)),
          distinctUntilChanged((prev , current) => {
            const bool = (prev.clientX === current.clientX && prev.clientY === current.clientY && prev.target === current.target);
            if (bool) { current.preventDefault(); current.stopPropagation(); }
            return bool;
          })
        )
        .subscribe((event) => this.dragOver(event))
      );
      this.dragPartEventSub.add(
        fromEvent(this.el.nativeElement, 'dragenter').subscribe((event) => this.dragEnter(event))
      );
      this.dragPartEventSub.add(
        fromEvent(this.el.nativeElement, 'dragleave').subscribe((event) => this.dragLeave(event))
      );
    });
  }

  ngAfterViewInit() {
    if (this.el.nativeElement.hasAttribute('d-sortable')) {
      this.sortContainer = this.el.nativeElement;
    } else {
      this.sortContainer = this.el.nativeElement.querySelector('[d-sortable]');
    }
    this.sortDirection = this.sortContainer ? this.sortContainer.getAttribute('dsortable') || 'v' : 'v';
    this.sortDirectionZMode = this.sortContainer ? (this.sortContainer.getAttribute('d-sortable-zmode') === 'true' || false) : false;
  }

  ngOnDestroy() {
    this.dragStartSubscription.unsubscribe();
    this.dragEndSubscription.unsubscribe();
    this.dropEndSubscription.unsubscribe();
    if (this.dragPartEventSub) {this.dragPartEventSub.unsubscribe(); }
  }

  dragEnter(e) {
    this.dragCount++;
    e.preventDefault(); // ie11 dragenter需要preventDefault否则dragover无效
    this.dragEnterEvent.emit(e);
  }

  dragOver(e) {
    if (this.allowDrop(e)) {
      if (this.dragDropService.dropTargets.indexOf(this.el) === -1) {
        this.dragDropService.dropTargets.forEach(el => {
          const placeHolderEl = el.nativeElement.querySelector('.drag-placeholder');
          if (placeHolderEl) {
            placeHolderEl.parentElement.removeChild(placeHolderEl);
          }
          Utils.removeClass(el, this.dragOverClass);
          this.removeDragoverItemClass(el.nativeElement);
        });
        this.dragDropService.dropTargets = [this.el];
        this.overElement = undefined; // 否则会遇到上一次position= 这一次的然后不刷新和插入。
      }
      Utils.addClass(this.el, this.dragOverClass);
      const hitPlaceholder
          = this.dragDropService.dragOriginPlaceholder && this.dragDropService.dragOriginPlaceholder.contains(e.target);
      if (this.sortContainer && (
        (hitPlaceholder && this.overElement === undefined)
          || !(e.target.contains(this.placeholder) || hitPlaceholder)
          || (this.switchWhileCrossEdge && !this.placeholder.contains(e.target) && !hitPlaceholder) // 越边交换回折的情况需要重新计算
          || (!this.sortContainer.contains(e.target) && this.defaultDropPosition === 'closest') // 就近模式需要重新计算
      )) {
        const overElement = this.findSortableEl(e);
        if (!(this.overElement && overElement) || this.overElement.index !== overElement.index
            || (this.allowDropOnItem && this.overElement.position !== overElement.position
              && (this.overElement.position === 'inside' || overElement.position === 'inside'))
        ) {
          // overElement的参数有刷新的时候才进行插入等操作
          this.overElement = overElement;

          this.insertPlaceholder(overElement);

          this.removeDragoverItemClass(this.sortContainer, overElement);
          if (overElement.position === 'inside' && this.dragOverItemClass) {
            Utils.addClass(overElement.el, this.dragOverItemClass);
          }
        } else {
          this.overElement = overElement;
        }
      } else {
        if (this.sortContainer && this.overElement && this.overElement.el) {
          if (!this.overElement.el.contains(e.target)) {
            this.overElement.realEl = e.target;
          } else {
            this.overElement.realEl = undefined;
          }
        }
      }
      if (this.dragDropService.draggedEl) {
        if (!this.dragDropService.dragFollow) {
          this.renderer.setStyle(this.dragDropService.draggedEl, 'display', 'none');
          this.dragDropService.dragElShowHideEvent.next(false);
          if (this.dragDropService.dragOriginPlaceholder) {
            this.renderer.setStyle(this.dragDropService.dragOriginPlaceholder, 'display', 'block');
          }
        }
      }
      e.preventDefault();
      e.stopPropagation();
      this.dragOverEvent.emit(e);
    }
  }

  dragLeave(e) {
    // 用于修复包含子元素时，多次触发dragleave
    this.dragCount--;

    if (this.dragCount === 0) {
      if (this.dragDropService.dropTargets.indexOf(this.el) !== -1) {
        this.dragDropService.dropTargets = [];
      }
      Utils.removeClass(this.el, this.dragOverClass);
      this.removePlaceholder();
      this.removeDragoverItemClass(this.el.nativeElement);
      this.overElement = undefined;
      this.dragElIndex = undefined;
      this.dropIndex = undefined;
    }
    e.preventDefault();
    this.dragLeaveEvent.emit(e);
  }

  @HostListener('drop', ['$event'])
  drop(e) {
    if (!this.allowDrop(e)) { return; }
    this.dragCount = 0;
    Utils.removeClass(this.el, this.dragOverClass);
    this.removeDragoverItemClass(this.sortContainer);
    this.removePlaceholder();
    e.preventDefault();
    e.stopPropagation();
    this.dragDropService.dropOnOrigin = this.isDragPlaceholderPosition(this.dropIndex);
    const draggedElIdentity = this.dragDropService.draggedElIdentity;
    this.dragDropService.draggedElIdentity = undefined; // 需要提前清除，避免新生成的节点复用了id 刷新了dragOriginPlaceholder
    let batchDraggble: Array<DraggableDirective> = [];
    if (this.dragDropService.batchDragData && this.dragDropService.batchDragData.length > 1) {
      batchDraggble = this.dragDropService.batchDragData.map(dragData => dragData.draggable)
        .filter(draggable => draggable && draggable.el.nativeElement !== this.dragDropService.draggedEl);
    }
    this.dropEvent.emit(
      new DropEvent(
        e,
        this.dragDropService.dragData,
        this.dragDropService.dropEvent,
        this.dropSortVirtualScrollOption ? this.getRealIndex(this.dropIndex, this.dropFlag) : this.dropIndex,
        this.sortContainer ? this.checkSelfFromIndex(this.dragDropService.draggedEl) : -1,
        this.dragDropService.dropOnItem,
        this.dragDropService.dropOnOrigin,
        (this.dragDropService.batchDragging)
          ? this.dragDropService.getBatchDragData(draggedElIdentity)
          : undefined
      )
    );
    // 如果drop之后drag元素被删除，则不会发生dragend事件，需要代替dragend清理
    if (this.dragDropService.dragFollow) {
      this.dragDropService.disableDraggedCloneNodeFollowMouse();
    } else {
      this.renderer.setStyle(this.dragDropService.draggedEl, 'display', '');
      this.dragDropService.dragElShowHideEvent.next(false);
    }
    if (batchDraggble.length > 0 && this.dragDropService.batchDragging) {
      batchDraggble.forEach((draggable) => {
        if (!draggable.originPlaceholder || draggable.originPlaceholder.show === false) {
          draggable.el.nativeElement.style.display = '';
        } else if (draggable.originPlaceholder.removeDelay > 0 && !this.dragDropService.dropOnOrigin) {
          draggable.delayRemoveOriginPlaceholder(false);
        } else {
          draggable.el.nativeElement.style.display = '';
          draggable.removeOriginPlaceholder(false);
        }
      });
    }
    this.dragDropService.dropEvent.next(e);
    this.dragDropService.dragData = undefined;
    this.dragDropService.scope = undefined;
    this.dragDropService.draggedEl = undefined;
    this.dragDropService.dragFollow = undefined;
    this.dragDropService.dragFollowOptions = undefined;
    this.dragDropService.dragOffset = undefined;
    this.dragDropService.dropOnOrigin = undefined;
    this.dragDropService.batchDragging = false;
    this.dragDropService.batchDragStyle = undefined;
    this.dragDropService.dragPreviewDirective = undefined;
  }

  allowDrop(e): boolean {
    if (!e) { return false; }
    if (this.allowDropCache !== undefined) {
      return this.allowDropCache;
    }
    let allowed = false;
    if (typeof this.dropScope === 'string') {
      if (typeof this.dragDropService.scope === 'string') {
        allowed = this.dragDropService.scope === this.dropScope;
      }
      if (this.dragDropService.scope instanceof Array) {
        allowed = this.dragDropService.scope.indexOf(this.dropScope) > -1;
      }
    }
    if (this.dropScope instanceof Array) {
      if (typeof this.dragDropService.scope === 'string') {
        allowed = this.dropScope.indexOf(this.dragDropService.scope) > -1;
      }
      if (this.dragDropService.scope instanceof Array) {
        allowed = this.dropScope.filter((item) => {
          return this.dragDropService.scope.indexOf(item) !== -1;
        }).length > 0;
      }
    }
    this.allowDropCache = allowed;
    return allowed;
  }

  private dropSortCountSelectorFilterFn = (value) => {
    return Utils.matches(value, this.dropSortCountSelector)
      || value.contains(this.placeholder)
      || value === this.dragDropService.dragOriginPlaceholder;
  };

  // 查询需要插入placeholder的位置
  /* eslint-disable-next-line complexity*/
  private findSortableEl(event) {
    const moveElement = event.target;
    let overElement = null;
    if (!this.sortContainer) {
      return overElement;
    }
    overElement = {index: 0, el: null, position: 'before'};
    this.dropIndex = 0;
    this.dropFlag = undefined;
    let childEls = Utils.slice(this.sortContainer.children);
    // 删除虚拟滚动等的额外元素不需要计算的元素
    if (this.dropSortCountSelector) {
      childEls = childEls.filter(this.dropSortCountSelectorFilterFn);
    }
    // 如果没有主动删除则删除多余的originplaceholder
    if (childEls.some(el =>
      el !== this.dragDropService.dragOriginPlaceholder
      && el.classList.contains('drag-origin-placeholder')
    )) {
      childEls = childEls.filter(el =>
        !(el.classList.contains('drag-origin-placeholder')
        && el !== this.dragDropService.dragOriginPlaceholder)
      );
    }
    // 要先删除clonenode否则placeholderindex是错的
    if (this.dragDropService.dragFollow && this.dragDropService.dragCloneNode) {
      const cloneNodeIndex = childEls.findIndex(value => value === this.dragDropService.dragCloneNode);
      if (-1 !== cloneNodeIndex) {
        childEls.splice(cloneNodeIndex, 1);
      }
    }
    // 计算index数组需要删除源占位符
    if (this.dragDropService.dragOriginPlaceholder) {
      const dragOriginPlaceholderIndex = childEls.findIndex(value => value === this.dragDropService.dragOriginPlaceholder);
      if (-1 !== dragOriginPlaceholderIndex) {
        this.dragElIndex = dragOriginPlaceholderIndex - 1;
        childEls.splice(dragOriginPlaceholderIndex, 1);
      } else {
        this.dragElIndex = -1;
      }
    } else {
      this.dragElIndex = -1;
    }
    // 查询是否已经插入了placeholder
    const placeholderIndex = childEls.findIndex(value => value.contains(this.placeholder));
    // 删除placeholder
    if (-1 !== placeholderIndex) {
      childEls.splice(placeholderIndex, 1);
    }
    // 如果还有placeholder在前面 dragElIndex得再减一
    if (-1 !== placeholderIndex && -1 !==  this.dragElIndex && placeholderIndex < this.dragElIndex) {
      this.dragElIndex--;
    }
    const positionIndex = -1 !== placeholderIndex ? placeholderIndex : this.dragElIndex;
    const currentIndex = childEls.findIndex(value => (
      value.contains(moveElement)
        || value.nextElementSibling === moveElement
        && value.nextElementSibling.classList.contains('drag-origin-placeholder'))
    );
    if (this.switchWhileCrossEdge && !this.allowDropOnItem && childEls.length
      && -1 !== positionIndex
      && currentIndex > -1
    ) { // 越过元素边界立即交换位置算法
      const lastIndex = positionIndex;
      // 解决抖动
      const realEl = this.overElement && (this.overElement.realEl || this.overElement.el);
      if (-1 !== currentIndex && realEl === childEls[currentIndex]) {
        this.dropIndex = this.overElement.index;
        return this.overElement;
      }

      overElement = {
        index: lastIndex > currentIndex ?  currentIndex : (currentIndex + 1),
        el:  childEls[currentIndex],
        position: lastIndex > currentIndex ? 'before' : 'after'
      };

      this.dragDropService.dropOnItem = false;
      this.dropIndex = overElement.index;
      return overElement;
    }

    if (moveElement === this.sortContainer
      || moveElement.classList.contains('drag-origin-placeholder')
      || moveElement === (this.dragDropService && this.dragDropService.dragOriginPlaceholder)
      || (!this.sortContainer.contains(moveElement) && this.defaultDropPosition === 'closest')
    ) {
      if (!childEls.length) {
        this.dropIndex = 0;
        this.dragDropService.dropOnItem = false;
        return overElement;
      }
      // 落入A元素和B元素的间隙里
      let findInGap = false;
      for (let i = 0; i < childEls.length; i++) {
        const targetElement = childEls[i];
        // 处理非越边的落到side-origin-placeholder
        if (childEls[i].nextSibling === moveElement
          && moveElement.classList.contains('drag-origin-placeholder')) {
          const position = this.calcPosition(event, moveElement);
          this.dragDropService.dropOnItem = position === 'inside';
          overElement = {index: position === 'after' ? (i + 1) : i, el: childEls[i], position: position};
          this.dropIndex = overElement.index;
          return overElement;
        }
        const positionOutside = this.calcPositionOutside(event, targetElement);
        if (positionOutside === 'before') {
          this.dragDropService.dropOnItem = false;
          overElement = {index: i, el: childEls[i], position: positionOutside, realEl: moveElement};
          this.dropIndex = overElement.index;
          findInGap = true;
          break;
        } else {
          // for 'notsure'
        }
      }
      if (!findInGap) {
        this.dragDropService.dropOnItem = false;
        overElement = {index: childEls.length , el:  childEls[childEls.length - 1], position: 'after', realEl: moveElement};
        this.dropIndex = childEls.length;
      }
      return overElement;
    }
    if (!this.sortContainer.contains(moveElement)) {
      if (this.defaultDropPosition === 'before') {
        overElement = {index: 0, el: childEls.length ? childEls[0] : null, position: 'before', realEl: moveElement};
        this.dropFlag = 'beforeAll';
      } else {
        overElement = {
          index: childEls.length,
          el: childEls.length ? childEls[childEls.length - 1] : null,
          position: 'after',
          realEl: moveElement
        };
        this.dropFlag = 'afterAll';
      }
      this.dropIndex = overElement.index;
      return overElement;
    }
    let find = false;
    for (let i = 0; i < childEls.length; i++) {
      if (childEls[i].contains(moveElement)) {
        const targetElement = childEls[i];
        const position = this.calcPosition(event, targetElement);
        this.dragDropService.dropOnItem = position === 'inside';
        overElement = {index: position === 'after' ? (i + 1) : i, el: childEls[i], position: position};
        this.dropIndex = overElement.index;
        find = true;
        break;
      }
    }
    if (!find) {
      if (childEls.length) {
        overElement = {index: childEls.length, el: childEls[childEls.length - 1 ], position: 'after'};
      }
      this.dropIndex = childEls.length;
      this.dragDropService.dropOnItem = false;
    }
    return overElement;
  }

  private calcPosition(event: any, targetElement: any) {
    const rect = targetElement.getBoundingClientRect();
    const relY = event.clientY - (rect.y || rect.top);
    const relX = event.clientX - (rect.x || rect.left);

    // 处理允许drop到元素自己
    if (this.allowDropOnItem) {
      const dropOnItemEdge = { // 有内嵌列表的时候需要修正元素的高度活宽度
        height: (this.nestingTargetRect && this.nestingTargetRect.height || rect.height),
        width: (this.nestingTargetRect && this.nestingTargetRect.width || rect.width)
      };
      const threeQuartersOfHeight = dropOnItemEdge.height * 3 / 4;
      const threeQuartersOfWidth = dropOnItemEdge.width * 3 / 4;
      const AQuarterOfHeight = Number(dropOnItemEdge.height) / 4;
      const AQuarterOfWidth = Number(dropOnItemEdge.width) / 4;

      if (this.sortDirectionZMode) {
        const slashPosition = (relY / dropOnItemEdge.height + relX / dropOnItemEdge.width);
        if (slashPosition > 0.3 &&  slashPosition <= 0.7) {
          return 'inside';
        } else if (slashPosition > 0.7) {
          const slashPositionNesting = (
            (relY - rect.height + dropOnItemEdge.height) / dropOnItemEdge.height
            + (relX - rect.width +  dropOnItemEdge.width) / dropOnItemEdge.width
          );
          if (slashPositionNesting <= 0.7) {
            return 'inside';
          }
        }
      }
      if ((this.sortDirection === 'v' && relY > AQuarterOfHeight && relY <= threeQuartersOfHeight) ||
        (this.sortDirection !== 'v' && relX > AQuarterOfWidth && relX <= threeQuartersOfWidth)) {
        //  高度的中间1/4 - 3/4 属于drop到元素自己
        return 'inside';
      } else if ((this.sortDirection === 'v' && relY > threeQuartersOfHeight
          && relY <= (rect.height - AQuarterOfHeight)) ||
          (this.sortDirection !== 'v' && relX > threeQuartersOfWidth
          &&  relX <= (rect.width - AQuarterOfWidth)))  {
        // 内嵌列表后中间区域都属于inside
        return 'inside';
      }
    }

    if (this.sortDirectionZMode) {
      if ((relY / rect.height + relX / rect.width) < 1) {
        return 'before';
      }
      return 'after';
    }
    // 其他情况保持原来的属于上半部分或者下半部分
    if ((this.sortDirection === 'v' && relY > (rect.height / 2)) ||
      (this.sortDirection !== 'v' && relX > (rect.width / 2)))  {
      return 'after';
    }
    return 'before';
  }

  private calcPositionOutside(event: any, targetElement: any) {
    const rect = this.getBoundingRectAndRealPosition(targetElement); // targetElement.getBoundingClientRect();
    const relY = event.clientY - (rect.y || rect.top);
    const relX = event.clientX - (rect.x || rect.left);

    if (this.sortDirectionZMode) {
      if ((this.sortDirection === 'v' && (relY < 0 || (relY < rect.height && relX < 0)))
        || (this.sortDirection !== 'v' && (relX < 0 || (relX < rect.width && relY < 0)))
      ) {
        return 'before';
      }
      return 'notsure';
    }

    if ((this.sortDirection === 'v' && relY < (rect.height / 2)) ||
      (this.sortDirection !== 'v' && relX < (rect.width / 2)))  {
      return 'before';
    }
    return 'notsure';
  }
  setPlaceholder = () => {
    this.ngZone.runOutsideAngular(() => {
      this.placeholder.style.width = this.dragDropService.dragOffset.width + 'px';
      this.placeholder.style.height = this.dragDropService.dragOffset.height + 'px'; // ie下clientHeight为0
      Utils.addElStyles(this.placeholder, this.placeholderStyle);
      this.placeholderRenderEvent.next({width: this.dragDropService.dragOffset.width, height: this.dragDropService.dragOffset.height});
    });
  };

  // 插入placeholder
  private insertPlaceholder(overElement) {
    const tempScrollTop = this.sortContainer.scrollTop;
    const tempScrollLeft = this.sortContainer.scrollLeft;
    let hitPlaceholder = false;
    let cmd: DragPlaceholderInsertionIndexEvent;
    const getIndex = (arr, el, defaultValue) => {
      const index = arr.indexOf(el);
      return index > -1 ? index : defaultValue;
    };
    if (null !== overElement) {
      const sortContainerChildren = Utils.slice(this.sortContainer.children).filter(
        el => el !== this.dragDropService.dragCloneNode
      );

      if (overElement.el === null) {
        cmd = {
          command: 'append'
        };
        this.sortContainer.appendChild(this.placeholder);
      } else {
        if (overElement.position === 'inside') {
          cmd = {
            command: 'remove'
          };
          this.removePlaceholder();
        } else if (this.dragDropService.dragOriginPlaceholder && this.isDragPlaceholderPosition(overElement.index)) {
          cmd = {
            command: 'remove'
          };
          this.removePlaceholder();
          hitPlaceholder = true;
        } else if (overElement.position === 'after') {
          if (overElement.el.nextSibling && overElement.el.nextSibling.classList
            && overElement.el.nextSibling.classList.contains('drag-origin-placeholder')) {
            // 针对多源占位符场景
            cmd = {
              command: 'insertBefore',
              index: getIndex(sortContainerChildren, overElement.el.nextSibling, sortContainerChildren.length) + 1
            };
            this.sortContainer.insertBefore(this.placeholder, overElement.el.nextSibling.nextSibling);

          } else {
            cmd = {
              command: 'insertBefore',
              index: getIndex(sortContainerChildren, overElement.el, sortContainerChildren.length) + 1
            };
            this.sortContainer.insertBefore(this.placeholder, overElement.el.nextSibling);
          }
        } else {
          cmd = {
            command: 'insertBefore',
            index: getIndex(sortContainerChildren, overElement.el, sortContainerChildren.length)
          };
          this.sortContainer.insertBefore(this.placeholder, overElement.el);
        }
      }
    }
    this.placeholderInsertionEvent.next(cmd);
    this.sortContainer.scrollTop = tempScrollTop;
    this.sortContainer.scrollLeft = tempScrollLeft;
    if (this.dragDropService.dragOriginPlaceholder) {
      if (hitPlaceholder) {
        this.hitDragOriginPlaceholder();
      } else  {
        this.hitDragOriginPlaceholder(false);
      }
    }
  }

  private isDragPlaceholderPosition(index) {
    if (this.dragElIndex > -1 && (index === this.dragElIndex || index === this.dragElIndex + 1)) {
      return true;
    } else {
      return false;
    }
  }
  private hitDragOriginPlaceholder(bool = true) {
    const placeholder = this.dragDropService.dragOriginPlaceholder;
    if (bool) {
      placeholder.classList.add('hit-origin-placeholder');
    } else {
      placeholder.classList.remove('hit-origin-placeholder');
    }
  }

  private removePlaceholder() {
    if (this.sortContainer && this.sortContainer.contains(this.placeholder)) {
      this.sortContainer.removeChild(this.placeholder);
      this.placeholderInsertionEvent.next({
        command: 'remove'
      });
    }
  }

  private removeDragoverItemClass(container, overElement?) {
    if (this.dragOverItemClass) {
      const dragOverItemClassGroup = container.querySelectorAll('.' + this.dragOverItemClass);
      if (dragOverItemClassGroup && dragOverItemClassGroup.length > 0) {
        for (const element of dragOverItemClassGroup) {
          if (overElement) {
            if (element !== overElement.el || overElement.position !== 'inside') {
              Utils.removeClass(element, this.dragOverItemClass);
            }
          } else {
            Utils.removeClass(element, this.dragOverItemClass);
          }
        }
      }
    }
  }

  private checkSelfFromIndex(el: any) {
    let fromIndex = -1;
    if (!this.sortContainer.contains(el)) {
      return fromIndex;
    }
    let childs = Utils.slice(this.sortContainer.children);
    if (this.dropSortCountSelector) {
      childs = childs.filter(this.dropSortCountSelectorFilterFn);
    }
    for (let i = 0; i < childs.length; i++) {
      if (childs[i].contains(this.dragDropService.draggedEl)) {
        fromIndex = i;
        break;
      }
    }
    return this.getRealIndex(fromIndex);
  }
  private getRealIndex(index, flag?: DropIndexFlag): number {
    let realIndex;
    const startIndex = this.dropSortVirtualScrollOption && this.dropSortVirtualScrollOption.startIndex || 0;
    const totalLength = this.dropSortVirtualScrollOption && this.dropSortVirtualScrollOption.totalLength;
    if (flag === 'beforeAll') {
      realIndex = 0;
    } else if (flag === 'afterAll') {
      realIndex = totalLength || index;
    } else {
      realIndex = startIndex + index;
    }
    return realIndex;
  }

  getBoundingRectAndRealPosition(targetElement) {
    // 用于修复部分display none的元素获取到的top和left是0， 取它下一个元素的左上角为坐标
    let rect = targetElement.getBoundingClientRect();
    const {bottom, right, width, height} = rect;
    if (rect.width === 0 && rect.height === 0 &&
      (targetElement.style.display === 'none' || getComputedStyle(targetElement).display === 'none')) {
      if (targetElement.nextElementSibling) {
        const {top: realTop, left: realLeft} =  targetElement.nextElementSibling.getBoundingClientRect();
        rect = {x: realLeft, y: realTop, top: realTop, left: realLeft, bottom, right, width, height};
      }
    }
    return rect;
  }
  getSortContainer() {
    return this.sortContainer;
  }
}
