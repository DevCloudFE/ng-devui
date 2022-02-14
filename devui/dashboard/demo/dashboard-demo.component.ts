import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox/devui-source-data';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-dashboard-demo',
  templateUrl: './dashboard-demo.component.html'
})
export class DashboardDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw')},
    {title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw')},
    {title: 'SCSS', language: 'css', code: require('./basic/basic.component.scss?raw')}
  ];
  moreConfigSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code: require('./more-config/more-config.component.html?raw')},
    {title: 'TS', language: 'typescript', code: require('./more-config/more-config.component.ts?raw')},
    {title: 'SCSS', language: 'css', code: require('./more-config/more-config.component.scss?raw')}
  ];
  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.dashboard.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.dashboard.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'more-config', value: values['more-config'] }
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
