import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './toggle-demo.component.html',
})
export class ToggleDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./basic/basic.component.css?raw') },
  ];
  twoBindingSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./two-binding/two-binding.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./two-binding/two-binding.component.ts?raw') },
  ];
  callbackSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./callback/callback.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./callback/callback.component.ts?raw') },
  ];
  customSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./custom/custom.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./custom/custom.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./custom/custom.component.scss?raw') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.toggle.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.toggle.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'two-binding', value: values['two-binding'] },
      { dAnchorLink: 'callback', value: values.callback },
      { dAnchorLink: 'custom', value: values.custom },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
