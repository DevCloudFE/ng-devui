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
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts') },
  ];

  SourceConfigSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./source-config/source-config.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./source-config/source-config.component.ts') },
  ];

  CustomSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./custom/custom.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./custom/custom.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./custom/custom.component.scss') },
  ];

  MenuSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./menu/menu.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./menu/menu.component.ts') },
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
