import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-tree-select-demo',
  templateUrl: './tree-select-demo.component.html',
})
export class TreeSelectDemoComponent implements OnInit, OnDestroy {
  TreeSelectBasicComponent = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/tree-select-basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/tree-select-basic.component.ts') },
  ];
  TreeSelectLabelizationComponent = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./labelization/labelization.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./labelization/labelization.component.ts') },
  ];
  TreeSelectLeafOnlyComponent = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./leaf-only/tree-select-leaf-only.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./leaf-only/tree-select-leaf-only.component.ts') },
  ];
  TreeSelectHooksComponent = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./hooks/tree-select-hooks.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./hooks/tree-select-hooks.component.ts') },
  ];
  TreeSelectSearchableComponent = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./searchable/tree-select-searchable.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./searchable/tree-select-searchable.component.ts') },
  ];
  TreeSelectAppendToComponent = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./append-to/tree-select-append-to.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./append-to/tree-select-append-to.component.ts') },
  ];
  TreeSelectCustomIconComponent = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./custom-icon/tree-select-custom-icon.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./custom-icon/tree-select-custom-icon.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./custom-icon/tree-select-custom-icon.component.scss') },
  ];
  TreeSelectKeysComponent = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./keys/tree-select-keys.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./keys/tree-select-keys.component.ts') },
  ];
  TreeSelectIconParentComponent = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./icon-parent/icon-parent.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./icon-parent/icon-parent.component.ts') },
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
      { dAnchorLink: 'labelization', value: values['labelization'] },
      { dAnchorLink: 'leaf-only', value: values['leaf-only'] },
      { dAnchorLink: 'init-hooks', value: values['init-hooks'] },
      { dAnchorLink: 'simple-search', value: values['simple-search'] },
      { dAnchorLink: 'append-to-element', value: values['append-to-element'] },
      { dAnchorLink: 'custom-icon', value: values['custom-icon'] },
      { dAnchorLink: 'keys', value: values['keys'] },
      { dAnchorLink: 'icon-parent', value: values['icon-parent'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
