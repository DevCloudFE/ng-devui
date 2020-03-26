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
  ];
  rangeSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./range/datepicker-range.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./range/datepicker-range.component.ts')},
  ];
  formatSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./format/datepicker-format.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./format/datepicker-format.component.ts')},
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
      title: 'CSS',
      language: 'css',
      code: require('!!raw-loader!./range-picker-basic/date-range-picker-basic.component.css')
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
      title: 'CSS',
      language: 'css',
      code: require('!!raw-loader!./range-picker-disabled/date-range-picker-disabled.component.css')
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
      title: 'CSS',
      language: 'css',
      code: require('!!raw-loader!./range-picker-restricted-range/date-range-picker-restricted-range.component.css')
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
      title: 'CSS',
      language: 'css',
      code: require('!!raw-loader!./range-picker-time/date-range-picker-time.component.css')
    },
  ];
  rangeClearButtonSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./range-clear-button/range-clear-button.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./range-clear-button/range-clear-button.component.ts')},
  ];
  rangeTodaySource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./range-today/range-today.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./range-today/range-today.component.ts')},
  ];
  customViewTemplateSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./custom-view-template/custom-view-template.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./custom-view-template/custom-view-template.component.ts')},
  ];
  clearButtonSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./clear-button/clear-button.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./clear-button/clear-button.component.ts')},
  ];
  buttonSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./button/button.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./button/button.component.ts')},
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
      title: 'CSS',
      language: 'css',
      code: require('!!raw-loader!./two-datepicker-basic/two-datepicker-basic.component.css')
    },
  ];

  demoDocViewerMain;
  navitems = [
    {dAnchorLink:'datepicker-default', value:"基本用法"},
    {dAnchorLink:'datepicker-range', value:"范围日期选择器"},
    {dAnchorLink:'datepicker-range-basic', value:"日期范围选择器 集成模式"},
    {dAnchorLink:'datepicker-range-disabled', value:"日期范围选择器 禁止输入态"},
    {dAnchorLink:'datepicker-range-restricted-range', value:"日期范围选择器 可选范围"},
    {dAnchorLink:'datepicker-range-time', value:"日期范围选择器 选择时间"},
    {dAnchorLink:'datepicker-clear-button', value:"日期范围选择器 自定义操作区、清除"},
    {dAnchorLink:'datepicker-range-today', value:"日期范围选择器 自定义操作选择日期"},
    {dAnchorLink:'datepicker-format', value:"格式化"},
    {dAnchorLink:'custom-view-template', value:"自定义操作区"},
    {dAnchorLink:'date-picker-clear-button', value:"自定义清除按钮"},
    {dAnchorLink:'date-picker-button', value:"日期选择按钮"},
    {dAnchorLink:'two-date-picker-basic', value:"双日期选择器"}
  ]
  constructor() {
    this.demoDocViewerMain = document.querySelector('.doc-viewer-container .main');
  }
}
