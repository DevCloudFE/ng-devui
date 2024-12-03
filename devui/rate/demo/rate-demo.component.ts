import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-demo-rate',
  templateUrl: './rate-demo.component.html',
  styleUrls: ['./rate-demo.component.css'],
})
export class RateDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
  ];

  onlyreadSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./onlyread/onlyread.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./onlyread/onlyread.component.ts?raw') },
  ];

  customizeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./customize/customize.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./customize/customize.component.ts?raw') },
  ];
  TypeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./type/type.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./type/type.component.ts?raw') },
  ];

  halfSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./half/rate-half.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./half/rate-half.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./half/rate-half.component.scss?raw') },
  ];

  clearSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./clear/rate-clear.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./clear/rate-clear.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./clear/rate-clear.component.scss?raw') },
  ];

  TemplateSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./template/template.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./template/template.component.ts?raw') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.rate.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.rate.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'read-only-mode', value: values['read-only-mode'] },
      { dAnchorLink: 'dynamic-mode', value: values['dynamic-mode'] },
      { dAnchorLink: 'dynamic-mode-Custom', value: values['dynamic-mode-Custom'] },
      { dAnchorLink: 'half-demo', value: values['half-demo'] },
      { dAnchorLink: 'clear-demo', value: values['clear-demo'] },
      { dAnchorLink: 'using-the-type-parameter', value: values['using-the-type-parameter'] },
      { dAnchorLink: 'template', value: values.template },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
