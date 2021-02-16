import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-demo-dropdown',
  templateUrl: './dropdown-demo.component.html',
})
export class DropdownDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts') },
  ];
  hoverSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./hover/hover.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./hover/hover.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./hover/hover.component.scss') },
  ];
  manuallySource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./manually/manually.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./manually/manually.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./manually/manually.component.scss') },
  ];
  focusSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./focus/focus.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./focus/focus.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./focus/focus.component.scss') },
  ];
  closeScopeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./close-scope/close-scope.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./close-scope/close-scope.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./close-scope/close-scope.component.scss') },
  ];
  appendToBodySource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./append-to-body/append-to-body.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./append-to-body/append-to-body.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./append-to-body/append-to-body.component.scss') },
  ];
  addIconSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./add-icon/add-icon.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./add-icon/add-icon.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./add-icon/add-icon.component.scss') },
  ];
  multiLevelSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./multi-level/multi-level.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./multi-level/multi-level.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./multi-level/multi-level.component.css') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.dropdown.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.dropdown.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'turn-off-trigger-point-settings', value: values['turn-off-trigger-point-settings'] },
      { dAnchorLink: 'suspension-drop-down', value: values['suspension-drop-down'] },
      { dAnchorLink: 'manually-control', value: values['manually-control'] },
      { dAnchorLink: 'auto-expand-and-auto-focus', value: values['auto-expand-and-auto-focus'] },
      { dAnchorLink: 'when-using-appendtobody', value: values['when-using-appendtobody'] },
      { dAnchorLink: 'add-icon', value: values['add-icon'] },
      { dAnchorLink: 'multi-level-drop-down-menu', value: values['multi-level-drop-down-menu'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
