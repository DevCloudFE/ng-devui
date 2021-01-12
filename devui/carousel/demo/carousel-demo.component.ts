import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-demo-carousel',
  templateUrl: './carousel-demo.component.html',
})
export class CarouselDemoComponent implements OnInit, OnDestroy {
  CarouselBasicComponent = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./basic/carousel-demo-basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/carousel-demo-basic.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./demo-common.scss') },
  ];
  CarouselTriggerComponent = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./trigger/carousel-demo-trigger.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./trigger/carousel-demo-trigger.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./demo-common.scss') },
  ];
  CarouselAutoplayComponent = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./autoplay/carousel-demo-autoplay.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./autoplay/carousel-demo-autoplay.component.ts') },
  ];
  CarouselCustomComponent = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./custom/carousel-demo-custom.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./custom/carousel-demo-custom.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./demo-common.scss') },
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
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
