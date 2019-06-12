import {NgModule} from '@angular/core';
import {DraggableDirective} from './directives/draggable.directive';
import {DroppableDirective} from './directives/droppable.directive';
import {DragDropService} from './services/drag-drop.service';
import { SortableDirective } from './directives/sortable.directive';


@NgModule({
  imports: [],
  declarations: [
    DraggableDirective,
    DroppableDirective,
    SortableDirective
  ],
  exports: [
    DraggableDirective,
    DroppableDirective,
    SortableDirective
  ],
  providers: [
      DragDropService
  ],
})
export class DragDropModule {
}
