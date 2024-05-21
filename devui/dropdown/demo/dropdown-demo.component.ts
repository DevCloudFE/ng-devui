import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-demo-dropdown',
  templateUrl: './dropdown-demo.component.html',
  styles: [
    `
      :host ::ng-deep .icon-chevron-down-2 {
        font-size: 14px !important;
        vertical-align: middle;
      }
    `,
  ],
})
export class DropdownDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
  ];
  hoverSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./hover/hover.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./hover/hover.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./hover/hover.component.scss?raw') },
  ];
  manuallySource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./manually/manually.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./manually/manually.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./manually/manually.component.scss?raw') },
  ];
  focusSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./focus/focus.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./focus/focus.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./focus/focus.component.scss?raw') },
  ];
  closeScopeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./close-scope/close-scope.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./close-scope/close-scope.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./close-scope/close-scope.component.scss?raw') },
  ];
  appendToBodySource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./append-to-body/append-to-body.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./append-to-body/append-to-body.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./append-to-body/append-to-body.component.scss?raw') },
  ];
  addIconSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./add-icon/add-icon.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./add-icon/add-icon.component.ts?raw') },
  ];
  multiLevelSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./multi-level/multi-level.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./multi-level/multi-level.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./multi-level/multi-level.component.scss?raw') },
  ];

  dropdownDemoSetIsOpen: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./set-is-open/dropdown-set-is-open.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./set-is-open/dropdown-set-is-open.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./set-is-open/dropdown-set-is-open.component.scss?raw') },
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
      { dAnchorLink: 'dropdown-set-is-open', value: values['dropdown-set-is-open'] },
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
