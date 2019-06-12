import { Subject } from 'rxjs';
export class DropEvent {
    nativeEvent: any;
    dragData: any;
    dropSubject: Subject<any>;
    dropIndex?: number;
    dragFromIndex?: number;
    dropOnItem?: boolean;
    constructor(event: any, data: any, dropSubject: Subject<any>, dropIndex?: number, dragFromIndex?: number, dropOnItem?: boolean) {
        this.nativeEvent = event;
        this.dragData = data;
        this.dropSubject = dropSubject;
        this.dropIndex = dropIndex;
        this.dragFromIndex = dragFromIndex;
        this.dropOnItem = dropOnItem;
    }
}
