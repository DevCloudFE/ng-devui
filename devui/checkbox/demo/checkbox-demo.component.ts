import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: './checkbox-demo.component.html',
    standalone: false
})
export class CheckBoxDemoComponent implements OnInit, OnDestroy {
  checkboxDemoBasic: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/checkbox-basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/checkbox-basic.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./basic/checkbox-basic.component.css?raw') },
  ];

  checkboxDemoGroup: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./group/checkbox-group-basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./group/checkbox-group-basic.component.ts?raw') },
  ];

  conditionChangeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./condition-change/condition-change.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./condition-change/condition-change.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./condition-change/condition-change.component.scss?raw') },
  ];

  conditionGroupSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./condition-group/condition-group.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./condition-group/condition-group.component.ts?raw') },
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
