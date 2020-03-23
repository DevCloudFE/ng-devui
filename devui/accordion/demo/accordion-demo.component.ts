import { DevuiSourceData } from 'ng-devui/shared/devui-codebox/devui-source-data';
import { Component } from '@angular/core';
@Component({
  selector: 'd-accordion-demo',
  templateUrl: './accordion-demo.component.html',
})
export class  AccordionDemoComponent {
  AccordionDemoBasic: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./basic/basic.component.css')}
  ];

  AccordionDemolink: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./link/link.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./link/link.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./link/link.component.css')}
  ];

  AccordionDemoTemplate: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./template/template.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./template/template.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./template/template.component.css')}
  ];

  AccordionDemoInnerListTemplate: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml',
    code:  require('!!raw-loader!./inner-list-template/inner-list-template.component.html')},
    {title: 'TS', language: 'typescript',
    code:  require('!!raw-loader!./inner-list-template/inner-list-template.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./inner-list-template/inner-list-template.component.css')}
  ];
  AccordionDemoMultiLevel: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml',
    code:  require('!!raw-loader!./multi-level/multi-level.component.html')},
    {title: 'TS', language: 'typescript',
    code:  require('!!raw-loader!./multi-level/multi-level.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./multi-level/multi-level.component.css')}
  ];
  AccordionDemoChangeKey: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml',
    code:  require('!!raw-loader!./change-key/change-key.component.html')},
    {title: 'TS', language: 'typescript',
    code:  require('!!raw-loader!./change-key/change-key.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./change-key/change-key.component.css')}
  ];

}
