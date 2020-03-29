import { Component } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox/devui-source-data';

@Component({
    templateUrl: './fullscreen-demo.component.html',
    styleUrls: ['../../style/core/_nav.scss']
})
export class FullscreenDemoComponent {
  FullscreenDemoNormal: DevuiSourceData[] = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./normal/normal.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./normal/normal.component.ts')}
  ];
  FullscreenDemoImmersive: DevuiSourceData[] = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./immersive/immersive.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./immersive/immersive.component.ts')}
  ];

  navItems = [
    { dAnchorLink: 'immersive-full-screen', value: "沉浸式全屏"},
    { dAnchorLink: 'general-full-screen', value: "普通全屏"}
  ]
}
