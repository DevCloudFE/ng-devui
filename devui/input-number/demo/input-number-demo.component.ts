import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'd-demo-input-number',
  templateUrl: './input-number-demo.component.html',
})
export class InputNumberDemoComponent implements OnInit, OnDestroy {
  InputNumberBasic: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/input-number-basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/input-number-basic.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./basic/input-number-basic.component.css?raw') },
  ];

  InputNumberDisabled: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./disabled/input-number-disabled.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./disabled/input-number-disabled.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./disabled/input-number-disabled.component.css?raw') },
  ];

  InputNumberEmpty: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./empty/input-number-empty.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./empty/input-number-empty.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./empty/input-number-empty.component.css?raw') },
  ];

  InputNumberPlaceholderAndMaxLengthComponent: Array<DevuiSourceData> = [
    {
      title: 'HTML',
      language: 'xml',
      code: require('./placeholderAndMaxLength/input-number-placeholder-maxLength.component.html?raw'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('./placeholderAndMaxLength/input-number-placeholder-maxLength.component.ts?raw'),
    },
    {
      title: 'SCSS',
      language: 'css',
      code: require('./placeholderAndMaxLength/input-number-placeholder-maxLength.component.css?raw'),
    },
  ];

  InputNumberReg: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./reg/input-number-reg.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./reg/input-number-reg.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./reg/input-number-reg.component.css?raw') },
  ];

  DecimalLimit: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./decimalLimit/decimal-limit.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./decimalLimit/decimal-limit.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./decimalLimit/decimal-limit.component.css?raw') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.input-number.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.input-number.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'number-basic', value: values['number-basic'] },
      { dAnchorLink: 'number-disabled', value: values['number-disabled'] },
      { dAnchorLink: 'number-empty', value: values['number-empty'] },
      { dAnchorLink: 'number-placeholder-maxlength', value: values['number-placeholder-maxlength'] },
      { dAnchorLink: 'number-reg', value: values['number-reg'] },
      { dAnchorLink: 'decimal-limit', value: values['decimal-limit'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
