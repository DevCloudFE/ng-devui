import {  Component, ElementRef, ChangeDetectorRef, Input, AfterViewInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { DragDropService } from '../services/drag-drop.service';

@Component({
  selector: 'd-drag-preview-clone-dom-ref',
  template: ''
})

export class DragPreviewCloneDomRefComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() domRef: HTMLElement;
  @Input() copyStyle = true;
  cloneNode;
  constructor(private el: ElementRef, private cdr: ChangeDetectorRef, private dragDropService: DragDropService) {
  }
  ngAfterViewInit() {
    if (!this.cloneNode) {
      this.createView();
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['domRef']) {
      if (this.cloneNode) {
        this.destroyView();
        this.createView();
      } else {
        this.createView();
      }
    }
  }
  ngOnDestroy() {
    if (this.cloneNode) {
      this.destroyView();
    }

  }

  createView() {
    if (this.domRef) {
      this.cloneNode = this.domRef.cloneNode(true);
      if (this.copyStyle) {
        this.dragDropService.copyStyle(this.domRef, this.cloneNode);
      }
      this.el.nativeElement.appendChild(this.cloneNode);
    }
  }
  destroyView() {
    if (this.cloneNode) {
      if ( this.el.nativeElement.contains(this.cloneNode)) {
        this.el.nativeElement.removeChild(this.cloneNode);
      }
      this.cloneNode = undefined;
    }
  }
  public updateTemplate() {
    this.cdr.detectChanges();
  }

}
