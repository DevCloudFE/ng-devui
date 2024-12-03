import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox/devui-source-data';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  templateUrl: './icon-demo.component.html',
})
export class IconDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
    { title: 'CSS', language: 'css', code: require('./basic/basic.component.scss?raw') },
  ];
  iconGroupSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('./icon-group/icon-group.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./icon-group/icon-group.component.ts?raw') },
    { title: 'CSS', language: 'css', code: require('./icon-group/icon-group.component.scss?raw') },
  ];

  navItems = [{ dAnchorLink: 'basic', value: '基本用法' }];
  subs: Subscription = new Subscription();

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.icon.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.icon.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic', value: values.basic },
      { dAnchorLink: 'icon-group', value: values['icon-group'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
