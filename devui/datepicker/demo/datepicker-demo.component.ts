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
    {title: 'CSS', language: 'css', code: require('!!raw-loader!./basic/basic.component.css')},
  ];
  rangeSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./range/datepicker-range.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./range/datepicker-range.component.ts')},
    {title: 'CSS', language: 'css', code: require('!!raw-loader!./range/datepicker-range.component.css')},
  ];
  formatSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./format/datepicker-format.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./format/datepicker-format.component.ts')},
    {title: 'CSS', language: 'css', code: require('!!raw-loader!./format/datepicker-format.component.css')},
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
    {title: 'CSS', language: 'css', code: require('!!raw-loader!./range-clear-button/range-clear-button.component.css')},
  ];
  rangeTodaySource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./range-today/range-today.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./range-today/range-today.component.ts')},
    {title: 'CSS', language: 'css', code: require('!!raw-loader!./range-today/range-today.component.css')},
  ];
  customViewTemplateSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./custom-view-template/custom-view-template.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./custom-view-template/custom-view-template.component.ts')},
    {title: 'CSS', language: 'css', code: require('!!raw-loader!./custom-view-template/custom-view-template.component.css')},
  ];
  clearButtonSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./clear-button/clear-button.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./clear-button/clear-button.component.ts')},
    {title: 'CSS', language: 'css', code: require('!!raw-loader!./clear-button/clear-button.component.css')},
  ];
  buttonSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./button/button.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./button/button.component.ts')},
    {title: 'CSS', language: 'css', code: require('!!raw-loader!./button/button.component.css')},
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
}
