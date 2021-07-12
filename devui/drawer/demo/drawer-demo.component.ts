import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'd-drawer-demo',
  templateUrl: './drawer-demo.component.html',
})
export class DrawerDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts') },
    { title: 'drawerContent-html', language: 'xml', code: require('!!raw-loader!./drawerContent/drawer-content.component.html') },
    { title: 'drawerContent-ts', language: 'typescript', code: require('!!raw-loader!./drawerContent/drawer-content.component.ts') },
    { title: 'drawerContent-css', language: 'css', code: require('!!raw-loader!./drawerContent/drawer-content.component.scss') },
  ];

  undestroyableSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./undestroyable/undestroyable.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./undestroyable/undestroyable.component.ts') },
    { title: 'drawerContent-html', language: 'xml', code: require('!!raw-loader!./drawerContent/drawer-content.component.html') },
    { title: 'drawerContent-ts', language: 'typescript', code: require('!!raw-loader!./drawerContent/drawer-content.component.ts') },
    { title: 'drawerContent-css', language: 'css', code: require('!!raw-loader!./drawerContent/drawer-content.component.scss') },
  ];

  templateSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./template/template.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./template/template.component.ts') }
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.drawer.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.drawer.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'do-not-destroy-after-closing', value: values['do-not-destroy-after-closing'] },
      { dAnchorLink: 'template', value: values['template'] }
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
