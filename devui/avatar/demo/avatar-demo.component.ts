import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'd-avatar-demo',
    templateUrl: './avatar-demo.component.html',
    standalone: false
})
export class AvatarDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./basic/basic.component.css?raw') },
  ];
  specialSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./special/special.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./special/special.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./special/special.component.css?raw') },
  ];
  configSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./config/config.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./config/config.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./config/config.component.css?raw') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.avatar.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.avatar.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-rules', value: values['basic-rules'] },
      { dAnchorLink: 'basic-configuration', value: values['basic-configuration'] },
      { dAnchorLink: 'special-display', value: values['special-display'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
