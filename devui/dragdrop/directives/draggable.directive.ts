import { AfterViewInit, Directive, ElementRef, EventEmitter, HostBinding,
  HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { DragDropService } from '../services/drag-drop.service';
import { Utils } from '../shared/utils';

@Directive({
    selector: '[dDraggable]'
})
/**
 * Makes an element draggable by adding the draggable html attribute
 */
export class DraggableDirective implements OnInit, AfterViewInit {
    @HostBinding('draggable') draggable = true;
    /**
     * The data that will be avaliable to the droppable directive on its `onDrop()` event.
     */
    @Input() dragData;

    /**
     * The selector that defines the drag Handle. If defined drag will only be allowed if dragged from the selector element.
     */
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
    @Output() dragStartEvent: EventEmitter<any> = new EventEmitter();

    /**
     * Event fired while the element is being dragged
     * 为了性能优化，该函数废弃，请用(drag)自行监听， 如果不需要angular脏检测则最好用runousideAngular的addEventListenr监听以获得好的性能
     */
    @Output() dragEvent: EventEmitter<any> = new EventEmitter();

    /**
     * Event fired when dragged ends
     */
    @Output() dragEndEvent: EventEmitter<any> = new EventEmitter();

    /**
     * Keeps track of mouse over element that is used to determine drag handles
     */
    private mouseOverElement: any;
    @Output() dropEndEvent: EventEmitter<any> = new EventEmitter();
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
    imageHandle = new Image();

    constructor(private el: ElementRef, private renderer: Renderer2, private dragDropService: DragDropService) {
    }

    ngOnInit() {
        this.dragDropService.newSubscription().add(this.dragDropService.onDrop.subscribe((event) => {
            if (this.dragDropService.draggedEl === this.el.nativeElement) {
               this.renderer.removeClass(this.el.nativeElement, this.dragOverClass);
               this.dropEndEvent.emit(event);
            }
            this.dragDropService.subscription.unsubscribe();
        }));
    }

    ngAfterViewInit() {
        this.applyDragHandleClass();
    }

    @HostListener('dragstart', ['$event'])
    dragStart(e) {
        if (this.allowDrag()) {
            this.renderer.addClass(this.el.nativeElement, this.dragOverClass);
            this.dragDropService.dragData = this.dragData;
            this.dragDropService.scope = this.dragScope;
            this.dragDropService.draggedEl = this.el.nativeElement;
            this.dragDropService.dragFollow = this.enableDragFollow;
            if (this.dragDropService.dragFollow) {
              this.dragDropService.renderer = this.renderer;
              const mousePositionXY = this.mousePosition(e);
              const targetOffset = this.getElAbsolute(this.el.nativeElement);

              this.dragDropService.dragOffset = {
                left: targetOffset.left - mousePositionXY.x,
                top: targetOffset.top - mousePositionXY.y,
                width: targetOffset.width,
                height: targetOffset.height
              };
              this.dragDropService.draggedElOriginStyle = {
                position: this.dragDropService.draggedEl.style.position,
                zIndex: this.dragDropService.draggedEl.style.zIndex,
                left: this.dragDropService.draggedEl.style.left,
                top: this.dragDropService.draggedEl.style.top,
                pointerEvents: this.dragDropService.draggedEl.style.pointerEvents,
                width: this.dragDropService.draggedEl.style.width,
                height: this.dragDropService.draggedEl.style.height
              };
              setTimeout(() => {
                this.dragDropService.enableDraggedElFollowMouse();
              });
            }
            // Firefox requires setData() to be called otherwise the drag does not work.
            if (e.dataTransfer != null) {
                e.dataTransfer.setData('text', '');
            }
            e.dataTransfer.effectAllowed = this.dragEffect;
            if (this.enableDragFollow) {
              if ('function' === typeof DataTransfer.prototype.setDragImage) {
                e.dataTransfer.setDragImage(this.imageHandle, 0 , 0);
              } else {
                  e.srcElement.style.display = 'none';
                  setTimeout(() => {
                    e.srcElement.style.display = '';
                    this.dragStartEvent.emit(e);
                    this.dragDropService.onDragStart.next(e);
                  });
                  e.stopPropagation();
                  return;
              }
            }
            e.stopPropagation();
            this.dragStartEvent.emit(e);
            this.dragDropService.onDragStart.next(e);
        } else {
            e.preventDefault();
        }
    }

    // @HostListener('drag', ['$event'])
    // drag(e) {
        // this.dragEvent.emit(e);
    // }

    @HostListener('dragend', ['$event'])
    dragEnd(e) {
      // console.log('dragend');
      this.renderer.removeClass(this.el.nativeElement, this.dragOverClass);
      this.dragDropService.onDragEnd.next(e);
      if (this.dragDropService.draggedEl) { // 当dom被清除的的时候不会触发dragend，所以清理工作部分交给了drop，但是内部排序的时候dom不会被清理，dragend防止和drop重复操作清理动作
        if (this.dragDropService.dragFollow) {
          this.dragDropService.enableDraggedElFollowMouse(false);
        }
        this.dragDropService.dragData = undefined;
        this.dragDropService.scope = undefined;
        this.dragDropService.draggedEl = undefined;
        this.dragDropService.dragFollow = undefined;
        this.dragDropService.dragOffset = undefined;
        this.dragDropService.draggedElOriginStyle = undefined;
      }
      e.stopPropagation();
      e.preventDefault();
      this.dragEndEvent.emit(e);
    }

    @HostListener('mouseover', ['$event'])
    mouseover(e) {
        this.mouseOverElement = e.target;
    }

    private allowDrag() {
        if (!this.draggable) {
            return false;
        }
        if (this.dragHandle) {
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

    // 获取元素的绝对位置，大小。 参数js对象
    private getElAbsolute(elem) {
        let t = elem.offsetTop;
        let l = elem.offsetLeft;
        const w = elem.offsetWidth;
        const h = elem.offsetHeight;
        elem = elem.offsetParent;
        while (elem !== null) {
            t += elem.offsetTop;
            l += elem.offsetLeft;
            t -= elem.scrollTop;
            l -= elem.scrollLeft;
            elem = elem.offsetParent;
        }
        let left = 0;
        let top = 0;
        if (document.compatMode !== 'BackCompat') {
    　　　　　left = document.documentElement.scrollLeft;
    　　　　　top = document.documentElement.scrollTop;
  　　　　}
        return {
            top: t - top,
            left: l - left,
            width: w,
            height: h
        };
    }
    // 兼容各种浏览器的,获取鼠标真实位置
    private mousePosition(event) {
      // tslint:disable-next-line: deprecation 用于兼容老一点浏览器
      if (!event) { event = window.event; }
      return {
          x: event.clientX,
          y: event.clientY
      };
    }
}
