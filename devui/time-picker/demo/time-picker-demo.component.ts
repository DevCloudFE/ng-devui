import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox/devui-source-data';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './time-picker-demo.component.html',
})
export class TimePickerDemoComponent implements OnInit, OnDestroy {
  TimePickerDemoBasicComponent: DevuiSourceData[] = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts') },
    { title: 'SASS', language: 'css', code: require('!!raw-loader!./basic/basic.component.scss') },
  ];
  TimePickerDemoFormatComponent: DevuiSourceData[] = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./format/format.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./format/format.component.ts') },
    { title: 'SASS', language: 'css', code: require('!!raw-loader!./format/format.component.scss') },
  ];
  TimePickerDemoCustomComponent: DevuiSourceData[] = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./custom/custom.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./custom/custom.component.ts') },
    { title: 'SASS', language: 'css', code: require('!!raw-loader!./custom/custom.component.scss') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.time-picker.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.time-picker.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'format', value: values['format'] },
      { dAnchorLink: 'custom', value: values['custom'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
