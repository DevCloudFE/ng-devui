import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-demo-time-axis',
  templateUrl: './time-axis-demo.html',
})
export class TimeAxisDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./all-states/time-axis-all-states.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./all-states/time-axis-all-states.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./all-states/time-axis-all-states.component.scss') }
  ];
  directionSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./direction/time-axis-direction.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./direction/time-axis-direction.component.ts') },
  ];
  htmlSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./html-content/time-axis-html-content.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./html-content/time-axis-html-content.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./html-content/time-axis-html-content.component.scss') }
  ];
  templateSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./template-content/time-axis-template-content.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./template-content/time-axis-template-content.component.ts') },
  ];
  alternativeModeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./alternative-mode/alternative-mode.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./alternative-mode/alternative-mode.component.ts') }
  ];
  seperateWaySource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./seperate-way/seperate-way.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./seperate-way/seperate-way.component.ts') }
  ];
  customDotSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./custom-dot/custom-dot.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./custom-dot/custom-dot.component.ts') }
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.time-axis.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.time-axis.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'direction', value: values['direction'] },
      { dAnchorLink: 'custom-dot', value: values['custom-dot'] },
      { dAnchorLink: 'content-with-template', value: values['content-with-template'] },
      { dAnchorLink: 'content-with-html', value: values['content-with-html'] },
      { dAnchorLink: 'content-with-alternative-mode', value: values['content-with-alternative-mode'] },
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'seperate-way', value: values['seperate-way'] }
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
