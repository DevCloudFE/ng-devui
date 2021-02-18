import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-datepicker-demo',
  templateUrl: './datepicker-demo.component.html',
})
export class DatepickerDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./basic/basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./basic/basic.component.scss') },
  ];
  setModeSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./set-mode/set-mode.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./set-mode/set-mode.component.ts')},
    {title: 'SCSS', language: 'css', code: require('!!raw-loader!./set-mode/set-mode.component.scss')},
  ];
  minMaxSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./min-max/min-max.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./min-max/min-max.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./min-max/min-max.component.scss') },
  ];
  appendToBodySource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./append-to-body/append-to-body.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./append-to-body/append-to-body.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./append-to-body/append-to-body.component.scss') },
  ];
  rangeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./range/datepicker-range.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./range/datepicker-range.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./range/datepicker-range.component.scss') },
  ];
  formatSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./format/datepicker-format.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./format/datepicker-format.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./format/datepicker-format.component.scss') },
  ];
  rangePickerSource = [
    {
      title: 'HTML',
      language: 'html',
      code: require('!!raw-loader!./range-picker-basic/date-range-picker-basic.component.html'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('!!raw-loader!./range-picker-basic/date-range-picker-basic.component.ts'),
    },
    {
      title: 'SCSS',
      language: 'css',
      code: require('!!raw-loader!./range-picker-basic/date-range-picker-basic.component.scss'),
    },
  ];
  rangePickerFormat = [
    {
      title: 'HTML',
      language: 'html',
      code: require('!!raw-loader!./range-picker-format/date-range-picker-format.component.html'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('!!raw-loader!./range-picker-format/date-range-picker-format.component.ts'),
    },
    {
      title: 'SCSS',
      language: 'css',
      code: require('!!raw-loader!./range-picker-format/date-range-picker-format.component.scss'),
    },
  ];
  rangePickerDisabled = [
    {
      title: 'HTML',
      language: 'html',
      code: require('!!raw-loader!./range-picker-disabled/date-range-picker-disabled.component.html'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('!!raw-loader!./range-picker-disabled/date-range-picker-disabled.component.ts'),
    },
    {
      title: 'SCSS',
      language: 'css',
      code: require('!!raw-loader!./range-picker-disabled/date-range-picker-disabled.component.scss'),
    },
  ];
  rangePickerRestricted = [
    {
      title: 'HTML',
      language: 'html',
      code: require('!!raw-loader!./range-picker-restricted-range/date-range-picker-restricted-range.component.html'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('!!raw-loader!./range-picker-restricted-range/date-range-picker-restricted-range.component.ts'),
    },
    {
      title: 'SCSS',
      language: 'css',
      code: require('!!raw-loader!./range-picker-restricted-range/date-range-picker-restricted-range.component.scss'),
    },
  ];
  rangePickerTime = [
    {
      title: 'HTML',
      language: 'html',
      code: require('!!raw-loader!./range-picker-time/date-range-picker-time.component.html'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('!!raw-loader!./range-picker-time/date-range-picker-time.component.ts'),
    },
    {
      title: 'SCSS',
      language: 'css',
      code: require('!!raw-loader!./range-picker-time/date-range-picker-time.component.scss'),
    },
  ];
  rangeClearButtonSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./range-clear-button/range-clear-button.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./range-clear-button/range-clear-button.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./range-clear-button/range-clear-button.component.scss') },
  ];
  rangeTodaySource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./range-today/range-today.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./range-today/range-today.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./range-today/range-today.component.scss') },
  ];
  customViewTemplateSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./custom-view-template/custom-view-template.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./custom-view-template/custom-view-template.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./custom-view-template/custom-view-template.component.scss') },
  ];
  clearButtonSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./clear-button/clear-button.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./clear-button/clear-button.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./clear-button/clear-button.component.scss') },
  ];
  buttonSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./button/button.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./button/button.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./button/button.component.css') },
  ];
  twoDatepickerBasic = [
    {
      title: 'HTML',
      language: 'html',
      code: require('!!raw-loader!./two-datepicker-basic/two-datepicker-basic.component.html'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('!!raw-loader!./two-datepicker-basic/two-datepicker-basic.component.ts'),
    },
    {
      title: 'SCSS',
      language: 'css',
      code: require('!!raw-loader!./two-datepicker-basic/two-datepicker-basic.component.scss'),
    },
  ];
  twoDatepickerFormat = [
    {
      title: 'HTML',
      language: 'html',
      code: require('!!raw-loader!./two-datepicker-format/two-datepicker-format.component.html'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('!!raw-loader!./two-datepicker-format/two-datepicker-format.component.ts'),
    },
    {
      title: 'SCSS',
      language: 'css',
      code: require('!!raw-loader!./two-datepicker-format/two-datepicker-format.component.scss'),
    },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.datepicker.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.datepicker.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'datepicker-default', value: values['datepicker-default'] },
      { dAnchorLink: 'datepicker-set-mode', value: values['datepicker-set-mode'] },
      { dAnchorLink: 'datepicker-min-max', value: values['datepicker-min-max'] },
      { dAnchorLink: 'datepicker-append-to-body', value: values['datepicker-append-to-body'] },
      { dAnchorLink: 'datepicker-range', value: values['datepicker-range'] },
      { dAnchorLink: 'datepicker-range-basic', value: values['datepicker-range-basic'] },
      { dAnchorLink: 'datepicker-range-format', value: values['datepicker-range-format'] },
      { dAnchorLink: 'datepicker-range-disabled', value: values['datepicker-range-disabled'] },
      { dAnchorLink: 'datepicker-range-restricted-range', value: values['datepicker-range-restricted-range'] },
      { dAnchorLink: 'datepicker-range-time', value: values['datepicker-range-time'] },
      { dAnchorLink: 'datepicker-clear-button', value: values['datepicker-clear-button'] },
      { dAnchorLink: 'datepicker-range-today', value: values['datepicker-range-today'] },
      { dAnchorLink: 'datepicker-format', value: values['datepicker-format'] },
      { dAnchorLink: 'custom-view-template', value: values['custom-view-template'] },
      { dAnchorLink: 'date-picker-clear-button', value: values['date-picker-clear-button'] },
      { dAnchorLink: 'date-picker-button', value: values['date-picker-button'] },
      { dAnchorLink: 'two-date-picker-basic', value: values['two-date-picker-basic'] },
      { dAnchorLink: 'two-date-picker-format', value: values['two-date-picker-format'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
