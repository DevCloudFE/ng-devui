import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-tree-select-demo',
  templateUrl: './tree-select-demo.component.html',
})
export class TreeSelectDemoComponent implements OnInit, OnDestroy {
  TreeSelectBasicComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/tree-select-basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/tree-select-basic.component.ts') },
  ];
  TreeSelectLabelizationComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./labelization/labelization.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./labelization/labelization.component.ts') },
  ];
  TreeSelectLeafOnlyComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./leaf-only/tree-select-leaf-only.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./leaf-only/tree-select-leaf-only.component.ts') },
  ];
  TreeSelectHooksComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./hooks/tree-select-hooks.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./hooks/tree-select-hooks.component.ts') },
  ];
  TreeSelectSearchableComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./searchable/tree-select-searchable.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./searchable/tree-select-searchable.component.ts') },
  ];
  TreeSelectAppendToComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./append-to/tree-select-append-to.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./append-to/tree-select-append-to.component.ts') },
  ];
  TreeSelectCustomIconComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./custom-icon/tree-select-custom-icon.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./custom-icon/tree-select-custom-icon.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./custom-icon/tree-select-custom-icon.component.scss') },
  ];
  TreeSelectKeysComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./keys/tree-select-keys.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./keys/tree-select-keys.component.ts') },
  ];
  TreeSelectCustomTemplateComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./custom-template/custom-template.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./custom-template/custom-template.component.ts') },
  ];
  TreeSelectIconParentComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./icon-parent/icon-parent.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./icon-parent/icon-parent.component.ts') },
  ];

  treeSelectDemoVirtualScroll: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./virtual-scroll/tree-select-virtual-scroll.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./virtual-scroll/tree-select-virtual-scroll.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./virtual-scroll/tree-select-virtual-scroll.component.scss') },
  ];
  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.tree-select.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.tree-select.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'labelization', value: values['labelization'] },
      { dAnchorLink: 'leaf-only', value: values['leaf-only'] },
      { dAnchorLink: 'init-hooks', value: values['init-hooks'] },
      { dAnchorLink: 'simple-search', value: values['simple-search'] },
      { dAnchorLink: 'append-to-element', value: values['append-to-element'] },
      { dAnchorLink: 'custom-icon', value: values['custom-icon'] },
      { dAnchorLink: 'keys', value: values['keys'] },
      { dAnchorLink: 'custom-template', value: values['custom-template'] },
      { dAnchorLink: 'icon-parent', value: values['icon-parent'] },
      { dAnchorLink: 'virtual-scroll', value: values['virtual-scroll'] }
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
