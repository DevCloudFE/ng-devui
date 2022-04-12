import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from 'ng-devui/theme';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-z-index',
  templateUrl: './z-index.component.html',
})
export class ZIndexComponent implements OnInit, OnDestroy {
  themeService: ThemeService;
  subs: Subscription = new Subscription();
  zIndex = [];

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    if (typeof window !== undefined) {
      this.setI18n();
    }
  }

  setI18n() {
    this.subs.add(
      this.translate.get('components.design-z-index.ZIndexDemo.instance').subscribe((res) => {
        this.setValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.design-z-index.ZIndexDemo.instance');
        this.setValues(values);
      })
    );
  }

  setValues(values) {
    this.zIndex = [
      { name: '$devui-z-index-full-page-overlay', value: '1080', description: values.zIndex['devui-z-index-full-page-overlay'] },
      { name: '$devui-z-index-pop-up', value: '1060', description: values.zIndex['devui-z-index-pop-up'] },
      { name: '$devui-z-index-dropdown', value: '1052', description: values.zIndex['devui-z-index-dropdown'] },
      { name: '$devui-z-index-modal', value: '1050', description: values.zIndex['devui-z-index-modal'] },
      { name: '$devui-z-index-drawer', value: '1040', description: values.zIndex['devui-z-index-drawer'] },
      { name: '$devui-z-index-framework', value: '1000', description: values.zIndex['devui-z-index-framework'] },
    ];
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
