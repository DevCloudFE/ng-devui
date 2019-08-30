import { DevuiSourceData } from '../../shared/devui-codebox/devui-source-data';
import { Component } from '@angular/core';
@Component({
  selector: 'd-accordion-demo',
  templateUrl: './accordion-demo.component.html',
})
export class  AccordionDemoComponent {
  AccordionDemoBasic: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/accordion-demo-basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/accordion-demo-basic.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./basic/accordion-demo-basic.component.css')}
  ];

  AccordionDemolink: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./link/accordion-demo-link.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./link/accordion-demo-link.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./link/accordion-demo-link.component.css')}
  ];

  AccordionDemoTemplate: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./template/accordion-demo-template.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./template/accordion-demo-template.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./template/accordion-demo-template.component.css')}
  ];

  AccordionDemoInnerListTemplate: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml',
    code:  require('!!raw-loader!./inner-list-template/accordion-demo-inner-list-template.component.html')},
    {title: 'TS', language: 'typescript',
    code:  require('!!raw-loader!./inner-list-template/accordion-demo-inner-list-template.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./inner-list-template/accordion-demo-inner-list-template.component.css')}
  ];

  constructor() {
  }
}
