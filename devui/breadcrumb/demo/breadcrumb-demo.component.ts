import {
    Component, OnInit
  } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';

  @Component({
    selector: 'd-demo-breadcrumb',
    templateUrl: './breadcrumb-demo.component.html',
    styleUrls: ['../../style/core/_nav.scss']
  })

  export class BreadCrumbDemoComponent {
    BasicSource: Array<DevuiSourceData> = [
      {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
      {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')}
    ];

    CustomSource: Array<DevuiSourceData> = [
      {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./custom/custom.component.html')},
      {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./custom/custom.component.ts')},
      {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./custom/custom.component.scss')}
    ];

    MenuSource: Array<DevuiSourceData> = [
      {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./menu/menu.component.html')},
      {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./menu/menu.component.ts')}
    ];

    SearchMenuSource: Array<DevuiSourceData> = [
      {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./search-menu/search-menu.component.html')},
      {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./search-menu/search-menu.component.ts')}
    ];
    
  navitems = [
    {dAnchorLink:'basic-breadcrumbs', value:"基础面包屑"},
    {dAnchorLink:'drop-down-breadcrumbs', value:"可下拉的面包屑"},
    {dAnchorLink:'with-search-drop-down-breadcrumbs', value:"带搜索下拉的面包屑"},
    {dAnchorLink:'self-defined-breadcrumbs', value:"自定义下拉列表和分隔符的面包屑"}
  ]
    constructor() {

    }
  }

