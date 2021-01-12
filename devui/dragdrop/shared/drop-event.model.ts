import { Subject } from 'rxjs';
export class DropEvent {
  nativeEvent: any;
  dragData: any;
  batchDragData: any;
  dropSubject: Subject<any>;
  dropIndex?: number;
  dragFromIndex?: number;
  dropOnItem?: boolean;
  dropOnOrigin?: boolean;
  constructor(event: any, data: any, dropSubject: Subject<any>, dropIndex?: number, dragFromIndex?: number, dropOnItem?: boolean,
              dropOnOrigin?: boolean, batchDragData?: Array<any>) {
    this.nativeEvent = event;
    this.dragData = data;
    this.dropSubject = dropSubject;
    this.dropIndex = dropIndex;
    this.dragFromIndex = dragFromIndex;
    this.dropOnItem = dropOnItem;
    this.dropOnOrigin = dropOnOrigin;
    this.batchDragData = batchDragData;
  }
}
