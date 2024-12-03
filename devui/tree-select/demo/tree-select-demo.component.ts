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
    { title: 'HTML', language: 'xml', code: require('./basic/tree-select-basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/tree-select-basic.component.ts?raw') },
  ];
  TreeSelectLabelizationComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./labelization/labelization.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./labelization/labelization.component.ts?raw') },
  ];
  TreeSelectLeafOnlyComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./leaf-only/tree-select-leaf-only.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./leaf-only/tree-select-leaf-only.component.ts?raw') },
  ];
  TreeSelectHooksComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./hooks/tree-select-hooks.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./hooks/tree-select-hooks.component.ts?raw') },
  ];
  TreeSelectSearchableComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./searchable/tree-select-searchable.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./searchable/tree-select-searchable.component.ts?raw') },
  ];
  TreeSelectAppendToComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./append-to/tree-select-append-to.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./append-to/tree-select-append-to.component.ts?raw') },
  ];
  TreeSelectCustomIconComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./custom-icon/tree-select-custom-icon.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./custom-icon/tree-select-custom-icon.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./custom-icon/tree-select-custom-icon.component.scss?raw') },
  ];
  TreeSelectKeysComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./keys/tree-select-keys.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./keys/tree-select-keys.component.ts?raw') },
  ];
  TreeSelectCustomTemplateComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./custom-template/custom-template.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./custom-template/custom-template.component.ts?raw') },
  ];
  TreeSelectIconParentComponent: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./icon-parent/icon-parent.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./icon-parent/icon-parent.component.ts?raw') },
  ];

  treeSelectDemoVirtualScroll: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./virtual-scroll/tree-select-virtual-scroll.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./virtual-scroll/tree-select-virtual-scroll.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./virtual-scroll/tree-select-virtual-scroll.component.scss?raw') },
  ];
  navItems = [];
  subs: Subscription = new Subscription();

  constructor(private translate: TranslateService) {}

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
      { dAnchorLink: 'labelization', value: values.labelization },
      { dAnchorLink: 'leaf-only', value: values['leaf-only'] },
      { dAnchorLink: 'init-hooks', value: values['init-hooks'] },
      { dAnchorLink: 'simple-search', value: values['simple-search'] },
      { dAnchorLink: 'append-to-element', value: values['append-to-element'] },
      { dAnchorLink: 'custom-icon', value: values['custom-icon'] },
      { dAnchorLink: 'keys', value: values.keys },
      { dAnchorLink: 'custom-template', value: values['custom-template'] },
      { dAnchorLink: 'icon-parent', value: values['icon-parent'] },
      { dAnchorLink: 'virtual-scroll', value: values['virtual-scroll'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
