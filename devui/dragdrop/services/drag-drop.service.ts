/**
 * Created by orehman on 2/22/2017.
 */

import { Injectable, Renderer2, NgZone } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

@Injectable()
export class DragDropService {
    dragData: any;
    draggedEl: any;
    scope: string | Array<string>;
    dropTargets = [];
    onDrop: Subject<any> = new Subject();
    onDragEnd = new Subject<any>();
    onDragStart = new Subject<any>();
    dropOnItem: boolean;
    dragFollow: boolean;
    // 以下三项只有dragFollow为true的时候才有值
    draggedElOriginStyle: any;
    draggedElFollowingMouse: boolean;
    dragOffset: {
      top: number;
      left: number;
      width?: number;
      height?: number;
    };
    subscription: Subscription = new Observable().subscribe();
    renderer: Renderer2;
    constructor(private ngZone: NgZone) {}
    newSubscription() {
        this.subscription.unsubscribe();
        return this.subscription = new Observable().subscribe();
    }

    enableDraggedElFollowMouse(enable = true) {
      if (enable) {
        if (!this.draggedElFollowingMouse) {
          const dragFollowNode =  this.draggedEl;

          this.renderer.setStyle(dragFollowNode, 'position', 'fixed');
          this.renderer.setStyle(dragFollowNode, 'zIndex', '1000');
          this.renderer.setStyle(dragFollowNode, 'pointerEvents', 'none');
          this.renderer.setStyle(dragFollowNode, 'width', this.dragOffset.width + 'px');
          this.renderer.setStyle(dragFollowNode, 'height', this.dragOffset.height + 'px');
          this.ngZone.runOutsideAngular(() => {
            // console.log('set')
            document.addEventListener('dragover', this.followMouse);
            // this.el.nativeElement.addEventListener('dragover', this.followMouse);
            dragFollowNode.addEventListener('dragover', this.fixSupportOfPointerEvents); // ie10 only
            dragFollowNode.addEventListener('drop', this.fixSupportOfPointerEvents); // ie10 only
          });
          this.draggedElFollowingMouse = true;
        }
      } else {
        if (this.draggedElFollowingMouse) {
          const dragFollowNode =  this.draggedEl;
          const originStyle = this.draggedElOriginStyle;

          this.ngZone.runOutsideAngular(() => {
            // console.log('clean')
            document.removeEventListener('dragover', this.followMouse);
            // this.el.nativeElement.removeEventListener('dragover', this.followMouse);
            dragFollowNode.removeEventListener('dragover', this.fixSupportOfPointerEvents); // ie10 only
            dragFollowNode.removeEventListener('drop', this.fixSupportOfPointerEvents); // ie10 only
          });

          this.renderer.setStyle(dragFollowNode, 'left', originStyle.left || null);
          this.renderer.setStyle(dragFollowNode, 'top', originStyle.top || null);
          this.renderer.setStyle(dragFollowNode, 'position', originStyle.position || null);
          this.renderer.setStyle(dragFollowNode, 'zIndex', originStyle.zIndex || null);
          this.renderer.setStyle(dragFollowNode, 'pointerEvents', originStyle.pointerEvents || null);
          this.renderer.setStyle(dragFollowNode, 'width', originStyle.width || null);
          this.renderer.setStyle(dragFollowNode, 'height', originStyle.height || null);
          this.draggedElFollowingMouse = false;
        }
      }


  }

  followMouse = (event) => {
    if (!event) { event = window.event; }
    const offset = this.dragOffset;
    // console.log(event.target);
    this.ngZone.runOutsideAngular(() => {
      this.renderer.setStyle(this.draggedEl, 'left', event.clientX + offset.left + 'px');
      this.renderer.setStyle(this.draggedEl, 'top', event.clientY  + offset.top + 'px');
    });
  }

  /**
   * 修复ie10下pointer-events: none 不生效无法击穿的问题。 注意此处this是监听的target
   */
  fixSupportOfPointerEvents =  function (event: DragEvent) {
    if (this.style.pointerEvents === 'none') {
      this.style.display = 'none';
      const {x, y} = {x: event.pageX, y: event.pageY};
      const under = document.elementFromPoint(x, y);
      this.style.display = '';
      event.stopPropagation();
      event.preventDefault();

      const ev = document.createEvent('DragEvent');
      ev.initMouseEvent(event.type, true, true, window, 0,
        event.screenX, event.screenY, event.clientX, event.clientY,
        event.ctrlKey, event.altKey, event.shiftKey, event.metaKey,
        event.button, event.relatedTarget);
      if (ev.dataTransfer !== null) {
        ev.dataTransfer.setData('text', '');
        ev.dataTransfer.effectAllowed = event.dataTransfer.effectAllowed;
      }

      under.dispatchEvent(ev);
    }
  };
}
