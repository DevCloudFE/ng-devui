import { Directive, EventEmitter, Output } from '@angular/core';

@Directive({
    selector: '[dDashboardLibraryPanel]',
    standalone: false
})
export class DashboardLibraryPanelDirective {
  @Output() widgetDragStart = new EventEmitter();
  @Output() widgetDragStop = new EventEmitter();
  dragStartHandler() {
    this.widgetDragStart.emit();
  }
  dragStopHandler() {
    this.widgetDragStop.emit();
  }
}
