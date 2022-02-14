import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BatchDraggableDirective } from './directives/batch-draggable.directive';
import { DragPreviewCloneDomRefComponent } from './directives/drag-preivew-clone-from-domRef.component';
import { DragPreviewComponent } from './directives/drag-preview.component';
import { DragPreviewDirective } from './directives/drag-preview.directive';
import { DragSyncDirective } from './directives/drag-sync.directive';
import { DragDropSyncBoxDirective } from './directives/dragdrop-sync-box.directive';
import { DraggableDirective } from './directives/draggable.directive';
import { DropScrollEnhancedSideDirective } from './directives/drop-scroll-enhance-side.directive';
import { DropScrollEnhancedDirective } from './directives/drop-scroll-enhance.directive';
import { DropSortSyncDirective } from './directives/drop-sort-sync.directive';
import { DroppableDirective } from './directives/droppable.directive';
import { SortableDirective } from './directives/sortable.directive';
import { DragDropService } from './services/drag-drop.service';

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

})
export class DragDropModule {
}
