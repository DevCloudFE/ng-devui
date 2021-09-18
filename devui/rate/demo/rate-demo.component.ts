import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-demo-rate',
  templateUrl: './rate-demo.component.html',
  styleUrls: ['./rate-demo.component.css'],
})
export class RateDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./basic/basic.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./basic/basic.component.ts') },
  ];

  onlyreadSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./onlyread/onlyread.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./onlyread/onlyread.component.ts') },
  ];

  customizeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./customize/customize.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./customize/customize.component.ts') },
  ];
  TypeSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./type/type.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./type/type.component.ts') },
  ];

  halfSource: Array<DevuiSourceData> = [
    { title: 'HTML', language: 'xml', code: require('!!raw-loader!./half/rate-half.component.html') },
    { title: 'TS', language: 'typescript', code: require('!!raw-loader!./half/rate-half.component.ts') },
    { title: 'SCSS', language: 'css', code: require('!!raw-loader!./half/rate-half.component.scss') },
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.rate.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.rate.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'read-only-mode', value: values['read-only-mode'] },
      { dAnchorLink: 'dynamic-mode', value: values['dynamic-mode'] },
      { dAnchorLink: 'dynamic-mode-Custom', value: values['dynamic-mode-Custom'] },
      { dAnchorLink: 'half-demo', value: values['half-demo']},
      { dAnchorLink: 'using-the-type-parameter', value: values['using-the-type-parameter'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
