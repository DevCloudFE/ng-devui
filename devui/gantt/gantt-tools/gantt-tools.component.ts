import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GanttScaleUnit, UnitRole } from '../gantt.model';

@Component({
  selector: 'd-gantt-tools',
  templateUrl: './gantt-tools.component.html',
  styleUrls: ['./gantt-tools.component.scss'],
})
export class GanttToolsComponent {

  @Input() currentUnit: GanttScaleUnit;

  @Input() isFullScreen = false;

  @Output() goToday = new EventEmitter();

  @Output() reduceUnit = new EventEmitter();

  @Output() increaseUnit = new EventEmitter();

  @Output() switchView = new EventEmitter();

  unitRole = UnitRole;

  views = [
    {
      label: 'day',
      value: 'day'
    },
    {
      label: 'week',
      value: 'week'
    },
    {
      label: 'month',
      value: 'month'
    }
  ];

  avtionHandle (type) {
    switch (type) {
      case 'today':
        this.goToday.emit();
        break;
      case 'reduce':
        this.reduceUnit.emit();
        break;
      case 'increase':
        this.increaseUnit.emit();
        break;
    }
  }

  selectView (menu) {
    this.currentUnit = menu.value;
    this.switchView.emit(this.currentUnit);
  }
}
