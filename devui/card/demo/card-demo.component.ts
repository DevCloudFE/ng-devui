import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'd-card-demo',
    templateUrl: './card-demo.component.html',
    standalone: false
})
export class CardDemoComponent implements OnInit, OnDestroy {
  cardInteractiveSourceData: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./card-interactive/card-interactive.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./card-interactive/card-interactive.component.ts?raw') },
    { title: 'SCSS', language: 'scss', code: require('./card-interactive/card-interactive.component.scss?raw') },
  ];

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
      { dAnchorLink: 'card-interactive-usage', value: values['card-interactive-usage'] },
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
