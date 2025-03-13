import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'd-image-preview-demo',
    templateUrl: './image-preview-demo.component.html',
    standalone: false
})
export class DImagePreviewDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
  ];
  customOpen: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./custom-open/custom-open.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./custom-open/custom-open.component.ts?raw') },
  ];
  zIndexSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./z-index/z-index.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./z-index/z-index.component.ts?raw') }
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.ImagePreview.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.ImagePreview.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'custom-usage', value: values['custom-usage'] },
      { dAnchorLink: 'z-index-usage', value: values['z-index-usage'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
