import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-user-guide-demo',
  templateUrl: './user-guide-demo.component.html'
})
export class UserGuideDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('./basic/basic.component.html?raw')},
    {title: 'TS', language: 'typescript', code:  require('./basic/basic.component.ts?raw')},
    {title: 'DATA', language: 'typescript', code: require('./mock-steps.ts?raw')},
    {title: 'SCSS', language: 'css', code:  require('./basic/basic.component.scss?raw')}
  ];

  serviceWaySource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('./service-way/service-way.component.html?raw')},
    {title: 'TS', language: 'typescript', code:  require('./service-way/service-way.component.ts?raw')},
    {title: 'DATA', language: 'typescript', code: require('./mock-steps.ts?raw')},
    {title: 'SCSS', language: 'css', code:  require('./service-way/service-way.component.scss?raw')}
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.user-guide.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.user-guide.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'user-guide-basic', value: values['user-guide-basic']},
      { dAnchorLink: 'user-guide-service-way', value: values['user-guide-service-way']},
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

}
