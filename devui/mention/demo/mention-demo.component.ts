import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mention-demo',
  templateUrl: './mention-demo.component.html'
})
export class MentionDemoComponent implements OnInit, OnDestroy {

  navItems = [];

  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
  ];

  asyncSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./async/async.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./async/async.component.ts?raw') },
  ];

  customSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./custom/custom.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./custom/custom.component.ts?raw') },
  ];

  prefixSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./prefix/prefix.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./prefix/prefix.component.ts?raw') },
  ];

  subs: Subscription = new Subscription();

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.mention.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.mention.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'async-usage', value: values['async-usage'] },
      { dAnchorLink: 'custom-prefix', value: values['custom-prefix'] },
      { dAnchorLink: 'custom-template', value: values['custom-template'] },
    ];
  }

  ngOnDestroy () {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
