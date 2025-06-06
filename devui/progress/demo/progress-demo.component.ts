import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
@Component({
    selector: 'd-demo-progress',
    templateUrl: './progress-demo.component.html',
    styleUrls: ['./progress-demo.component.scss'],
    standalone: false
})
export class ProgressDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./basic/basic.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./basic/basic.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./basic/basic.component.scss?raw') },
  ];
  circleSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./circle/circle.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./circle/circle.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./circle/circle.component.scss?raw') },
  ];
  multipleSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('./multiple/multiple.component.html?raw') },
    { title: 'TS', language: 'typescript', code: require('./multiple/multiple.component.ts?raw') },
    { title: 'SCSS', language: 'css', code: require('./progress-demo.component.scss?raw') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.progress.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.progress.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'circle-usage', value: values['circle-usage'] },
      { dAnchorLink: 'multiple-usage', value: values['multiple-usage'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
