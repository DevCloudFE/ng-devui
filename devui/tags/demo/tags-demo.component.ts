import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox/devui-source-data';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'd-demo-tags',
  templateUrl: './tags-demo.component.html',
})
export class TagsDemoComponent implements OnDestroy, OnInit {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
  ];

  customSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./custom/custom.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./custom/custom.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./custom/custom.component.scss?raw') },
  ];

  hideSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./hide/hide.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./hide/hide.component.ts?raw') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.tags.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.tags.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'single-tag', value: values['single-tag'] },
      { dAnchorLink: 'tags-group', value: values['tags-group'] },
      { dAnchorLink: 'hide-tags', value: values['hide-tags'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
