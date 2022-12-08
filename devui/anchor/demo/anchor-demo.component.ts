import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevUICodeboxModule, DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { DDemoNavModule } from 'devui-commons/src/demo-nav/d-demo-nav.module';
import { TranslateModule, TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AsyncComponent } from './async/async.component';
import { BasicComponent } from './basic/basic.component';
import { HashComponent } from './hash/hash.component';
import { ScrollTargetComponent } from './scroll-target/scroll-target.component';

@Component({
  selector: 'd-anchor-demo',
  standalone: true,
  imports: [
    TranslateModule,
    DDemoNavModule,
    DevUICodeboxModule,
    BasicComponent,
    AsyncComponent,
    HashComponent,
    ScrollTargetComponent
  ],
  templateUrl: './anchor-demo.component.html',
})
export class AnchorDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./basic/basic.component.scss?raw') },
  ];

  asyncSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./async/async.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./async/async.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./async/async.component.scss?raw') },
  ];
  hashSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./hash/hash.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./hash/hash.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./hash/hash.component.scss?raw') },
  ];

  ScrollTargetSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./scroll-target/scroll-target.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./scroll-target/scroll-target.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./scroll-target/scroll-target.component.scss?raw') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.anchor.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.anchor.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'asynchronous-loading', value: values['asynchronous-loading'] },
      { dAnchorLink: 'scroll-target', value: values['scroll-target'] },
      { dAnchorLink: 'support-hash', value: values['support-hash'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
