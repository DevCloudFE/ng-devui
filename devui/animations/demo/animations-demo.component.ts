import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-animations-demo',
  templateUrl: './animations-demo.component.html'
})
export class AnimationsDemoComponent implements OnInit, OnDestroy {
  collapseSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./collapse/collapse.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./collapse/collapse.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./collapse/collapse.component.scss') }
  ];
  fadeInOutSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./fade-in-out/fade-in-out.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./fade-in-out/fade-in-out.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./fade-in-out/fade-in-out.component.scss') }
  ];
  wipeInOutSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./wipe-in-out/wipe-in-out.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./wipe-in-out/wipe-in-out.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./wipe-in-out/wipe-in-out.component.scss') }
  ];
  flyInOutSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./fly-in-out/fly-in-out.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./fly-in-out/fly-in-out.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./fly-in-out/fly-in-out.component.scss') }
  ];

  animationIconSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./animation-icon/animation-icon.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./animation-icon/animation-icon.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./animation-icon/animation-icon.component.scss') },
  ];
  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.animations.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.animations.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'expand-collapse', value: values['expand-collapse'] },
      { dAnchorLink: 'fade-in-out', value: values['fade-in-out'] },
      { dAnchorLink: 'wipe-in-out', value: values['wipe-in-out'] },
      { dAnchorLink: 'fly-in-out', value: values['fly-in-out'] },
      { dAnchorLink: 'icon-class', value: values['icon-class']}
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

}
