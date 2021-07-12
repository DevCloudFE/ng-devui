import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UnitRole } from '../gantt.model';

@Component({
  selector: 'd-gantt-tools',
  templateUrl: './gantt-tools.component.html',
  styleUrls: ['./gantt-tools.component.scss'],
})
export class GanttToolsComponent {

  @Input('currentUnit') set currentUnit(val) {
    this._currentUnit = val;
    const data = this.views.filter(i => i.value === val);
    this.currentUnitLabel = data.length > 0 ? data[0].label : '';
  }

  get currentUnit () {
    return this._currentUnit;
  }

  @Input() isFullScreen = false;

  @Output() goToday = new EventEmitter();

  @Output() reduceUnit = new EventEmitter();

  @Output() increaseUnit = new EventEmitter();

  @Output() switchView = new EventEmitter();

  unitRole = UnitRole;

  currentUnitLabel = '';

  _currentUnit = '';

  views = [
    {
      label: 'Day',
      value: 'day'
    },
    {
      label: 'Week',
      value: 'week'
    },
    {
      label: 'Month',
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
    this.switchView.emit(menu.value);
  }
}
