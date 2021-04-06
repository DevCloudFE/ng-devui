import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-read-tip-demo',
  templateUrl: './read-tip-demo.component.html'
})
export class ReadTipDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./basic/basic.component.scss') },
  ];

  multiSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./multi-readtip/multi-readtip.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./multi-readtip/multi-readtip.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./multi-readtip/multi-readtip.component.scss') },
  ];

  templateSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./readtip-template/readtip-template.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./readtip-template/readtip-template.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./readtip-template/readtip-template.component.scss') },
  ];

  asyncSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./async-readtip/readtip-async.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./async-readtip/readtip-async.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./async-readtip/readtip-async.component.scss') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.read-tip.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.read-tip.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic', value: values['basic-usage'] },
      { dAnchorLink: 'multi-readtip', value: values['multi-usage'] },
      { dAnchorLink: 'readtip-template', value: values['template-usage'] },
      { dAnchorLink: 'readtip-async', value: values['async-usage'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
