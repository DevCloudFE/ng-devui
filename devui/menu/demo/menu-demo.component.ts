import { Component, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox/devui-source-data';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'd-menu-demo',
  templateUrl: './menu-demo.component.html',
})
export class MenuDemoComponent implements OnInit {
  DemoBasic: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
  ];

  DemoOpenClose: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./open-close/open-close.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./open-close/open-close.component.ts?raw') },
  ];

  DemoOpenOne: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./open-one/open-one.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./open-one/open-one.component.ts?raw') },
  ];

  DemoLoop: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./loop/loop.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./loop/loop.component.ts?raw') },
    { title: 'LoopMenu', language: 'typescript', code: require('./loop/loop-menu/loop-menu.component.ts?raw') },
    { title: 'LoopSubMenu', language: 'typescript', code: require('./loop/loop-menu/loop-sub-menu.component.ts?raw') },
  ];

  DemoCustomNode: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./custom-node/custom-node.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./custom-node/custom-node.component.ts?raw') },
  ];

  DemoAutoExpand: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./auto-expand/auto-expand.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./auto-expand/auto-expand.component.ts?raw') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.menu.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.menu.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'open-close', value: values['open-close'] },
      { dAnchorLink: 'open-one', value: values['open-one'] },
      { dAnchorLink: 'loop', value: values.loop },
      { dAnchorLink: 'custom-node', value: values['custom-node'] },
    ];
  }
}
