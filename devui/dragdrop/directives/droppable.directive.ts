import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Output,
  EventEmitter,
  Renderer2,
  OnInit,
  AfterViewInit,
  OnDestroy,
  NgZone
} from '@angular/core';
import { DropEvent } from '../shared/drop-event.model';
import { DragDropService } from '../services/drag-drop.service';
import { Utils } from '../shared/utils';
import { Subscription } from 'rxjs';

@Directive({
    selector: '[aveDroppable]'
})
export class DroppableDirective implements OnInit, AfterViewInit, OnDestroy {

    /**
     *  Event fired when Drag dragged element enters a valid drop target.
     */
    @Output() dragEnterEvent: EventEmitter<any> = new EventEmitter();

    /**
     * Event fired when an element is being dragged over a valid drop target
     */
    @Output() dragOverEvent: EventEmitter<any> = new EventEmitter();

    /**
     * Event fired when a dragged element leaves a valid drop target.
     */
    @Output() dragLeaveEvent: EventEmitter<any> = new EventEmitter();

    /**
     * Event fired when an element is dropped on a valid drop target.
     */
    @Output() dropEvent: EventEmitter<DropEvent> = new EventEmitter();

    /**
     * CSS class applied on the draggable that is applied when the item is being dragged.
     */
    @Input() dragOverClass: string;

    /**
     * Defines compatible drag drop pairs. Values must match both in draggable and droppable.dropScope.
     */
    @Input() dropScope: string | Array<string> = 'default';

    @Input() placeholderTag = 'div';

    @Input() placeholderStyle: any = {backgroundColor: '#6A98E3', opacity: '.4'};

    /**
     * 设置placehoder的提示性文字，仅支持文本（安全起见）
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
    @Input() nestingTargetRect: {height?: number, width?: number};

    private sortContainer: any;
    private sortDirection: 'v';
    private placeholder: any;

    // 用于修复dragleave多次触发
    private dragCount = 0;

    private dropIndex = -1;

    private dragStartSubscription: Subscription;
    private dragEndSubscription: Subscription;

    // 记录上一次悬停的元素，用于对比悬停的元素等是否发生变化
    private overElement;

    constructor(protected el: ElementRef, private renderer: Renderer2, private dragDropService: DragDropService, private ngZone: NgZone) {

    }

    ngOnInit() {
        this.placeholder = document.createElement(this.placeholderTag);
        this.dragStartSubscription = this.dragDropService.onDragStart.subscribe(() => {
            this.placeholder.className = 'drag-placeholder';
            this.placeholder.innerText = this.placeholderText;
            this.placeholder.style.width = this.dragDropService.draggedEl.clientWidth + 'px';
            this.placeholder.style.height =  this.dragDropService.draggedEl.clientHeight + 'px';
            this.addElStyles(this.placeholder, this.placeholderStyle);
            if (this.dragDropService.dragFollow) {
              this.ngZone.runOutsideAngular(() => {
                this.el.nativeElement.addEventListener('dragover', this.dragDropService.followMouse);
              });
            }
        });
        this.dragEndSubscription = this.dragDropService.onDrop.subscribe(() => {
          if (this.dragDropService.draggedEl) {
            if (!this.dragDropService.dragFollow) {
              this.renderer.setStyle(this.dragDropService.draggedEl, 'display', '');
            } else {
              this.ngZone.runOutsideAngular(() => {
                this.el.nativeElement.removeEventListener('dragover', this.dragDropService.followMouse);
              });
            }
          }
          this.removePlaceholder();
      });
        this.dragEndSubscription = this.dragDropService.onDragEnd.subscribe(() => {
            if (this.dragDropService.draggedEl) {
              if (!this.dragDropService.dragFollow) {
                this.renderer.setStyle(this.dragDropService.draggedEl, 'display', '');
              } else {
                this.ngZone.runOutsideAngular(() => {
                  this.el.nativeElement.removeEventListener('dragover', this.dragDropService.followMouse);
                });
              }
            }
            this.removePlaceholder();
            this.dragCount = 0;
        });
    }

    ngAfterViewInit() {
        if (this.el.nativeElement.hasAttribute('ave-sortable')) {
            this.sortContainer = this.el.nativeElement;
          } else {
            this.sortContainer = this.el.nativeElement.querySelector('[ave-sortable]');
          }
         this.sortDirection = this.sortContainer ? this.sortContainer.getAttribute('avesortable') || 'v' : 'v';
    }

    ngOnDestroy() {
        this.dragStartSubscription.unsubscribe();
        this.dragEndSubscription.unsubscribe();
    }

    @HostListener('dragenter', ['$event'])
    dragEnter(e) {
        this.dragCount++;
        e.preventDefault();
        e.stopPropagation();
        this.dragEnterEvent.emit(e);
    }

    @HostListener('dragover', ['$event'])
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
            }
            Utils.addClass(this.el, this.dragOverClass);
            if (this.sortContainer && !e.target.contains(this.placeholder)) {
              const overElement = this.findSortableEl(e);
              if (!this.overElement || this.overElement.el !== overElement.el || this.overElement.position !== overElement.position) {
                // overElement的参数有刷新的时候才进行插入等操作
                this.overElement = overElement;

                this.insertPlaceholder(overElement);

                this.removeDragoverItemClass(this.sortContainer, overElement);
                if (overElement.position === 'inside' && this.dragOverItemClass) {
                  Utils.addClass(overElement.el, this.dragOverItemClass);
                }
              }
            }

            if (this.dragDropService.draggedEl) {
              if (!this.dragDropService.dragFollow) {
                this.renderer.setStyle(this.dragDropService.draggedEl, 'display', 'none');
              } else {
                // this.enableDraggedElFollowMouse();
              }
            }
            e.preventDefault();
            e.stopPropagation();
            this.dragOverEvent.emit(e);
        }
    }

    @HostListener('dragleave', ['$event'])
    dragLeave(e) {
        // 用于修复包含子元素时，多次触发dragleave
        this.dragCount--;
        if (0 === this.dragCount) {
            this.dragDropService.dropTargets = [];
            Utils.removeClass(this.el, this.dragOverClass);
            this.removePlaceholder();
            this.removeDragoverItemClass(this.el.nativeElement);
            this.overElement = undefined;
            // this.renderer.setElementStyle(this.dragDropService.draggedEl, 'display', '');
        }
        e.preventDefault();
        e.stopPropagation();
        this.dragLeaveEvent.emit(e);
        // this.isDragOver = false;
    }

    @HostListener('drop', ['$event'])
    drop(e) {
        this.dragCount = 0;
        Utils.removeClass(this.el, this.dragOverClass);
        this.removeDragoverItemClass(this.sortContainer);
        this.removePlaceholder();
        e.preventDefault();
        e.stopPropagation();
        this.dropEvent.emit(new DropEvent(e, this.dragDropService.dragData, this.dragDropService.onDrop, this.dropIndex,
          this.sortContainer ? this.checkSelfFromIndex(this.dragDropService.draggedEl) : -1, this.dragDropService.dropOnItem));
          // 如果drop之后drag元素被删除，则不会发生dragend事件，需要代替dragend清理
        if (this.dragDropService.dragFollow) {
          this.ngZone.runOutsideAngular(() => {
            this.el.nativeElement.removeEventListener('dragover', this.dragDropService.followMouse);
          });
          this.dragDropService.enableDraggedElFollowMouse(false);
        } else {
          this.renderer.setStyle(this.dragDropService.draggedEl, 'display', '');
        }
        this.dragDropService.onDrop.next(e);
        this.dragDropService.dragData = undefined;
        this.dragDropService.scope = undefined;
        this.dragDropService.draggedEl = undefined;
        this.dragDropService.dragFollow = undefined;
        this.dragDropService.dragOffset = undefined;
        this.dragDropService.draggedElOriginStyle = undefined;

    }

    allowDrop(e): boolean {
      if (!e) { return false; }
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

        return allowed;
    }

    // 查询需要插入placeholder的位置
    private findSortableEl(event) {
      const moveElement = event.target;
      let overElement = null;
      if (!this.sortContainer) {
          return overElement;
      }
      overElement = {index: 0, el: null, position: 'before'};
      this.dropIndex = 0;
       const childEls =   [].slice.call(this.sortContainer.children);
      // 查询是否已经插入了placeholder
      const placeholderIndex = childEls.findIndex(value => value.contains(this.placeholder));
      // 删除placeholder
      if (-1 !== placeholderIndex) {
          childEls.splice(placeholderIndex, 1);
      }

      if (moveElement.contains( this.sortContainer)) {
          this.dropIndex = childEls.length;
          this.dragDropService.dropOnItem = false;
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
          this.dropIndex = childEls.length;
      }
      return overElement;
  }

    // 根据高度计算
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
        if ((this.sortDirection === 'v' && relY > dropOnItemEdge.height * 1 / 4 && relY <= (dropOnItemEdge.height * 3 / 4)) ||
          (this.sortDirection !== 'v' && relX > dropOnItemEdge.width  * 1 / 4 && relX <= (dropOnItemEdge.width * 3 / 4))) {
          //  高度的中间1/4 - 3/4 属于drop到元素自己
          return 'inside';
        } else if ((this.sortDirection === 'v' && relY > (dropOnItemEdge.height * 3 / 4)
            && relY <= (rect.height - dropOnItemEdge.height * 1 / 4) ) ||
            (this.sortDirection !== 'v' && relX > (dropOnItemEdge.width * 3 / 4)
            &&  relX <= (rect.width - dropOnItemEdge.width * 1 / 4)))  {
          // 内嵌列表后中间区域都属于inside
          return 'inside';
        }
      }
      // 其他情况保持原来的属于上半部分或者下半部分

      if ((this.sortDirection === 'v' && relY > (rect.height / 2)) ||
          (this.sortDirection !== 'v' && relX > (rect.width / 2)))  {
          return 'after';
      }
      return 'before';
  }

    // 插入placeholder
    private insertPlaceholder(overElement) {
      if (null !== overElement) {
          if (null === overElement.el) {
              this.sortContainer.appendChild(this.placeholder);
          } else {
              if (overElement.position === 'inside') {
                this.removePlaceholder();
              } else if (overElement.position === 'after') {
                  this.sortContainer.insertBefore(this.placeholder, overElement.el.nextSibling);
              } else {
                  this.sortContainer.insertBefore(this.placeholder, overElement.el);
              }
          }
      }
  }

    private removePlaceholder() {
        if (this.sortContainer && this.sortContainer.contains(this.placeholder)) {
            this.sortContainer.removeChild(this.placeholder);
        }
    }

    private removeDragoverItemClass(container, overElement?) {
      if (this.dragOverItemClass) {
          const dragOverItemClassGroup = container.querySelectorAll('.' + this.dragOverItemClass);
          if (dragOverItemClassGroup && dragOverItemClassGroup.length > 0) {
            // dragOverItemClassGroup.forEach(element => {
            for (const element of dragOverItemClassGroup) {
              if (overElement) {
                if (element !== overElement.el || overElement.position !== 'inside') {
                    Utils.removeClass(element, this.dragOverItemClass);
                }
              } else {
                  Utils.removeClass(element, this.dragOverItemClass);
              }
            }
            // });
          }
      }
    }

    private checkSelfFromIndex(el: any) {
        let fromIndex = -1;
        if (!this.sortContainer.contains(el)) {
            return fromIndex;
        }
        const childs = this.sortContainer.children;
        for (let i = 0; i < childs.length; i++) {
            if (childs[i].contains(this.dragDropService.draggedEl)) {
                 fromIndex = i;
                 break;
            }
        }
        return fromIndex;
    }

    // 动态添加styles
    private addElStyles(el: any, styles: any) {
        if (styles instanceof Object) {
            for (const s in styles) {
                if (styles.hasOwnProperty(s)) {
                    el.style[s] = styles[s];
                }
            }
        }
    }

}
