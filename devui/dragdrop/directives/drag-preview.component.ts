import {  Component, TemplateRef, ElementRef, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'd-drag-preview',
  templateUrl: './drag-preview.component.html'
})

export class DragPreviewComponent {
  element;
  data;
  draggedEl;
  dragData;
  batchDragData;
  dragSyncDOMElements;
  templateRef: TemplateRef<any>;
  constructor(private el: ElementRef, private cdr: ChangeDetectorRef) {
    this.element =  el.nativeElement;
  }
  public updateTemplate() {
    this.cdr.detectChanges();
  }

}
