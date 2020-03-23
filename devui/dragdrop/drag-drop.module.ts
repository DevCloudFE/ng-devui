import { NgModule } from '@angular/core';
import { DraggableDirective } from './directives/draggable.directive';
import { DroppableDirective } from './directives/droppable.directive';
import { DragDropService } from './services/drag-drop.service';
import { SortableDirective } from './directives/sortable.directive';
import { BatchDraggableDirective } from './directives/batch-draggable.directive';
import { DropScrollEnhancedDirective } from './directives/drop-scroll-enhance.directive';
import { DragSyncDirective } from './directives/drag-sync.directive';
import { DragDropSyncBoxDirective } from './directives/dragdrop-sync-box.directive';
import { DropSortSyncDirective } from './directives/drop-sort-sync.directive';
import { DragPreviewDirective } from './directives/drag-preview.directive';
import { DragPreviewComponent } from './directives/drag-preview.component';
import { CommonModule } from '@angular/common';
import { DragPreviewCloneDomRefComponent } from './directives/drag-preivew-clone-from-domRef.component';
import { DropScrollEnhancedSideDirective } from './directives/drop-scroll-enhance-side.directive';


@NgModule({
  imports: [CommonModule],
  declarations: [
    DraggableDirective,
    DroppableDirective,
    SortableDirective,
    DropScrollEnhancedDirective,
    DropScrollEnhancedSideDirective,
    BatchDraggableDirective,
    DragSyncDirective,
    DropSortSyncDirective,
    DragDropSyncBoxDirective,
    DragPreviewDirective,
    DragPreviewComponent,
    DragPreviewCloneDomRefComponent,
  ],
  exports: [
    DraggableDirective,
    DroppableDirective,
    SortableDirective,
    DropScrollEnhancedDirective,
    DropScrollEnhancedSideDirective,
    BatchDraggableDirective,
    DragSyncDirective,
    DropSortSyncDirective,
    DragDropSyncBoxDirective,
    DragPreviewDirective,
    DragPreviewComponent,
    DragPreviewCloneDomRefComponent,
  ],
  providers: [
      DragDropService
  ],
  entryComponents: [
    DragPreviewComponent,
  ],
})
export class DragDropModule {
}
