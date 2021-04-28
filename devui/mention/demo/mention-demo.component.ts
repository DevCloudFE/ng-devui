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
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts') },
  ];

  asyncSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./async/async.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./async/async.component.ts') },
  ];

  customSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./custom/custom.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./custom/custom.component.ts') },
  ];

  prefixSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./prefix/prefix.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./prefix/prefix.component.ts') },
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
