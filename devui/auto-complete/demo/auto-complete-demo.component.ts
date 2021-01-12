import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-auto-complete-demo',
  templateUrl: './auto-complete-demo.component.html',
})
export class AutoCompleteDemoComponent implements OnInit, OnDestroy {
  AutoCompleteDemoBasic: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/auto-complete-demo-basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/auto-complete-demo-basic.component.ts') },
  ];

  AutoCompleteDemoArray: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./array/auto-complete-demo-array.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./array/auto-complete-demo-array.component.ts') },
  ];

  AutoCompleteDemoCustom: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./custom/auto-complete-demo-custom.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./custom/auto-complete-demo-custom.component.ts') },
  ];

  AutoCompleteDemoDisable: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./disabled/auto-complete-demo-disable.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./disabled/auto-complete-demo-disable.component.ts') },
  ];
  AutoCompleteDemoDropdown: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./dropdown/auto-complete-demo-dropdown.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./dropdown/auto-complete-demo-dropdown.component.ts') },
  ];

  AutoCompleteDemoObject: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./object/auto-complete-demo-object.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./object/auto-complete-demo-object.component.ts') },
  ];

  AutoCompleteDemoLatest: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./latest/auto-complete-demo-latest.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./latest/auto-complete-demo-latest.component.ts') },
  ];

  AutoCompleteDemoLazyLoad: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./lazy-load/auto-complete-demo-lazy-load.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./lazy-load/auto-complete-demo-lazy-load.component.ts') },
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
