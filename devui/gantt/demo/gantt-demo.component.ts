import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { Subscription } from 'rxjs';
@Component({
  selector: 'd-gantt-demo',
  templateUrl: './gantt-demo.component.html'
})
export class GanttDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('./basic/basic.component.html?raw')},
    {title: 'TS', language: 'typescript', code:  require('./basic/basic.component.ts?raw')},
    {title: 'SCSS', language: 'css', code:  require('./basic/basic.component.scss?raw')},
    {title: 'data', language: 'typescript', code:  require('./mock-data.ts?raw')}
  ];
  inTableSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('./table/table.component.html?raw')},
    {title: 'TS', language: 'typescript', code:  require('./table/table.component.ts?raw')},
    {title: 'SCSS', language: 'css', code:  require('./table/table.component.scss?raw')},
    {title: 'reset-position-HTML', language: 'typescript',
    code: require('./table/reset-position/reset-position.component.html?raw')},
    {title: 'reset-position-TS', language: 'xml',
    code: require('./table/reset-position/reset-position.component.ts?raw')},
    {title: 'reset-position-CSS', language: 'typescript',
    code: require('./table/reset-position/reset-position.component.scss?raw')},
    {title: 'data', language: 'typescript', code:  require('./mock-data.ts?raw')}
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.gantt.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.gantt.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'gantt-basic', value: values['gantt-basic'] },
      { dAnchorLink: 'gantt-in-datatable', value: values['gantt-in-datatable'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
