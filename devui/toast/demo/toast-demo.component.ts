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
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts') },
  ];
  lifeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./life/life.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./life/life.component.ts') },
  ];
  styleSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./style/style.component.html') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./style/style.component.scss') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./style/style.component.ts') },
  ];
  singleSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./single/single.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./single/single.component.ts') },
  ];

  ToastDemoService: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./service/toast-service.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./service/toast-service.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./service/toast-service.component.scss') },
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
      { dAnchorLink: 'life', value: values['life'] },
      { dAnchorLink: 'style', value: values['style'] },
      { dAnchorLink: 'single', value: values['single'] },
      { dAnchorLink: 'toast-service', value: values['toast-service']},
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
