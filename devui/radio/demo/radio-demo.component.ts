import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'd-demo-radio',
  templateUrl: './radio-demo.component.html',
})
export class RadioDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts') },
  ];

  conditionChangeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./condition-change/condition-change.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./condition-change/condition-change.component.ts') },
  ];

  conditionChangeGroupSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./condition-radio-group/condition-radio-group.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./condition-radio-group/condition-radio-group.component.ts') },
  ];

  disabledSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./disabled/disabled.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./disabled/disabled.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./disabled/disabled.component.css') },
  ];

  horizontalSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./horizontal/horizontal.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./horizontal/horizontal.component.ts') },
  ];

  verticalSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./vertical/vertical.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./vertical/vertical.component.ts') },
  ];

  customSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./custom/custom.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./custom/custom.component.ts') },
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
