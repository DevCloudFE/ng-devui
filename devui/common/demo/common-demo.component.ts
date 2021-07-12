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
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./lazy-load/lazy-load.component.scss') },
  ];

  clipboardSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./clipboard/clipboard.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./clipboard/clipboard.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./clipboard/clipboard.component.scss') },
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
