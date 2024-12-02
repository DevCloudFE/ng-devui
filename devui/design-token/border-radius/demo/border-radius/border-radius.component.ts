import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from 'ng-devui/theme';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-border-radius',
  templateUrl: './border-radius.component.html',
})
export class BorderRadiusComponent implements OnInit, OnDestroy {
  themeService: ThemeService;
  subs: Subscription = new Subscription();
  borderRadius = [];
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

  changeValueInTable = () => {
    this.borderRadius = [];
    const theme = this.themeService.currentTheme;
    for (const key in theme.data) {
      if (key.includes('devui-border-radius')) {
        const obj = {
          name: '$' + key,
          value: theme.data[key],
          description: this.i18nText ? this.i18nText[key] : '',
        };
        this.borderRadius.push(obj);
      }
    }
  };

  setI18n() {
    this.subs.add(
      this.translate.get('components.design-border-radius.cornerDemo.instance').subscribe((res) => {
        this.i18nText = res.borderRadius;
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.design-border-radius.cornerDemo.instance');
        this.i18nText = values.borderRadius;
      })
    );
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
