import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'd-auto-complete-demo',
    templateUrl: './auto-complete-demo.component.html',
    styleUrls: [
        './auto-complete-demo.component.scss'
    ],
    standalone: false
})
export class AutoCompleteDemoComponent implements OnInit, OnDestroy {
  AutoCompleteDemoBasic: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/auto-complete-demo-basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/auto-complete-demo-basic.component.ts?raw') },
  ];

  AutoCompleteDemoArray: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./array/auto-complete-demo-array.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./array/auto-complete-demo-array.component.ts?raw') },
  ];

  AutoCompleteDemoCustom: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./custom/auto-complete-demo-custom.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./custom/auto-complete-demo-custom.component.ts?raw') },
  ];

  AutoCompleteDemoDisable: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./disabled/auto-complete-demo-disable.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./disabled/auto-complete-demo-disable.component.ts?raw') },
  ];
  AutoCompleteDemoDropdown: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./dropdown/auto-complete-demo-dropdown.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./dropdown/auto-complete-demo-dropdown.component.ts?raw') },
  ];

  AutoCompleteDemoObject: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./object/auto-complete-demo-object.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./object/auto-complete-demo-object.component.ts?raw') },
  ];

  AutoCompleteDemoLatest: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./latest/auto-complete-demo-latest.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./latest/auto-complete-demo-latest.component.ts?raw') },
  ];

  AutoCompleteDemoLazyLoad: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./lazy-load/auto-complete-demo-lazy-load.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./lazy-load/auto-complete-demo-lazy-load.component.ts?raw') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.auto-complete.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.auto-complete.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'auto-object', value: values['auto-object'] },
      { dAnchorLink: 'auto-custom', value: values['auto-custom'] },
      { dAnchorLink: 'auto-disable', value: values['auto-disable'] },
      { dAnchorLink: 'auto-latest', value: values['auto-latest'] },
      { dAnchorLink: 'auto-lazy-load', value: values['auto-lazy-load'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
