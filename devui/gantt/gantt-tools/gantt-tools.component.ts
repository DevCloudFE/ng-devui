import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { Subscription } from 'rxjs';
import { UnitRole } from '../gantt.model';

@Component({
  selector: 'd-gantt-tools',
  templateUrl: './gantt-tools.component.html',
  styleUrls: ['./gantt-tools.component.scss'],
})
export class GanttToolsComponent implements OnInit {
  @Input('currentUnit') set currentUnit(val) {
    this._currentUnit = val;
    const data = this.views.filter((i) => i.value === val);
  }

  get currentUnit() {
    return this._currentUnit;
  }

  get currentUnitLabel() {
    return this._currentLabel || (this.views.length > 0 ? this.views[0].label : '');
  }

  @Input() isFullScreen = false;
  @Output() goToday = new EventEmitter();
  @Output() reduceUnit = new EventEmitter();
  @Output() increaseUnit = new EventEmitter();
  @Output() switchView = new EventEmitter();

  _currentLabel: string;
  _currentUnit = '';
  unitRole = UnitRole;
  views = [
    {
      label: 'Day',
      value: 'day',
    },
    {
      label: 'Week',
      value: 'week',
    },
    {
      label: 'Month',
      value: 'month',
    },
  ];
  i18nText: I18nInterface['gantt'];
  i18nLocale: I18nInterface['locale'];
  i18nSubscription: Subscription;

  constructor(private i18n: I18nService) {}

  ngOnInit() {
    this.i18nText = this.i18n.getI18nText().gantt;
    this.i18nLocale = this.i18n.getI18nText().locale;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nText = data.gantt;
      this.i18nLocale = data.locale;
      this.views = [
        {
          label: this.i18nText?.day,
          value: 'day',
        },
        {
          label: this.i18nText?.week,
          value: 'week',
        },
        {
          label: this.i18nText?.month,
          value: 'month',
        },
      ];
    });
  }

  avtionHandle(type) {
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
    default:
    }
  }

  selectView(menu) {
    this._currentLabel = menu.label;
    this.switchView.emit(menu.value);
  }
}
