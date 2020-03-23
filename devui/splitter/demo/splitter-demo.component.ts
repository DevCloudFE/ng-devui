import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-demo-splitter',
  templateUrl: './splitter-demo.component.html',
})
export class SplitterDemoComponent implements OnInit {

  SplitterBasicComponent = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./basic/splitter-demo-basic.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/splitter-demo-basic.component.ts')},
  ];

  SplitterVerticalComponent = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./vertical/splitter-demo-vertical.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./vertical/splitter-demo-vertical.component.ts')},
  ];

  SplitterMultiComponent = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./multi/splitter-demo-multi.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./multi/splitter-demo-multi.component.ts')},
  ];

  SplitterDirectionComponent = [
    {title: 'HTML', language: 'html', code: require('!!raw-loader!./direction/splitter-demo-direction.component.html')},
    {title: 'TS', language: 'typescript', code: require('!!raw-loader!./direction/splitter-demo-direction.component.ts')},
  ];

  ngOnInit() {
  }
}
