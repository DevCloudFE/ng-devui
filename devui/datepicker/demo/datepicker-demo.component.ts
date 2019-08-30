import { Component } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
@Component({
  selector: 'd-datepicker-demo',
  templateUrl: './datepicker-demo.component.html',

})
export class DatepickerDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'html', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')},
  ];
  formatSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'html', code:  require('!!raw-loader!./format/datepicker-demo-format.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./format/datepicker-demo-format.component.ts')},
  ];
}
