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
    { title: 'HTML', language: 'xml', code: require('./all-states/time-axis-all-states.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./all-states/time-axis-all-states.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./all-states/time-axis-all-states.component.scss?raw') },
  ];
  directionSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./direction/time-axis-direction.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./direction/time-axis-direction.component.ts?raw') },
  ];
  htmlSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./html-content/time-axis-html-content.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./html-content/time-axis-html-content.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./html-content/time-axis-html-content.component.scss?raw') },
  ];
  templateSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./template-content/time-axis-template-content.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./template-content/time-axis-template-content.component.ts?raw') },
  ];
  alternativeModeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./alternative-mode/alternative-mode.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./alternative-mode/alternative-mode.component.ts?raw') },
  ];
  seperateWaySource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./seperate-way/seperate-way.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./seperate-way/seperate-way.component.ts?raw') },
  ];
  customDotSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./custom-dot/custom-dot.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./custom-dot/custom-dot.component.ts?raw') },
  ];
  singleSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./single/single.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./single/single.component.ts?raw') },
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
      { dAnchorLink: 'direction', value: values.direction },
      { dAnchorLink: 'single', value: values.single },
      { dAnchorLink: 'custom-dot', value: values['custom-dot'] },
      { dAnchorLink: 'content-with-template', value: values['content-with-template'] },
      { dAnchorLink: 'content-with-html', value: values['content-with-html'] },
      { dAnchorLink: 'content-with-alternative-mode', value: values['content-with-alternative-mode'] },
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'seperate-way', value: values['seperate-way'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
