import { Component } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
  selector: 'd-datepicker-demo',
  templateUrl: './datepicker-demo.component.html',

})
export class DatepickerDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts')},
    {title: 'SCSS', language: 'css', code: require('!!raw-loader!./basic/basic.component.scss')},
  ];
  minMaxSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./min-max/min-max.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./min-max/min-max.component.ts')},
    {title: 'SCSS', language: 'css', code: require('!!raw-loader!./min-max/min-max.component.scss')},
  ];
  appendToBodySource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./append-to-body/append-to-body.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./append-to-body/append-to-body.component.ts')},
    {title: 'SCSS', language: 'css', code: require('!!raw-loader!./append-to-body/append-to-body.component.scss')},
  ];
  rangeSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./range/datepicker-range.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./range/datepicker-range.component.ts')},
    {title: 'SCSS', language: 'css', code: require('!!raw-loader!./range/datepicker-range.component.scss')},
  ];
  formatSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./format/datepicker-format.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./format/datepicker-format.component.ts')},
    {title: 'SCSS', language: 'css', code: require('!!raw-loader!./format/datepicker-format.component.scss')},
  ];
  rangePickerSource = [
    {
      title: 'HTML',
      language: 'html',
      code: require('!!raw-loader!./range-picker-basic/date-range-picker-basic.component.html')
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('!!raw-loader!./range-picker-basic/date-range-picker-basic.component.ts')
    },
    {
      title: 'SCSS',
      language: 'css',
      code: require('!!raw-loader!./range-picker-basic/date-range-picker-basic.component.scss')
    },
  ];
  rangePickerFormat = [
    {
      title: 'HTML',
      language: 'html',
      code: require('!!raw-loader!./range-picker-format/date-range-picker-format.component.html')
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('!!raw-loader!./range-picker-format/date-range-picker-format.component.ts')
    },
    {
      title: 'SCSS',
      language: 'css',
      code: require('!!raw-loader!./range-picker-format/date-range-picker-format.component.scss')
    },
  ];
  rangePickerDisabled = [
    {
      title: 'HTML',
      language: 'html',
      code: require('!!raw-loader!./range-picker-disabled/date-range-picker-disabled.component.html')
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('!!raw-loader!./range-picker-disabled/date-range-picker-disabled.component.ts')
    },
    {
      title: 'SCSS',
      language: 'css',
      code: require('!!raw-loader!./range-picker-disabled/date-range-picker-disabled.component.scss')
    },

  ];
  rangePickerRestricted = [
    {
      title: 'HTML',
      language: 'html',
      code: require('!!raw-loader!./range-picker-restricted-range/date-range-picker-restricted-range.component.html')
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('!!raw-loader!./range-picker-restricted-range/date-range-picker-restricted-range.component.ts')
    },
    {
      title: 'SCSS',
      language: 'css',
      code: require('!!raw-loader!./range-picker-restricted-range/date-range-picker-restricted-range.component.scss')
    },

  ];
  rangePickerTime = [
    {
      title: 'HTML',
      language: 'html',
      code: require('!!raw-loader!./range-picker-time/date-range-picker-time.component.html')
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('!!raw-loader!./range-picker-time/date-range-picker-time.component.ts')
    },
    {
      title: 'SCSS',
      language: 'css',
      code: require('!!raw-loader!./range-picker-time/date-range-picker-time.component.scss')
    },
  ];
  rangeClearButtonSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./range-clear-button/range-clear-button.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./range-clear-button/range-clear-button.component.ts')},
    {title: 'SCSS', language: 'css', code: require('!!raw-loader!./range-clear-button/range-clear-button.component.scss')},
  ];
  rangeTodaySource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./range-today/range-today.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./range-today/range-today.component.ts')},
    {title: 'SCSS', language: 'css', code: require('!!raw-loader!./range-today/range-today.component.scss')},
  ];
  customViewTemplateSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./custom-view-template/custom-view-template.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./custom-view-template/custom-view-template.component.ts')},
    {title: 'SCSS', language: 'css', code: require('!!raw-loader!./custom-view-template/custom-view-template.component.scss')},
  ];
  clearButtonSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./clear-button/clear-button.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./clear-button/clear-button.component.ts')},
    {title: 'SCSS', language: 'css', code: require('!!raw-loader!./clear-button/clear-button.component.scss')},
  ];
  buttonSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./button/button.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./button/button.component.ts')},
    {title: 'SCSS', language: 'css', code: require('!!raw-loader!./button/button.component.css')},
  ];
  twoDatepickerBasic = [
    {
      title: 'HTML',
      language: 'html',
      code: require('!!raw-loader!./two-datepicker-basic/two-datepicker-basic.component.html')
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('!!raw-loader!./two-datepicker-basic/two-datepicker-basic.component.ts')
    },
    {
      title: 'SCSS',
      language: 'css',
      code: require('!!raw-loader!./two-datepicker-basic/two-datepicker-basic.component.scss')
    },
  ];
  twoDatepickerFormat = [
    {
      title: 'HTML',
      language: 'html',
      code: require('!!raw-loader!./two-datepicker-format/two-datepicker-format.component.html')
    },
    {
      title: 'TS',
      language: 'typescript',
      code: require('!!raw-loader!./two-datepicker-format/two-datepicker-format.component.ts')
    },
    {
      title: 'SCSS',
      language: 'css',
      code: require('!!raw-loader!./two-datepicker-format/two-datepicker-format.component.scss')
    },
  ];
  navItems = [
    { dAnchorLink: 'datepicker-default', value: '基本用法'},
    { dAnchorLink: 'datepicker-min-max', value: '限制最大最小日期'},
    { dAnchorLink: 'datepicker-append-to-body', value: '附着在body上'},
    { dAnchorLink: 'datepicker-range', value: '范围日期选择器'},
    { dAnchorLink: 'datepicker-range-basic', value: '日期范围选择器 集成模式'},
    { dAnchorLink: 'datepicker-range-format', value: '日期范围选择器 格式化'},
    { dAnchorLink: 'datepicker-range-disabled', value: '日期范围选择器 禁止输入态'},
    { dAnchorLink: 'datepicker-range-restricted-range', value: '日期范围选择器 可选范围'},
    { dAnchorLink: 'datepicker-range-time', value: '日期范围选择器 选择时间'},
    { dAnchorLink: 'datepicker-clear-button', value: '日期范围选择器 自定义操作区、清除'},
    { dAnchorLink: 'datepicker-range-today', value: '日期范围选择器 自定义操作选择日期'},
    { dAnchorLink: 'datepicker-format', value: '格式化'},
    { dAnchorLink: 'custom-view-template', value: '自定义操作区'},
    { dAnchorLink: 'date-picker-clear-button', value: '自定义清除按钮'},
    { dAnchorLink: 'date-picker-button', value: '日期选择按钮'},
    { dAnchorLink: 'two-date-picker-basic', value: '双日期选择器'},
    { dAnchorLink: 'two-date-picker-format', value: '双日期选择器 格式化'}
  ];
}
