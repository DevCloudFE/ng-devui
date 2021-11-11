import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-slider-demo',
  templateUrl: './slider-demo.component.html',
})
export class SliderDemoComponent implements OnInit, OnDestroy {
  SliderBasicComponent = [
    { title: 'HTML', language: 'html', code: require('./basic/slider-basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/slider-basic.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./basic/slider-basic.component.scss?raw') },
  ];
  SliderDisabledComponent = [
    { title: 'HTML', language: 'html', code: require('./disabled/slider-disabled.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./disabled/slider-disabled.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./disabled/slider-disabled.component.scss?raw') },
  ];
  SliderCustomFormatterComponent = [
    { title: 'HTML', language: 'html', code: require('./custom-formatter/slider-custom-formatter.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./custom-formatter/slider-custom-formatter.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./custom-formatter/slider-custom-formatter.component.scss?raw') },
  ];
  list = ['基本用法', '禁止输入态', '定制Popover的显示内容'];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.slider.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.slider.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'slider-disabled', value: values['slider-disabled'] },
      { dAnchorLink: 'slider-custom', value: values['slider-custom'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
