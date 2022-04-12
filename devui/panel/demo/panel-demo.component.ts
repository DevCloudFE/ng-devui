import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-demo-panel',
  templateUrl: './panel-demo.component.html',
})
export class PanelDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'SCSS', language: 'css', code: require('./basic/basic.component.scss?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
  ];

  typeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./type/type.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./type/type.component.ts?raw') },
  ];

  conditionChangeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./condition-change/condition-change.component.html?raw') },
    { title: 'SCSS', language: 'css', code: require('./condition-change/condition-change.component.scss?raw') },
    { title: 'TS', language: 'typescript', code: require('./condition-change/condition-change.component.ts?raw') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.panel.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.panel.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'multiple-types', value: values['multiple-types'] },
      { dAnchorLink: 'condition-change', value: values['condition-change'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
