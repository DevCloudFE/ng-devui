import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox/devui-source-data';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './time-picker-demo.component.html',
})
export class TimePickerDemoComponent implements OnInit, OnDestroy {
  TimePickerDemoBasicComponent: DevuiSourceData[] = [
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
    { title: 'SASS', language: 'css', code: require('./basic/basic.component.scss?raw') },
  ];
  TimePickerDemoFormatComponent: DevuiSourceData[] = [
    { title: 'HTML', language: 'xml', code: require('./format/format.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./format/format.component.ts?raw') },
    { title: 'SASS', language: 'css', code: require('./format/format.component.scss?raw') },
  ];
  TimePickerDemoCustomComponent: DevuiSourceData[] = [
    { title: 'HTML', language: 'xml', code: require('./custom/custom.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./custom/custom.component.ts?raw') },
    { title: 'SASS', language: 'css', code: require('./custom/custom.component.scss?raw') },
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
      { dAnchorLink: 'format', value: values.format },
      { dAnchorLink: 'custom', value: values.custom },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
