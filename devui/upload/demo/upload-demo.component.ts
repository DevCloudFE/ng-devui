import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-upload-demo',
  templateUrl: './upload-demo.component.html',
})
export class UploadDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts') },
  ];
  multiSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./multi/multi.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./multi/multi.component.ts') },
  ];
  customizeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./customize/customize.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./customize/customize.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./customize/customize.component.scss') },
  ];
  autoSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./auto/auto.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./auto/auto.component.ts') },
  ];
  dynamicUploadOptionsSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./dynamic-upload-options/dynamic-upload-options.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./dynamic-upload-options/dynamic-upload-options.component.ts') },
  ];
  customizeAreaUploadSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./customize-area-upload/customize-area-upload.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./customize-area-upload/customize-area-upload.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./customize-area-upload/customize-area-upload.component.scss') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.upload.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.upload.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'multi-files', value: values['multi-files'] },
      { dAnchorLink: 'auto-upload', value: values['auto-upload'] },
      { dAnchorLink: 'custom', value: values['custom'] },
      { dAnchorLink: 'dynamic-upload-options', value: values['dynamic-upload-options'] },
      { dAnchorLink: 'customize-area-upload', value: values['customize-area-upload'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
