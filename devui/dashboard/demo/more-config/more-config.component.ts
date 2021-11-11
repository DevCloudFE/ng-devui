import { Component } from '@angular/core';
import { DashboardWidget } from 'ng-devui/dashboard';
import { FormLayout } from 'ng-devui/form';

@Component({
  selector: 'd-more-config',
  templateUrl: './more-config.component.html',
  styleUrls: ['./more-config.component.scss'],
})
export class MoreConfigComponent {
  layoutDirection: FormLayout = FormLayout.Horizontal;
  widgets: Array<DashboardWidget> = [{
    x: 0,
    y: 0,
    width: 2,
    height: 1,
    from: 'data'
  }, {
    x: 1,
    y: 1,
    width: 1,
    height: 1,
    from: 'data'
  }, {
    x: 2,
    y: 0,
    width: 2,
    height: 2,
    from: 'data'
  }];
  column = 6;
  cellHeight = '120px';
  margin = 12;
  minRow = 3;
  maxRow = 8;

  static = false;
  float = true;
  animate = true;
  widgetMoveable = true;
  widgetResizable = true;
  showGridBlock = false;
  log = console.log;

  addWidget(widgets, from, dashboard?) {
    dashboard?.batchUpdate(); // 单个单个push的情况下最好打开批量操作
    widgets.forEach(w => {
      const {x, y, width, height, widgetData} = w.node;
      this.widgets.push({x, y, width, height, from, widgetData});
    });
    dashboard?.commit();
  }
  deleteWidget(widgets, dashboard?) {
    dashboard?.batchUpdate(); // 单个单个push的情况下最好打开批量操作
    widgets.forEach(w => {
      const {x, y, width, height} = w.node;
      const index = this.widgets.findIndex(wd => wd.x === x && wd.y === y && wd.width === width && wd.height === height);
      if (index >= 0) {
        this.widgets.splice(index, 1);
      }
    });
    dashboard?.commit();
  }

}
