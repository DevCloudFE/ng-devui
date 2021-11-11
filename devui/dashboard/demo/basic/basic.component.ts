import { Component } from '@angular/core';
import { DashboardWidget } from 'ng-devui/dashboard';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent {
  widgets: Array<DashboardWidget> = [{
    x: 0,
    y: 0,
    width: 3,
    height: 2,
  }, {
    x: 3,
    y: 0,
    width: 3,
    height: 1,
  }, {
    x: 6,
    y: 0,
    width: 3,
    height: 1,
    locked: true
  }, {
    x: 3,
    y: 1,
    width: 2,
    height: 1
  }, {
    x: 5,
    y: 1,
    width: 3,
    height: 2
  }, {
    x: 8,
    y: 1,
    width: 1,
    height: 1,
    noMove: true
  }, {
    x: 9,
    y: 1,
    width: 2,
    height: 1
  }, {
    x: 2,
    y: 2,
    width: 3,
    height: 1
  }, {
    x: 8,
    y: 2,
    width: 3,
    height: 1,
    noResize: true
  }, {
    x: 0,
    y: 3,
    width: 3,
    height: 1,
  }, {
    x: 11,
    y: 0,
    width: 1,
    height: 3,
  }, {
    x: 10,
    y: 100,
    width: 2,
    height: 1,
    autoPosition: true
  }, {
    x: 3,
    y: 3,
    width: 9,
    height: 1,
  }];
  log = console.log;
  addWidget() {
    this.widgets.push({width: 2, height: 1});
  }
  deleteWidget(i) {
    if (i < 0 || i >= this.widgets.length) {return; }
    this.widgets.splice(i, 1);
  }
}
