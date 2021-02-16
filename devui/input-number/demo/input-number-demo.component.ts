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
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/input-number-basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/input-number-basic.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./basic/input-number-basic.component.css') },
  ];

  InputNumberDisabled: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./disabled/input-number-disabled.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./disabled/input-number-disabled.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./disabled/input-number-disabled.component.css') },
  ];

  InputNumberEmpty: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./empty/input-number-empty.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./empty/input-number-empty.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./empty/input-number-empty.component.css') },
  ];

  InputNumberPlaceholderAndMaxLengthComponent: Array<DevuiSourceData> = [
    {
      title: 'HTML',
      language: 'xml',
      code: require('!!raw-loader!./placeholderAndMaxLength/input-number-placeholder-maxLength.component.html'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('!!raw-loader!./placeholderAndMaxLength/input-number-placeholder-maxLength.component.ts'),
    },
    {
      title: 'SCSS',
      language: 'css',
      code: require('!!raw-loader!./placeholderAndMaxLength/input-number-placeholder-maxLength.component.css'),
    },
  ];

  InputNumberReg: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./reg/input-number-reg.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./reg/input-number-reg.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./reg/input-number-reg.component.css') },
  ];

  DecimalLimitAndAutoFocus: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./decimalLimitAndAutoFocus/decimal-limit-auto-focus.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./decimalLimitAndAutoFocus/decimal-limit-auto-focus.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./decimalLimitAndAutoFocus/decimal-limit-auto-focus.component.css') },
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
      { dAnchorLink: 'decimal-limit-auto-focus', value: values['decimal-limit-auto-focus'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
