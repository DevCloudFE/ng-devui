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
  i18nText: any;

  constructor(private translate: TranslateService) {
    this.setI18n();
  }

  ngOnInit() {
    if (typeof window !== undefined) {
      this.themeService = (window as any).devuiThemeService;
        this.changeValueInTable();
        if (this.themeService.eventBus) {
          this.themeService.eventBus.add('themeChanged', this.changeValueInTable);
        }
    }
  }

  setI18n() {
    this.subs.add(
      this.translate.get('components.design-z-index.ZIndexDemo.instance').subscribe((res) => {
        this.i18nText = res.zIndex;
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.design-z-index.ZIndexDemo.instance');
        this.i18nText = values.zIndex;
      })
    );
  }
  changeValueInTable = () => {
    this.zIndex = [];
    const theme = this.themeService.currentTheme;
    for (const key in theme.data) {
      if (key.includes('devui-z-index')) {
        const obj = {
          name: '$' + key,
          value: theme.data[key],
          description: this.i18nText ? this.i18nText[key] : '',
        };
        this.zIndex.push(obj);
      }
    }
  };

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
