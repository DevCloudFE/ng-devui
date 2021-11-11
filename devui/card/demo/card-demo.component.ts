import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-card-demo',
  templateUrl: './card-demo.component.html',
})
export class CardDemoComponent implements OnInit, OnDestroy {
  CardDemoBasic: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./basic/basic.component.scss?raw') },
  ];
  CardDemoCustom: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./custom/custom.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./custom/custom.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./custom/custom.component.scss?raw') },
  ];
  CardDemoWithMedia: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./with-media/with-media.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./with-media/with-media.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./with-media/with-media.component.scss?raw') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.card.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.card.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'card-basic', value: values['card-basic'] },
      { dAnchorLink: 'card-with-media', value: values['card-with-media'] },
      { dAnchorLink: 'card-custom', value: values['card-custom'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
