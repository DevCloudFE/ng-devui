import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'd-alert-demo',
  templateUrl: './alert-demo.component.html',
})
export class AlertDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
  ];
  closeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./close/close.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./close/close.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./close/close.component.css?raw') },
  ];
  withoutIconSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./withoutIcon/withoutIcon.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./withoutIcon/withoutIcon.component.ts?raw') },
  ];
  carouselSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./carousel/carousel.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./carousel/carousel.component.ts?raw') },
  ];
  navItems = [];
  subs: Subscription = new Subscription();

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.alert.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.alert.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'tips-to-close', value: values['tips-to-close'] },
      { dAnchorLink: 'without-icon', value: values['without-icon'] },
      { dAnchorLink: 'carousel', value: values.carousel },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
