import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox/devui-source-data';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
@Component({
    selector: 'd-accordion-demo',
    templateUrl: './accordion-demo.component.html',
    standalone: false
})
export class AccordionDemoComponent implements OnInit, OnDestroy {
  AccordionDemoBasic: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./basic/basic.component.css?raw') },
  ];

  AccordionDemolink: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./link/link.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./link/link.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./link/link.component.css?raw') },
  ];

  AccordionDemoTemplate: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./template/template.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./template/template.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./template/template.component.scss?raw') },
  ];

  AccordionDemoInnerListTemplate: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./inner-list-template/inner-list-template.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./inner-list-template/inner-list-template.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./inner-list-template/inner-list-template.component.css?raw') },
  ];
  AccordionDemoMultiLevel: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./multi-level/multi-level.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./multi-level/multi-level.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./multi-level/multi-level.component.css?raw') },
  ];
  AccordionDemoChangeKey: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./change-key/change-key.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./change-key/change-key.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./change-key/change-key.component.css?raw') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.accordion.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.accordion.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'use-built-in-routing-and-link-types', value: values['use-built-in-routing-and-link-types'] },
      { dAnchorLink: 'using-templates', value: values['using-templates'] },
      { dAnchorLink: 'compound-level-and-auto-expand', value: values['compound-level-and-auto-expand'] },
      { dAnchorLink: 'change-values', value: values['change-values'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
