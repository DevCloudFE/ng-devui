import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './text-demo.component.html',
})
export class TextDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./basic/basic.component.css?raw') },
  ];
  resizeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./resize/resize.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./resize/resize.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./resize/resize.component.css?raw') },
  ];
  countSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./count/count.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./count/count.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./count/count.component.scss?raw') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.textarea.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.textarea.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'resize', value: values['resize'] },
      { dAnchorLink: 'count', value: values['count'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
