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
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
    { title: 'drawerContent-html', language: 'xml', code: require('./drawerContent/drawer-content.component.html?raw') },
    { title: 'drawerContent-ts', language: 'typescript', code: require('./drawerContent/drawer-content.component.ts?raw') },
    { title: 'drawerContent-css', language: 'css', code: require('./drawerContent/drawer-content.component.scss?raw') },
  ];

  undestroyableSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./undestroyable/undestroyable.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./undestroyable/undestroyable.component.ts?raw') },
    { title: 'drawerContent-html', language: 'xml', code: require('./drawerContent/drawer-content.component.html?raw') },
    { title: 'drawerContent-ts', language: 'typescript', code: require('./drawerContent/drawer-content.component.ts?raw') },
    { title: 'drawerContent-css', language: 'css', code: require('./drawerContent/drawer-content.component.scss?raw') },
  ];

  templateSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./template/template.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./template/template.component.ts?raw') },
  ];

  resizeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./resize/resize.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./resize/resize.component.ts?raw') },
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
      { dAnchorLink: 'template', value: values.template },
      { dAnchorLink: 'resize', value: values.resize },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
