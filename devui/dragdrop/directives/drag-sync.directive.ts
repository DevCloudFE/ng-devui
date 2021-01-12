import { Directive, ElementRef, Inject, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { Subscription } from 'rxjs';
import { DescendantChildren } from '../services/drag-drop-desc-reg.service';
import { DragSyncDescendantRegisterService } from '../services/drag-drop-descendant-sync.service';
import { DragDropSyncService } from '../services/drag-drop-sync.service';
import { DragDropService } from '../services/drag-drop.service';
import { DraggableDirective } from './draggable.directive';

@Directive({
  selector: '[dDragSync]',
  exportAs: 'dDragSync'
})
export class DragSyncDirective extends DescendantChildren<DragSyncDirective> implements OnInit, OnDestroy {
  @Input('dDragSync') dragSyncGroup = '';
  subscription: Subscription = new Subscription();
  syncGroupDirectives: Array<DragSyncDirective>;

  constructor(
    public el: ElementRef,
    @Optional() @Self() private draggable: DraggableDirective,
    private dragDropSyncService: DragDropSyncService,
    private dragDropService: DragDropService,
    private dragSyncDrs: DragSyncDescendantRegisterService,
  ) {
    super(dragSyncDrs);
    this.descendantItem = this;
  }

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
    super.ngOnInit();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    super.ngOnDestroy();
  }

  subDragElEvent = (bool: boolean) => {
    this.syncGroupDirectives.forEach(dir => this.renderDisplay(dir.el.nativeElement, bool));
  }

  renderDisplay(nativeEl: HTMLElement, bool: boolean) {
    nativeEl.style.display = bool ? '' : 'none';
  }

}
