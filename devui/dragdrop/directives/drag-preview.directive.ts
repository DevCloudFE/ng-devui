import { Directive, Input, TemplateRef, ComponentFactoryResolver } from '@angular/core';
import { OverlayContainerRef } from 'ng-devui/overlay-container';
import { DragPreviewComponent } from './drag-preview.component';
import { DragDropService } from '../services/drag-drop.service';

@Directive({
  selector: '[dDraggable][dDragPreview]',
  exportAs: 'dDragPreview'
})

export class DragPreviewDirective {
  @Input('dDragPreview') dragPreviewTemplate: TemplateRef<any>;
  @Input() dragPreviewData;
  @Input() dragPreviewOptions = {
    skipBatchPreview: false
  };
  public previewRef;
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private overlayContainerRef: OverlayContainerRef, private dragDropService: DragDropService) {
  }

  public createPreview() {
    const finalComponentFactoryResolver = this.componentFactoryResolver;

    const previewRef = this.overlayContainerRef.createComponent(
      finalComponentFactoryResolver.resolveComponentFactory(DragPreviewComponent)
    );
    this.previewRef = previewRef;
    this.updateData();
    return this.previewRef;
  }

  public updateData() {
    Object.assign(this.previewRef.instance, {
      templateRef: this.dragPreviewTemplate,
      data: this.dragPreviewData,
      draggedEl: this.dragDropService.draggedEl,
      dragData: this.dragDropService.dragData,
      batchDragData:  this.dragDropService.batchDragData && this.dragDropService.getBatchDragData(),
      dragSyncDOMElements: this.dragDropService.dragSyncGroupDirectives && this.getDragSyncDOMElements()
    });
    this.previewRef.instance.updateTemplate();
  }

  public destroyPreview() {
    if (this.previewRef) {
      this.previewRef.hostView.destroy();
    }
  }

  public getPreviewElement() {
    return this.previewRef && this.previewRef.instance.element;
  }
  private getDragSyncDOMElements() {
    return this.dragDropService.dragSyncGroupDirectives.map(dir => dir.el.nativeElement);
  }
}
