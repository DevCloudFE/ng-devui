import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'd-read-tip-demo',
    templateUrl: './read-tip-demo.component.html',
    standalone: false
})
export class ReadTipDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./basic/basic.component.scss?raw') },
  ];

  multiSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./multi-readtip/multi-readtip.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./multi-readtip/multi-readtip.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./multi-readtip/multi-readtip.component.scss?raw') },
  ];

  templateSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./readtip-template/readtip-template.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./readtip-template/readtip-template.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./readtip-template/readtip-template.component.scss?raw') },
  ];

  asyncSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./async-readtip/readtip-async.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./async-readtip/readtip-async.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./async-readtip/readtip-async.component.scss?raw') },
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
