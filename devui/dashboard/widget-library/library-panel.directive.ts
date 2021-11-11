import { Directive, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[dDashboardLibraryPanel]',
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
