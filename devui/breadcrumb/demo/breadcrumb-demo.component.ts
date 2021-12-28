import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-demo-breadcrumb',
  templateUrl: './breadcrumb-demo.component.html',
})
export class BreadCrumbDemoComponent implements OnInit, OnDestroy {
  BasicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
  ];

  SourceConfigSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./source-config/source-config.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./source-config/source-config.component.ts?raw') },
  ];

  CustomSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./custom/custom.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./custom/custom.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./custom/custom.component.scss?raw') },
  ];

  MenuSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./menu/menu.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./menu/menu.component.ts?raw') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.breadcrumb.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.breadcrumb.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-breadcrumbs', value: values['basic-breadcrumbs'] },
      { dAnchorLink: 'source-config-breadcrumbs', value: values['source-config-breadcrumbs'] },
      { dAnchorLink: 'drop-down-breadcrumbs', value: values['drop-down-breadcrumbs'] },
      { dAnchorLink: 'self-defined-breadcrumbs', value: values['self-defined-breadcrumbs'] }
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
