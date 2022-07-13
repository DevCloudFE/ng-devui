import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-common-demo',
  templateUrl: './common-demo.component.html',
})
export class CommonDemoComponent implements OnInit, OnDestroy {
  pipeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('./pipe/pipe.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./pipe/pipe.component.ts?raw') },
  ];

  helperBrowserSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('./helper-browser/helper-browser.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./helper-browser/helper-browser.component.ts?raw') },
  ];

  helperJumpSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('./helper-jump/helper-jump.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./helper-jump/helper-jump.component.ts?raw') },
  ];

  helperDownloadSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('./helper-download/helper-download.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./helper-download/helper-download.component.ts?raw') },
  ];

  iframePropagateSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('./iframe-propagate/iframe-propagate.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./iframe-propagate/iframe-propagate.component.ts?raw') },
  ];

  lazyLoadSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('./lazy-load/lazy-load.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./lazy-load/lazy-load.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./lazy-load/lazy-load.component.scss?raw') },
  ];

  clipboardSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('./clipboard/clipboard.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./clipboard/clipboard.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./clipboard/clipboard.component.scss?raw') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.common.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.common.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'date-pipe', value: values['date-pipe'] },
      { dAnchorLink: 'browser-version', value: values['browser-version'] },
      { dAnchorLink: 'open-url', value: values['open-url'] },
      { dAnchorLink: 'download-file', value: values['download-file'] },
      { dAnchorLink: 'iframe-propagate', value: values['iframe-propagate'] },
      { dAnchorLink: 'clipboard', value: values['clipboard'] },
      { dAnchorLink: 'lazy-load', value: values['lazy-load'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
