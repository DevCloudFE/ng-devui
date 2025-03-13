import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox/devui-source-data';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'd-demo-carousel',
    templateUrl: './carousel-demo.component.html',
    standalone: false
})
export class CarouselDemoComponent implements OnInit, OnDestroy {
  withTransitionProgressSourceData: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./with-transition-progress/with-transition-progress.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./with-transition-progress/with-transition-progress.component.ts?raw') },
  ];

  CarouselBasicComponent = [
    { title: 'HTML', language: 'html', code: require('./basic/carousel-demo-basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/carousel-demo-basic.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./demo-common.scss?raw') },
  ];
  CarouselTriggerComponent = [
    { title: 'HTML', language: 'html', code: require('./trigger/carousel-demo-trigger.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./trigger/carousel-demo-trigger.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./demo-common.scss?raw') },
  ];
  CarouselAutoplayComponent = [
    { title: 'HTML', language: 'html', code: require('./autoplay/carousel-demo-autoplay.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./autoplay/carousel-demo-autoplay.component.ts?raw') },
  ];
  CarouselCustomComponent = [
    { title: 'HTML', language: 'html', code: require('./custom/carousel-demo-custom.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./custom/carousel-demo-custom.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./demo-common.scss?raw') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.carousel.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.carousel.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'trigger-usage', value: values['trigger-usage'] },
      { dAnchorLink: 'autoplay-usage', value: values['autoplay-usage'] },
      { dAnchorLink: 'custom-usage', value: values['custom-usage'] },
      { dAnchorLink: 'with-transition-progress-usage', value: values['with-transition-progress-usage'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
