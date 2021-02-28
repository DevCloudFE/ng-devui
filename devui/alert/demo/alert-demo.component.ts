import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
@Component({
    selector: 'd-alert-demo',
    templateUrl: './alert-demo.component.html'
})
export class AlertDemoComponent implements OnInit, OnDestroy {
  basicSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./basic/basic.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./basic/basic.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./basic/basic.component.css')}
  ];

  closeSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./close/close.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./close/close.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./close/close.component.css')}
  ];

  withoutIconSource: Array<DevuiSourceData> = [
    {title: 'HTML', language: 'xml', code:  require('!!raw-loader!./withoutIcon/withoutIcon.component.html')},
    {title: 'TS', language: 'typescript', code:  require('!!raw-loader!./withoutIcon/withoutIcon.component.ts')},
    {title: 'SCSS', language: 'css', code:  require('!!raw-loader!./withoutIcon/withoutIcon.component.css')}
  ];

  navItems = [];
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {

  }

  ngOnInit() {
    this.subs.add(
      this.translate.get('components.alert.anchorLinkValues').subscribe((res) => {
        this.setNavValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.alert.anchorLinkValues');
        this.setNavValues(values);
      })
    );
  }

  setNavValues(values) {
    this.navItems = [
      { dAnchorLink: 'basic-usage', value: values['basic-usage'] },
      { dAnchorLink: 'tips-to-close', value: values['tips-to-close'] },
      { dAnchorLink: 'without-icon', value: values['without-icon'] }
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
