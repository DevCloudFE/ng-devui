import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from 'ng-devui/theme';
import { devuiSwatches } from 'ng-devui/theme-collection';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

export interface colorItemConfig {
  name: string;
  value: string;
  type: string;
  description: string;
}

@Component({
  selector: 'd-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
})
export class ColorComponent implements OnInit, OnDestroy {
  themeService: ThemeService;
  subs: Subscription = new Subscription();
  colorTypeList = ['blue', 'sky', 'green', 'lime', 'yellow', 'orange', 'red', 'magenta', 'purple'];
  colorNumberList = ['5', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'];
  // 通用匹配规则为包含shadowColorKey中关键字
  shadowColorKey = ['devui-shadow', 'devui-light-shadow', 'devui-connected-overlay-shadow', 'devui-feedback-overlay-shadow'];
  // 通用匹配规则为包含bg关键字，以及在bgColorKey中的特殊背景色名称
  bgColorKey = ['devui-block', 'devui-area', 'devui-float-block-shadow', 'devui-highlight-overlay', 'devui-primary-disabled'];
  // 通用匹配规则为包含textColorKey中关键字
  textColorKey = ['placeholder', 'link', 'icon', 'text'];
  // 通用匹配规则为包含borderColorKey中关键字
  borderColorKey = ['line'];
  // 通用匹配规则为包含statusColorKey中关键字
  statusColorKey = ['danger', 'warning', 'success', 'waiting', 'info', 'initial', 'unavailable', 'primary', 'contrast', 'default'];
  // 通用匹配规则为包含brandKey中关键字
  brandKey = ['brand'];
  colorList = [];
  dataSource = new Map();
  i18nText;
  swatchesList = {};
  colors = [];
  showFormColor = false;

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
    this.swatchesList = devuiSwatches;
  }

  changeValueInTable = () => {
    this.colorList = [];
    const theme = this.themeService.currentTheme;
    for (const key in theme.data) {
      if (!(theme.data[key].startsWith('#') || theme.data[key].startsWith('rgba'))) {
        continue;
      }
      if (key.includes('bg') || this.bgColorKey.some((item) => key.includes(item))) {
        const obj = {
          name: '$' + key,
          type: 'background',
          value: theme.data[key],
          description: this.i18nText ? this.i18nText[key] : '',
        };
        this.colorList.push(obj);
      } else if (this.shadowColorKey.some((item) => key.includes(item))) {
        const obj = {
          name: key,
          type: 'shadow',
          value: theme.data[key],
          description: this.i18nText ? this.i18nText[key] : '',
        };
        this.colorList.push(obj);
      } else if (this.textColorKey.some((item) => key.includes(item))) {
        const obj = {
          name: key,
          type: 'text',
          value: theme.data[key],
          description: this.i18nText ? this.i18nText[key] : '',
        };
        this.colorList.push(obj);
      } else if (this.borderColorKey.some((item) => key.includes(item))) {
        const obj = {
          name: key,
          type: 'border',
          value: theme.data[key],
          description: this.i18nText ? this.i18nText[key] : '',
        };
        this.colorList.push(obj);
      } else if (this.statusColorKey.some((item) => key.includes(item))) {
        const obj = {
          name: key,
          type: 'status',
          value: theme.data[key],
          description: this.i18nText ? this.i18nText[key] : '',
        };
        this.colorList.push(obj);
      } else if (this.brandKey.some((item) => key.includes(item))) {
        const obj = {
          name: key,
          type: 'brand',
          value: theme.data[key],
          description: this.i18nText ? this.i18nText[key] : '',
        };
        this.colorList.push(obj);
      } else {
        const obj = {
          name: key,
          type: 'others',
          value: theme.data[key],
          description: this.i18nText ? this.i18nText[key] : '',
        };
        this.colorList.push(obj);
      }
    }
    this.transferDataSource();
  };

  preserveOrder(a, b) {
    return 1;
  }

  transferDataSource() {
    this.dataSource = new Map();
    this.colorList.forEach((item) => {
      if (this.dataSource.has(item.type)) {
        this.dataSource.get(item.type).push(item);
      } else {
        this.dataSource.set(item.type, [item]);
      }
    });
  }

  setI18n() {
    this.subs.add(
      this.translate.get('components.design-color.colorDemo.instance').subscribe((res) => {
        this.i18nText = res.colorSource;
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.design-color.colorDemo.instance');
        this.i18nText = values.colorSource;
      })
    );
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
