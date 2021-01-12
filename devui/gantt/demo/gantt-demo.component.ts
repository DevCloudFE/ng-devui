import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'd-gantt-demo',
  templateUrl: './gantt-demo.component.html'
})
export class GanttDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./basic/basic.component.scss')},
    {title: 'data', language: 'typescript', code:  require('!!raw-loader!./mock-data.ts')}
  ];
  inTableSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./table/table.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./table/table.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./table/table.component.scss')},
    {title: 'reset-position-HTML', language: 'typescript',
    code: require('!!raw-loader!./table/reset-position/reset-position.component.html')},
    {title: 'reset-position-TS', language: 'xml',
    code: require('!!raw-loader!./table/reset-position/reset-position.component.ts')},
    {title: 'reset-position-CSS', language: 'typescript',
    code: require('!!raw-loader!./table/reset-position/reset-position.component.scss')},
    {title: 'data', language: 'typescript', code:  require('!!raw-loader!./mock-data.ts')}
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
