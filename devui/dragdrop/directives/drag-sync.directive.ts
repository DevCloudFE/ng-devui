import { Directive, Input, Self, OnInit, Optional, OnDestroy, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { DragDropSyncService } from '../services/drag-drop-sync.service';
import { DragDropService } from '../services/drag-drop.service';
import { DraggableDirective } from './draggable.directive';

@Directive({
  selector: '[dDragSync]',
  exportAs: 'dDragSync'
})
export class DragSyncDirective implements OnInit, OnDestroy {
  @Input('dDragSync') dragSyncGroup = '';
  subscription: Subscription = new Subscription();
  syncGroupDirectives: Array<DragSyncDirective>;

  constructor(public el: ElementRef , @Optional() @Self() private draggable: DraggableDirective,
  private dragDropSyncService: DragDropSyncService, private dragDropService: DragDropService) {}

  ngOnInit() {
    if (this.draggable) {
      this.subscription.add(this.draggable.dragElShowHideEvent.subscribe(this.subDragElEvent));
      this.subscription.add(this.draggable.beforeDragStartEvent.subscribe(() => {
        this.syncGroupDirectives = this.dragDropSyncService.getDragSyncByGroup(this.dragSyncGroup).filter(directive => directive !== this);
        this.dragDropService.dragSyncGroupDirectives = this.syncGroupDirectives;
      }));
      this.subscription.add(this.draggable.dropEndEvent.subscribe(() => {
        this.dragDropService.dragSyncGroupDirectives = undefined;
        this.syncGroupDirectives = undefined;
      }));
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  subDragElEvent = (bool: boolean) => {
    this.syncGroupDirectives.forEach(dir => this.renderDisplay(dir.el.nativeElement, bool));
  }

  renderDisplay(nativeEl: HTMLElement, bool: boolean) {
    nativeEl.style.display = bool ? '' : 'none';
  }

}
