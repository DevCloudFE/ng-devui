import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './checkbox-demo.component.html',
})
export class CheckBoxDemoComponent implements OnInit, OnDestroy {
  checkboxDemoBasic: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/checkbox-basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/checkbox-basic.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./basic/checkbox-basic.component.css') },
  ];

  checkboxDemoGroup: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./group/checkbox-group-basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./group/checkbox-group-basic.component.ts') },
  ];

  conditionChangeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./condition-change/condition-change.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./condition-change/condition-change.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./condition-change/condition-change.component.scss') },
  ];

  conditionGroupSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./condition-group/condition-group.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./condition-group/condition-group.component.ts') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.checkbox.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.checkbox.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'checkbox-basic', value: values['checkbox-basic'] },
      { dAnchorLink: 'tabs-group', value: values['tabs-group'] },
      { dAnchorLink: 'condition-change', value: values['condition-change'] },
      { dAnchorLink: 'condition-group', value: values['condition-group'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
