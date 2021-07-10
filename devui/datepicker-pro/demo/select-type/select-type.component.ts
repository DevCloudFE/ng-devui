import { Component } from '@angular/core';

const ONE_HOUR_TIME = 60 * 60 * 1000;
const ONE_DAY_TIME = ONE_HOUR_TIME * 24;
const ONE_WEEK_TIME = ONE_DAY_TIME * 7;
@Component({
  selector: 'd-demo-select-datepicker',
  templateUrl: './select-type.component.html',
  styleUrls: ['./select-type.component.scss'],
})
export class SelectDatepickerDemoComponent {
  value2 = [new Date('2021-4-5'), new Date('2021-4-8')];

  activeType = 'start';

  showPanel = false;

  options = [{
    id: 1,
    name: '最近1h',
    value: [new Date(new Date().getTime() - ONE_HOUR_TIME), new Date()]
  }, {
    id: 2,
    name: '最近一天',
    value: [new Date(new Date().getTime() - ONE_DAY_TIME), new Date()]
  }, {
    id: 3,
    name: '最近一周',
    value: [new Date(new Date().getTime() - ONE_WEEK_TIME), new Date()]
  }, {
    id: 4,
    name: '自定义范围',
    value: []
  }];
  currentOption = {};

  onChange(value) {
    if (value.id === 4) {
      this.showPanel = true;
    }
  }

  ensureDate() {
    this.showPanel = false;
    this.options[3].name = this.options[3].value.map(d => d.toLocaleDateString()).join(' - ');
    this.options = [...this.options];
  }

  switchType() {
    this.activeType = this.activeType === 'start' ? 'end' : 'start';
  }
}
