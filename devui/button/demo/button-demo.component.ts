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
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./common/common.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./common/common.component.ts') },
  ];

  iconSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./icon/icon.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./icon/icon.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./icon/icon.component.scss') },
  ];

  loadingSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./loading/loading.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./loading/loading.component.ts') },
  ];

  primarySource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./primary/primary.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./primary/primary.component.ts') },
  ];

  leftRightSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./left-right/left-right.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./left-right/left-right.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./left-right/left-right.component.scss') },
  ];

  textSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./text/text.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./text/text.component.ts') },
  ];

  dangerSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./danger/danger.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./danger/danger.component.ts') },
  ];

  combinationSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./combination/combination.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./combination/combination.component.ts') },
  ];

  autofocusSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./autofocus/autofocus.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./autofocus/autofocus.component.ts') },
  ];

  sizeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./size/size.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./size/size.component.ts') },
  ];

  groupsSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./groups/groups.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./groups/groups.component.ts') },
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
      { dAnchorLink: 'button-left-right', value: values['button-left-right'] },
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
