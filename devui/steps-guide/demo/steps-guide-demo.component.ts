import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './steps-guide-demo.component.html',
})
export class StepsGuideDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
    { title: 'DATA', language: 'typescript', code: require('./fakeData.ts?raw') },
  ];

  positionSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./position/position.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./position/position.component.ts?raw') },
    { title: 'DATA', language: 'typescript', code: require('./fakeData.ts?raw') },
  ];

  customSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./custom/custom.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./custom/custom.component.ts?raw') },
    { title: 'DATA', language: 'typescript', code: require('./fakeData.ts?raw') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.steps-guide.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.steps-guide.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'position', value: values.position },
      { dAnchorLink: 'custom', value: values.custom },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
