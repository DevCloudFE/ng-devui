import { Injectable, QueryList } from '@angular/core';
import { DragSyncDirective } from '../directives/drag-sync.directive';
import { DropSortSyncDirective } from '../directives/drop-sort-sync.directive';

@Injectable()
export class DragDropSyncService {
  dragSyncList: QueryList<DragSyncDirective>;

  dropSortSyncList: QueryList<DropSortSyncDirective>;

  public updateDragSyncList(list: QueryList<DragSyncDirective> ) {
    this.dragSyncList = list;
  }
  public getDragSyncByGroup(groupName: string) {
    if (groupName === '') {
      return [];
    }
    return this.dragSyncList ? this.dragSyncList.filter(dragSync => dragSync.dragSyncGroup === groupName) : [];
  }

  public updateDropSyncList(list: QueryList<DropSortSyncDirective> ) {
    this.dropSortSyncList = list;
  }
  public getDropSyncByGroup(groupName: string) {
    if (groupName === '') {
      return [];
    }
    return this.dropSortSyncList ? this.dropSortSyncList.filter(dropSync => dropSync.dropSyncGroup === groupName) : [];
  }
}
