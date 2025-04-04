import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'd-design-link-demo',
    templateUrl: './design-link-demo.component.html',
    standalone: false
})
export class DesignLinkDemoComponent implements OnInit, OnDestroy {
  LinkSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./link/link.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./link/link.component.ts?raw') }
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.design-link.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.design-link.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'href-a', value: values['href-a'] }
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

}
