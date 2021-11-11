import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { Subscription } from 'rxjs';
@Component({
  selector: 'd-demo-radio',
  templateUrl: './radio-demo.component.html',
})
export class RadioDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
  ];

  conditionChangeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./condition-change/condition-change.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./condition-change/condition-change.component.ts?raw') },
  ];

  conditionChangeGroupSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./condition-radio-group/condition-radio-group.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./condition-radio-group/condition-radio-group.component.ts?raw') },
  ];

  disabledSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./disabled/disabled.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./disabled/disabled.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./disabled/disabled.component.css?raw') },
  ];

  horizontalSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./horizontal/horizontal.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./horizontal/horizontal.component.ts?raw') },
  ];

  verticalSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./vertical/vertical.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./vertical/vertical.component.ts?raw') },
  ];

  customSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./custom/custom.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./custom/custom.component.ts?raw') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.radio.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.radio.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'condition-change', value: values['condition-change'] },
      { dAnchorLink: 'condition-radio-group', value: values['condition-radio-group'] },
      { dAnchorLink: 'disabled', value: values['disabled'] },
      { dAnchorLink: 'horizontal', value: values['horizontal'] },
      { dAnchorLink: 'vertical', value: values['vertical'] },
      { dAnchorLink: 'custom', value: values['custom'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
