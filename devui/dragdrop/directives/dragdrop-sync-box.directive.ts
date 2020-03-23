import { Directive, OnDestroy, ContentChildren, QueryList, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DragDropSyncService } from '../services/drag-drop-sync.service';
import { DragSyncDirective } from './drag-sync.directive';
import { DropSortSyncDirective } from './drop-sort-sync.directive';

@Directive({
  selector: '[dDragDropSyncBox]',
  exportAs: 'dDragDropSyncBox',
  providers: [DragDropSyncService]
})

export class DragDropSyncBoxDirective implements AfterViewInit, OnDestroy {
  sub = new Subscription();
  @ContentChildren(DragSyncDirective, {descendants: true}) dragSyncList: QueryList<DragSyncDirective>;
  @ContentChildren(DropSortSyncDirective, {descendants: true}) dropSyncList: QueryList<DropSortSyncDirective>;
  constructor(private dragDropSyncService: DragDropSyncService) {}
  ngAfterViewInit() {
    this.dragDropSyncService.updateDragSyncList(this.dragSyncList);
    this.dragDropSyncService.updateDropSyncList(this.dropSyncList);
    this.sub.add(
      this.dragSyncList.changes.subscribe(
        list => this.dragDropSyncService.updateDragSyncList(list)
      )
    ).add(
      this.dropSyncList.changes.subscribe(
        list => this.dragDropSyncService.updateDropSyncList(list)
      )
    );
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
