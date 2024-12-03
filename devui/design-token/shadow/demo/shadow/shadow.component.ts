import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from 'ng-devui/theme';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-shadow',
  templateUrl: './shadow.component.html',
  styleUrls: ['./shadow.component.scss'],
})
export class ShadowComponent implements OnInit, OnDestroy {
  themeService: ThemeService;
  subs: Subscription = new Subscription();
  shadows = [];
  shadowColor = [];
  shadowKey = ['devui-shadow-length'];
  shadowColorKey = ['shadow'];
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
    this.shadows = [];
    this.shadowColor = [];
    const theme = this.themeService.currentTheme;
    for (const key in theme.data) {
      if (Object.prototype.hasOwnProperty.call(theme.data, key)) {
        if (this.shadowKey.some((item) => key.includes(item))) {
          const obj = {
            name: '$' + key,
            value: theme.data[key],
            description: this.i18nText ? this.i18nText.shadows[key] : '',
          };
          this.shadows.push(obj);
        }
        if (this.shadowColorKey.some((item) => key.includes(item)) && theme.data[key].startsWith('rgba')) {
          const obj = {
            name: '$' + key,
            value: theme.data[key],
            description: this.i18nText ? this.i18nText.shadowColor[key] : '',
          };
          this.shadowColor.push(obj);
        }
      }
    }
  };

  setI18n() {
    this.subs.add(
      this.translate.get('components.design-shadow.shadowDemo.instance').subscribe((res) => {
        this.i18nText = res;
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.design-shadow.shadowDemo.instance');
        this.i18nText = values;
      })
    );
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
