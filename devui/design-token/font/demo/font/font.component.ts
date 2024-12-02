import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from 'ng-devui/theme';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

export interface fontItemConfig {
  name: string;
  value: string;
  description: string;
}
@Component({
  selector: 'd-font',
  templateUrl: './font.component.html',
  styleUrls: ['./font.component.scss'],
})
export class FontComponent implements OnInit, OnDestroy {
  themeService: ThemeService;
  subs: Subscription = new Subscription();
  fonts = [];
  i18nText: any;
  fontKey = ['devui-font-size', 'devui-font-content-weight', 'devui-line-height'];

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
    this.fonts = [];
    const theme = this.themeService.currentTheme;
    for (const key in theme.data) {
      if (this.fontKey.some((item) => key.includes(item))) {
        const obj = {
          name: '$' + key,
          value: theme.data[key],
          description: this.i18nText ? this.i18nText[key] : '',
        };
        this.fonts.push(obj);
      }
    }
  };

  setI18n() {
    this.subs.add(
      this.translate.get('components.design-font.fontDemo.instance').subscribe((res) => {
        this.i18nText = res.fonts;
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.design-font.fontDemo.instance');
        this.i18nText = values.fonts;
      })
    );
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
