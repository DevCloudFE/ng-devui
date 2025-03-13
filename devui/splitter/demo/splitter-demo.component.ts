import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'd-demo-splitter',
    templateUrl: './splitter-demo.component.html',
    standalone: false
})
export class SplitterDemoComponent implements OnInit, OnDestroy {
  SplitterBasicComponent = [
    { title: 'HTML', language: 'html', code: require('./basic/splitter-demo-basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/splitter-demo-basic.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./splitter-demo.component.scss?raw') },
  ];

  SplitterVerticalComponent = [
    { title: 'HTML', language: 'html', code: require('./vertical/splitter-demo-vertical.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./vertical/splitter-demo-vertical.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./splitter-demo.component.scss?raw') },
  ];

  SplitterMultiComponent = [
    { title: 'HTML', language: 'html', code: require('./multi/splitter-demo-multi.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./multi/splitter-demo-multi.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./splitter-demo.component.scss?raw') },
  ];

  SplitterDirectionComponent = [
    { title: 'HTML', language: 'html', code: require('./direction/splitter-demo-direction.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./direction/splitter-demo-direction.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./splitter-demo.component.scss?raw') },
  ];

  SplitterFoldedMenuComponent = [
    { title: 'HTML', language: 'html', code: require('./shrink/shrink.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./shrink/shrink.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./shrink/shrink.component.scss?raw') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.splitter.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.splitter.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'vertical-layout', value: values['vertical-layout'] },
      { dAnchorLink: 'combine-layout', value: values['combine-layout'] },
      { dAnchorLink: 'certain-unfold-direction', value: values['certain-unfold-direction'] },
      { dAnchorLink: 'shrink-show-menu', value: values['shrink-show-menu'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
