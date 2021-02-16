import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox/devui-source-data';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'd-accordion-demo',
  templateUrl: './accordion-demo.component.html',
})
export class AccordionDemoComponent implements OnInit, OnDestroy {
  AccordionDemoBasic: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./basic/basic.component.css') },
  ];

  AccordionDemolink: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./link/link.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./link/link.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./link/link.component.css') },
  ];

  AccordionDemoTemplate: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./template/template.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./template/template.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./template/template.component.scss') },
  ];

  AccordionDemoInnerListTemplate: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./inner-list-template/inner-list-template.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./inner-list-template/inner-list-template.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./inner-list-template/inner-list-template.component.css') },
  ];
  AccordionDemoMultiLevel: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./multi-level/multi-level.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./multi-level/multi-level.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./multi-level/multi-level.component.css') },
  ];
  AccordionDemoChangeKey: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./change-key/change-key.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./change-key/change-key.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./change-key/change-key.component.css') },
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
