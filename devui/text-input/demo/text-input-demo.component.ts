import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
@Component({
  templateUrl: './text-input-demo.component.html',
})
export class TextInputDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./basic/basic.component.scss?raw') },
  ];

  passwordVisibleSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./password-visible/password-visible.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./password-visible/password-visible.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./password-visible/password-visible.component.scss?raw') },
  ];

  sizeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./size/text-input-size.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./size/text-input-size.component.ts?raw') },
  ];
  navItems = [];
  subs: Subscription = new Subscription();

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.text-input.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.text-input.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'size', value: values.size },
      {
        dAnchorLink: 'password-input',
        value: values['password-input'],
      },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
