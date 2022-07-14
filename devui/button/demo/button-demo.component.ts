import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'd-demo-button',
  templateUrl: './button-demo.component.html',
})
export class ButtonDemoComponent implements OnInit, OnDestroy {
  commonSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./common/common.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./common/common.component.ts?raw') },
  ];

  iconSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./icon/icon.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./icon/icon.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./icon/icon.component.scss?raw') },
  ];

  loadingSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./loading/loading.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./loading/loading.component.ts?raw') },
  ];

  primarySource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./primary/primary.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./primary/primary.component.ts?raw') },
  ];

  textSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./text/text.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./text/text.component.ts?raw') },
  ];

  dangerSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./danger/danger.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./danger/danger.component.ts?raw') },
  ];

  combinationSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./combination/combination.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./combination/combination.component.ts?raw') },
  ];

  autofocusSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./autofocus/autofocus.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./autofocus/autofocus.component.ts?raw') },
  ];

  sizeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./size/size.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./size/size.component.ts?raw') },
  ];

  groupsSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./groups/groups.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./groups/groups.component.ts?raw') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.button.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.button.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'button-primary', value: values['button-primary'] },
      { dAnchorLink: 'button-common', value: values['button-common'] },
      { dAnchorLink: 'button-primary-and-common', value: values['button-primary-and-common'] },
      { dAnchorLink: 'button-danger', value: values['button-danger'] },
      { dAnchorLink: 'button-text', value: values['button-text'] },
      { dAnchorLink: 'button-loading', value: values['button-loading'] },
      { dAnchorLink: 'button-auto-focus', value: values['button-auto-focus'] },
      { dAnchorLink: 'button-icon', value: values['button-icon'] },
      { dAnchorLink: 'button-size', value: values['button-size'] },
      { dAnchorLink: 'button-groups', value: values['button-groups'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
