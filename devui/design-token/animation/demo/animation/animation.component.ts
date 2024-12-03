import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from 'ng-devui/theme';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-animation',
  templateUrl: './animation.component.html',
})
export class AnimationComponent implements OnInit, OnDestroy {
  themeService: ThemeService;
  subs: Subscription = new Subscription();
  animation = [];
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
    this.animation = [];
    const theme = this.themeService.currentTheme;
    for (const key in theme.data) {
      if (key.includes('devui-animation')) {
        const obj = {
          name: '$' + key,
          value: theme.data[key],
          description: this.i18nText ? this.i18nText[key] : '',
        };
        this.animation.push(obj);
      }
    }
  };

  setI18n() {
    this.subs.add(
      this.translate.get('components.design-animation.AnimationDemo.instance').subscribe((res) => {
        this.i18nText = res.animation;
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.design-animation.AnimationDemo.instance');
        this.i18nText = values.animation;
      })
    );
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
