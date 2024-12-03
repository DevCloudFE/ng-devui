import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './popover-demo.component.html',
})
export class PopoverDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./basic/basic.component.scss?raw') },
  ];

  positionSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./position/position.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./position/position.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./position/position.component.scss?raw') },
  ];

  manualSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./manual/manual.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./manual/manual.component.ts?raw') },
  ];

  customizeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./customize/customize.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./customize/customize.component.ts?raw') },
  ];

  scrollElementSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./scroll-element/scroll-element.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./scroll-element/scroll-element.component.ts?raw') },
  ];

  hoverDelayTimeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./hover-delay-time/hover-delay-time.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./hover-delay-time/hover-delay-time.component.ts?raw') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.popover.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.popover.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'position', value: values.position },
      { dAnchorLink: 'manual-control-display', value: values['manual-control-display'] },
      { dAnchorLink: 'custom-prompt-content', value: values['custom-prompt-content'] },
      { dAnchorLink: 'parent-container-settings', value: values['parent-container-settings'] },
      { dAnchorLink: 'hover-delay-time', value: values['hover-delay-time'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
