import {Component} from '@angular/core';

@Component({
  selector: 'd-tree-select-demo',
  templateUrl: './tree-select-demo.component.html',
})

export class TreeSelectDemoComponent {
  TreeSelectDemoBasicComponent = [
    {title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/tree-select-demo-basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/tree-select-demo-basic.component.ts')},
  ];
  TreeSelectDemoLeafOnlyComponent = [
    {title: 'HTML', language: 'xml', code: require('!!raw-loader!./leaf-only/tree-select-demo-leaf-only.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./leaf-only/tree-select-demo-leaf-only.component.ts')},
  ];
  TreeSelectDemoHooksComponent = [
    {title: 'HTML', language: 'xml', code: require('!!raw-loader!./hooks/tree-select-demo-hooks.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./hooks/tree-select-demo-hooks.component.ts')},
  ];
  TreeSelectDemoSearchableComponent = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./searchable/tree-select-demo-searchable.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./searchable/tree-select-demo-searchable.component.ts')},
  ];
  TreeSelectDemoAppendToComponent = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./append-to/tree-select-demo-append-to.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./append-to/tree-select-demo-append-to.component.ts')},
  ];
  TreeSelectDemoCustomIconComponent = [
    {title: 'HTML', language: 'xml', code: require('!!raw-loader!./custom-icon/tree-select-demo-custom-icon.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./custom-icon/tree-select-demo-custom-icon.component.ts')},
    {title: 'CSS', language: 'css', code: require('!!raw-loader!./custom-icon/tree-select-demo-custom-icon.component.css')}
  ];
}
