import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox/devui-source-data';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './fullscreen-demo.component.html',
})
export class FullscreenDemoComponent implements OnInit, OnDestroy {
  FullscreenDemoNormal: DevuiSourceData[] = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./normal/normal.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./normal/normal.component.ts') },
  ];
  FullscreenDemoImmersive: DevuiSourceData[] = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./immersive/immersive.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./immersive/immersive.component.ts') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.fullscreen.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.fullscreen.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'immersive-full-screen', value: values['immersive-full-screen'] },
      { dAnchorLink: 'general-full-screen', value: values['general-full-screen'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
