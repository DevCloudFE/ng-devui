import {
  Component,
  HostBinding
} from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

@Component({
    selector: 'd-demo-search',
    templateUrl: './search-demo.component.html'
})
export class SearchDemoComponent {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./basic/basic.component.css')}
  ];

  ngmodelDemoSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./ngmodel/ngmodel.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./ngmodel/ngmodel.component.ts')},
    {title: 'CSS', language: 'css', code:  require('!!raw-loader!./ngmodel/ngmodel.component.css')}
  ];

  constructor() {

  }
}
