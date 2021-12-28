import { AfterViewInit, Directive, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DescendantRoot } from '../services/drag-drop-desc-reg.service';
import { DragSyncDescendantRegisterService, DropSortSyncDescendantRegisterService } from '../services/drag-drop-descendant-sync.service';
import { DragDropSyncService } from '../services/drag-drop-sync.service';
import { DragSyncDirective } from './drag-sync.directive';
import { DropSortSyncDirective } from './drop-sort-sync.directive';

@Directive({
  selector: '[dDragDropSyncBox]',
  exportAs: 'dDragDropSyncBox',
  providers: [
    DragDropSyncService,
    DragSyncDescendantRegisterService,
    DropSortSyncDescendantRegisterService,
  ]
})
export class DragDropSyncBoxDirective implements OnInit, AfterViewInit, OnDestroy {
  sub = new Subscription();
  // @ContentChildren(DragSyncDirective, {descendants: true})
  dragSyncList: DescendantRoot<DragSyncDirective>;
  // @ContentChildren(DropSortSyncDirective, {descendants: true})
  dropSyncList: DescendantRoot<DropSortSyncDirective>;
  constructor(private dragDropSyncService: DragDropSyncService,
              private dragSyncDrs: DragSyncDescendantRegisterService,
              private dropSortSyncDrs: DropSortSyncDescendantRegisterService) {
  }

  ngOnInit() {
    this.dragSyncList = new DescendantRoot<DragSyncDirective>(this.dragSyncDrs);
    this.dropSyncList = new DescendantRoot<DropSortSyncDirective>(this.dropSortSyncDrs);
  }
  ngAfterViewInit() {
    this.dragSyncList.on();
    this.dropSyncList.on();
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
    this.dragSyncList.off();
    this.dropSyncList.off();
  }

}
