import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'd-input-group-demo',
  templateUrl: './input-group-demo.component.html',
})
export class InputGroupDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./basic/basic.component.scss?raw') },
  ];
  responsiveSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./responsive/responsive.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./responsive/responsive.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./responsive/responsive.component.scss?raw') },
  ];
  embedSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./embed/embed.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./embed/embed.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./embed/embed.component.scss?raw') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.input-group.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.input-group.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'responsive-usage', value: values['responsive-usage'] },
      { dAnchorLink: 'embed-usage', value: values['embed-usage'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
