import {Component} from '@angular/core';

@Component({
  selector: 'd-tree-select-demo',
  templateUrl: './tree-select-demo.component.html',
})

export class TreeSelectDemoComponent {
  TreeSelectBasicComponent = [
    {title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/tree-select-basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/tree-select-basic.component.ts')},
  ];
  TreeSelectLeafOnlyComponent = [
    {title: 'HTML', language: 'xml', code: require('!!raw-loader!./leaf-only/tree-select-leaf-only.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./leaf-only/tree-select-leaf-only.component.ts')},
  ];
  TreeSelectHooksComponent = [
    {title: 'HTML', language: 'xml', code: require('!!raw-loader!./hooks/tree-select-hooks.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./hooks/tree-select-hooks.component.ts')},
  ];
  TreeSelectSearchableComponent = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./searchable/tree-select-searchable.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./searchable/tree-select-searchable.component.ts')},
  ];
  TreeSelectAppendToComponent = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./append-to/tree-select-append-to.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./append-to/tree-select-append-to.component.ts')},
  ];
  TreeSelectCustomIconComponent = [
    {title: 'HTML', language: 'xml', code: require('!!raw-loader!./custom-icon/tree-select-custom-icon.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./custom-icon/tree-select-custom-icon.component.ts')},
    {title: 'CSS', language: 'css', code: require('!!raw-loader!./custom-icon/tree-select-custom-icon.component.css')}
  ];

  demoDocViewerMain;

  navitems = [
    {dAnchorLink:'tree-select-basic', value:"基本用法"},
    {dAnchorLink:'tree-select-leaf-only', value:"仅叶节点可选"},
    {dAnchorLink:'tree-select-hooks', value:"初始化完成时调用的钩子"},
    {dAnchorLink:'tree-select-searchable', value:"可简易搜索树"},
    {dAnchorLink:'tree-select-append-to', value:"Append To Element 能力"},
    {dAnchorLink:'tree-select-custom-icon', value:"自定义icon能力"}
  ]
  
  constructor() {
    this.demoDocViewerMain = document.querySelector('.doc-viewer-container .main');
  }
}
