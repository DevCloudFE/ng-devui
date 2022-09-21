import { Component, OnDestroy, OnInit } from '@angular/core';
import { devuiLightTheme, ThemeService } from 'ng-devui/theme';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { cloneDeep } from 'lodash-es';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-border-radius',
  templateUrl: './border-radius.component.html',
})
export class BorderRadiusComponent implements OnInit, OnDestroy {
  themeService: ThemeService;
  subs: Subscription = new Subscription();
  borderRadius = [];

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    if (typeof window !== undefined) {
      this.themeService = window['devuiThemeService'];
      if (this.themeService.eventBus) {
        this.themeService.eventBus.add('themeChanged', this.changeValueInTable);
      }
      this.setI18n();
    }
  }

  changeValueInTable = () => {
    const theme = this.themeService.currentTheme;
    this.borderRadius.map((obj) => {
      const nameArr = obj.name.split('$');
      if (nameArr.length === 2) {
        const match = theme.data[nameArr[1]];
        if (match) {
          obj.themeValue = match;
        } else {
          obj.themeValue = obj.value;
        }
      }
    });
    this.borderRadius = cloneDeep(this.borderRadius);
  };

  setI18n() {
    this.subs.add(
      this.translate.get('components.design-border-radius.cornerDemo.instance').subscribe((res) => {
        this.setValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.design-border-radius.cornerDemo.instance');
        this.setValues(values);
      })
    );
  }

  setValues(values) {
    this.borderRadius = [
      {
        name: '$devui-border-radius',
        value: devuiLightTheme.data['devui-border-radius'],
        description: values.borderRadius['devui-border-radius']
      },
      {
        name: '$devui-border-radius-feedback',
        value: devuiLightTheme.data['devui-border-radius-feedback'],
        description: values.borderRadius['devui-border-radius-feedback']
      },
      {
        name: '$devui-border-radius-card',
        value: devuiLightTheme.data['devui-border-radius-card'],
        description: values.borderRadius['devui-border-radius-card']
      },
    ];

    if (this.themeService) {
      this.changeValueInTable();
    }
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
