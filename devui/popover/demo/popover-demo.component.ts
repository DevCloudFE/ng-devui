import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './popover-demo.component.html',
})
export class PopoverDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./basic/basic.component.css') },
  ];

  positionSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./position/position.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./position/position.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./position/position.component.scss') }
  ];

  manualSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./manual/manual.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./manual/manual.component.ts') },
  ];

  customizeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./customize/customize.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./customize/customize.component.ts') },
  ];

  scrollElementSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./scroll-element/scroll-element.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./scroll-element/scroll-element.component.ts') },
  ];

  hoverDelayTimeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./hover-delay-time/hover-delay-time.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./hover-delay-time/hover-delay-time.component.ts') },
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
      { dAnchorLink: 'position', value: values['position']},
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
