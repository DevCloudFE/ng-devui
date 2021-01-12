import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-demo-time-axis',
  templateUrl: './time-axis-demo.html',
})
export class TimeAxisDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./all-states/time-axis-all-states.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./all-states/time-axis-all-states.component.ts') },
  ];
  htmlSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./html-content/time-axis-html-content.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./html-content/time-axis-html-content.component.ts') },
  ];
  templateSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./template-content/time-axis-template-content.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./template-content/time-axis-template-content.component.ts') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.time-axis.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.time-axis.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'content-with-html', value: values['content-with-html'] },
      { dAnchorLink: 'content-with-template', value: values['content-with-template'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
