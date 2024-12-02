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
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
  ];
  multiSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./multi/multi.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./multi/multi.component.ts?raw') },
  ];
  customizeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./customize/customize.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./customize/customize.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./customize/customize.component.scss?raw') },
  ];
  autoSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./auto/auto.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./auto/auto.component.ts?raw') },
  ];
  dynamicUploadOptionsSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./dynamic-upload-options/dynamic-upload-options.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./dynamic-upload-options/dynamic-upload-options.component.ts?raw') },
  ];
  customizeAreaUploadSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./customize-area-upload/customize-area-upload.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./customize-area-upload/customize-area-upload.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./customize-area-upload/customize-area-upload.component.scss?raw') },
  ];

  UploadDemoSlice: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./slice/upload-slice.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./slice/upload-slice.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./slice/upload-slice.component.scss?raw') },
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
      { dAnchorLink: 'custom', value: values.custom },
      { dAnchorLink: 'dynamic-upload-options', value: values['dynamic-upload-options'] },
      { dAnchorLink: 'customize-area-upload', value: values['customize-area-upload'] },
      { dAnchorLink: 'upload-slice', value: values['upload-slice'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
