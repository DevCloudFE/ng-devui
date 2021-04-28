import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-sprite-demo',
  templateUrl: './nav-sprite-demo.component.html'
})
export class NavSpriteDemoComponent implements OnInit, OnDestroy {

  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./basic/basic.component.scss') },
  ];

  scrollSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./scroll-container/scroll-container.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./scroll-container/scroll-container.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./scroll-container/scroll-container.component.scss') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.nav-sprite.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.nav-sprite.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic', value: values['basic-usage'] },
      { dAnchorLink: 'sprite', value: values['sprite-usage'] },
      { dAnchorLink: 'scroll', value: values['scroll-usage'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
