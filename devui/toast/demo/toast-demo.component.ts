import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-demo-toast',
  templateUrl: './toast-demo.component.html',
})
export class ToastDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
  ];
  lifeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./life/life.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./life/life.component.ts?raw') },
  ];
  styleSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./style/style.component.html?raw') },
    { title: 'SCSS', language: 'css', code: require('./style/style.component.scss?raw') },
    { title: 'TS', language: 'typescript', code: require('./style/style.component.ts?raw') },
  ];
  singleSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./single/single.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./single/single.component.ts?raw') },
  ];
  appendSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./append/append.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./append/append.component.ts?raw') },
  ];

  ToastDemoService: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./service/toast-service.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./service/toast-service.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./service/toast-service.component.scss?raw') },
  ];
  navItems = [];
  subs: Subscription = new Subscription();

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.toast.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.toast.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'life', value: values.life },
      { dAnchorLink: 'style', value: values.style },
      { dAnchorLink: 'single', value: values.single },
      { dAnchorLink: 'append', value: values.append },
      { dAnchorLink: 'toast-service', value: values['toast-service'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
