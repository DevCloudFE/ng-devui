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
    { title: 'HTML', language: 'html', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./basic/basic.component.scss?raw') },
  ];
  setModeSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'html', code: require('./set-mode/set-mode.component.html?raw')},
    {title: 'TS', language: 'typescript', code: require('./set-mode/set-mode.component.ts?raw')},
    {title: 'SCSS', language: 'css', code: require('./set-mode/set-mode.component.scss?raw')},
  ];
  minMaxSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('./min-max/min-max.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./min-max/min-max.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./min-max/min-max.component.scss?raw') },
  ];
  appendToBodySource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('./append-to-body/append-to-body.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./append-to-body/append-to-body.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./append-to-body/append-to-body.component.scss?raw') },
  ];
  rangeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('./range/datepicker-range.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./range/datepicker-range.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./range/datepicker-range.component.scss?raw') },
  ];
  formatSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('./format/datepicker-format.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./format/datepicker-format.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./format/datepicker-format.component.scss?raw') },
  ];
  rangePickerSource = [
    {
      title: 'HTML',
      language: 'html',
      code: require('./range-picker-basic/date-range-picker-basic.component.html?raw'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('./range-picker-basic/date-range-picker-basic.component.ts?raw'),
    },
    {
      title: 'SCSS',
      language: 'css',
      code: require('./range-picker-basic/date-range-picker-basic.component.scss?raw'),
    },
  ];
  rangePickerFormat = [
    {
      title: 'HTML',
      language: 'html',
      code: require('./range-picker-format/date-range-picker-format.component.html?raw'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('./range-picker-format/date-range-picker-format.component.ts?raw'),
    },
    {
      title: 'SCSS',
      language: 'css',
      code: require('./range-picker-format/date-range-picker-format.component.scss?raw'),
    },
  ];
  rangePickerDisabled = [
    {
      title: 'HTML',
      language: 'html',
      code: require('./range-picker-disabled/date-range-picker-disabled.component.html?raw'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('./range-picker-disabled/date-range-picker-disabled.component.ts?raw'),
    },
    {
      title: 'SCSS',
      language: 'css',
      code: require('./range-picker-disabled/date-range-picker-disabled.component.scss?raw'),
    },
  ];
  rangePickerRestricted = [
    {
      title: 'HTML',
      language: 'html',
      code: require('./range-picker-restricted-range/date-range-picker-restricted-range.component.html?raw'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('./range-picker-restricted-range/date-range-picker-restricted-range.component.ts?raw'),
    },
    {
      title: 'SCSS',
      language: 'css',
      code: require('./range-picker-restricted-range/date-range-picker-restricted-range.component.scss?raw'),
    },
  ];
  rangePickerTime = [
    {
      title: 'HTML',
      language: 'html',
      code: require('./range-picker-time/date-range-picker-time.component.html?raw'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('./range-picker-time/date-range-picker-time.component.ts?raw'),
    },
    {
      title: 'SCSS',
      language: 'css',
      code: require('./range-picker-time/date-range-picker-time.component.scss?raw'),
    },
  ];
  rangeClearButtonSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('./range-clear-button/range-clear-button.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./range-clear-button/range-clear-button.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./range-clear-button/range-clear-button.component.scss?raw') },
  ];
  rangeTodaySource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('./range-today/range-today.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./range-today/range-today.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./range-today/range-today.component.scss?raw') },
  ];
  customViewTemplateSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('./custom-view-template/custom-view-template.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./custom-view-template/custom-view-template.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./custom-view-template/custom-view-template.component.scss?raw') },
  ];
  clearButtonSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('./clear-button/clear-button.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./clear-button/clear-button.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./clear-button/clear-button.component.scss?raw') },
  ];
  buttonSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('./button/button.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./button/button.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./button/button.component.css?raw') },
  ];
  twoDatepickerBasic = [
    {
      title: 'HTML',
      language: 'html',
      code: require('./two-datepicker-basic/two-datepicker-basic.component.html?raw'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('./two-datepicker-basic/two-datepicker-basic.component.ts?raw'),
    },
    {
      title: 'SCSS',
      language: 'css',
      code: require('./two-datepicker-basic/two-datepicker-basic.component.scss?raw'),
    },
  ];
  twoDatepickerFormat = [
    {
      title: 'HTML',
      language: 'html',
      code: require('./two-datepicker-format/two-datepicker-format.component.html?raw'),
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('./two-datepicker-format/two-datepicker-format.component.ts?raw'),
    },
    {
      title: 'SCSS',
      language: 'css',
      code: require('./two-datepicker-format/two-datepicker-format.component.scss?raw'),
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
