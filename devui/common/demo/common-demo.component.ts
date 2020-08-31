import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { Component } from '@angular/core';

@Component({
  selector: 'd-common-demo',
  templateUrl: './common-demo.component.html',
})
export class CommonDemoComponent {
  pipeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./pipe/pipe.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./pipe/pipe.component.ts') },
  ];

  helperJumpSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./helper-jump/helper-jump.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./helper-jump/helper-jump.component.ts') },
  ];

  helperDownloadSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./helper-download/helper-download.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./helper-download/helper-download.component.ts') },
  ];

  iframePropagateSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./iframe-propagate/iframe-propagate.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./iframe-propagate/iframe-propagate.component.ts') },
  ];

  lazyLoadSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./lazy-load/lazy-load.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./lazy-load/lazy-load.component.ts') },
    { title: 'CSS', language: 'css', code: require('!!raw-loader!./lazy-load/lazy-load.component.scss') }
  ];

  relativeTimeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./relative-time/relative-time.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./relative-time/relative-time.component.ts') }
  ];

  navItems = [
    { dAnchorLink: 'date-pipe', value: 'Datepipe API' },
    { dAnchorLink: 'helper-utils', value: 'Helper Utils' },
    { dAnchorLink: 'iframe-propagate', value: 'Iframe Event Propagate API' },
    { dAnchorLink: 'lazy-load', value: '懒加载指令' },
    { dAnchorLink: 'relative-time', value: '人性化时间管道' },
  ];
}
