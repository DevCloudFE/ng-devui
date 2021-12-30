import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-animations-demo',
  templateUrl: './animations-demo.component.html'
})
export class AnimationsDemoComponent implements OnInit, OnDestroy {
  collapseSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./collapse/collapse.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./collapse/collapse.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./collapse/collapse.component.scss?raw') }
  ];
  fadeInOutSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./fade-in-out/fade-in-out.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./fade-in-out/fade-in-out.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./fade-in-out/fade-in-out.component.scss?raw') }
  ];
  wipeInOutSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./wipe-in-out/wipe-in-out.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./wipe-in-out/wipe-in-out.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./wipe-in-out/wipe-in-out.component.scss?raw') }
  ];
  flyInOutSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./fly-in-out/fly-in-out.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./fly-in-out/fly-in-out.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./fly-in-out/fly-in-out.component.scss?raw') }
  ];

  animationIconSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'html', code: require('./animation-icon/animation-icon.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./animation-icon/animation-icon.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./animation-icon/animation-icon.component.scss?raw') },
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
