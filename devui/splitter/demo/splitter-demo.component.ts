import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-demo-splitter',
  templateUrl: './splitter-demo.component.html',
})
export class SplitterDemoComponent implements OnInit, OnDestroy {
  SplitterBasicComponent = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./basic/splitter-demo-basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/splitter-demo-basic.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./splitter-demo.component.scss') },
  ];

  SplitterVerticalComponent = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./vertical/splitter-demo-vertical.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./vertical/splitter-demo-vertical.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./splitter-demo.component.scss') },
  ];

  SplitterMultiComponent = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./multi/splitter-demo-multi.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./multi/splitter-demo-multi.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./splitter-demo.component.scss') },
  ];

  SplitterDirectionComponent = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./direction/splitter-demo-direction.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./direction/splitter-demo-direction.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./splitter-demo.component.scss') },
  ];

  SplitterFoldedMenuComponent = [
    { title: 'HTML', language: 'html', code: require('!!raw-loader!./shrink/shrink.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./shrink/shrink.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./shrink/shrink.component.scss') },
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
