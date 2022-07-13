import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableExpandConfig } from 'ng-devui/data-table';
import { devuiDarkTheme, devuiLightTheme, ThemeService } from 'ng-devui/theme';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

export interface CatalogConfig {
  name: string;
  type: string;
  expand?: boolean;
  [propName: string]: any;
}

@Component({
  selector: 'd-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
})
export class ColorComponent implements OnInit, OnDestroy {
  themeService: ThemeService;
  subs: Subscription = new Subscription();
  headerExpandConfig: TableExpandConfig;
  activeTab: string | number = 'tab1';
  colorSource = [];
  textColorSource = [];
  borderColorSource = [];
  backgroundColorSource = [];
  statusColorSource = [];
  themeColorSource = [];
  catalogs: CatalogConfig[] = [];
  catalogsList: CatalogConfig[] = [];
  tableList: CatalogConfig[][] = [];
  colorTypeList = ['blue', 'sky', 'green', 'lime', 'yellow', 'orange', 'red', 'magenta', 'purple'];
  // TODO: 灰色类变量用于文字，边框，背景，暂不支持开发直接使用灰色变量
  colorTypeSecList = ['gray', 'slate', 'zinc', 'dark-gray', 'dark-slate', 'dark-zinc'];
  colorNumberList = ['5', '10' ,'20', '30', '40', '50', '60', '70', '80', '90', '100'];
  colorList = [];
  tableNameList = [];

  colors = [];
  constructor(private translate: TranslateService) {}

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
    if(this.activeTab === 'tab1') {
      this.catalogs.forEach(item => {
        this.changeVal(item, theme);
      });
    }
  };

  changeVal(val, theme) {
    val.map((obj) => {
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
  };

  toggleExpand(rowItem, index) {
    rowItem.expand = !rowItem.expand;
    if (rowItem.expand) {
      const insertItems = this.colorSource.filter((color) => color.type === rowItem.type);
      this.catalogs.splice(index + 1, 0, ...insertItems);
    } else {
      const itemLength = this.colorSource.filter((color) => color.type === rowItem.type).length;
      this.catalogs.splice(index + 1, itemLength);
    }
  }

  setI18n() {
    this.subs.add(
      this.translate.get('components.design-color.colorDemo.instance').subscribe((res) => {
        this.setValues(res);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        const values = this.translate.instant('components.design-color.colorDemo.instance');
        this.setValues(values);
      })
    );
  }

  setValues(values) {
    this.tableNameList = [];
    Object.values(values.catalogsList).forEach(item => {
      this.tableNameList.push(item);
    });

    this.colorSource = [
      {
        type: 'background',
        name: '$devui-global-bg',
        description: values.colorSource['devui-global-bg']
      },
      {
        type: 'background',
        name: '$devui-global-bg-normal',
        description: values.colorSource['devui-global-bg-normal'],
      },
      {
        type: 'background',
        name: '$devui-base-bg',
        description: values.colorSource['devui-global-bg-normal'],
      },
      {
        type: 'background',
        name: '$devui-base-bg-dark',
        description: values.colorSource['devui-base-bg-dark'],
      },
      { type: 'theme', name: '$devui-brand', light: '#5e7ce0', dark: '#5e7ce0', description: values.colorSource['devui-brand'] },
      { type: 'theme', name: '$devui-brand-foil', light: '#859bff', dark: '#313a61', description: values.colorSource['devui-brand-foil'] },
      {
        type: 'theme',
        name: '$devui-brand-hover',
        description: values.colorSource['devui-brand-hover'],
      },
      {
        type: 'theme',
        name: '$devui-brand-active',
        description: values.colorSource['devui-brand-active'],
      },
      {
        type: 'theme',
        name: '$devui-brand-active-focus',
        description: values.colorSource['devui-brand-active-focus'],
      },
      { type: 'theme', name: '$devui-contrast', description: values.colorSource['devui-contrast'] },
      { type: 'text', name: '$devui-text', description: values.colorSource['devui-text'] },
      { type: 'text', name: '$devui-text-weak', description: values.colorSource['devui-text-weak'] },
      { type: 'text', name: '$devui-aide-text', description: values.colorSource['devui-aide-text'] },
      {
        type: 'text',
        name: '$devui-aide-text-hover',
        description: values.colorSource['devui-aide-text-hover'],
      },
      {
        type: 'text',
        name: '$devui-aide-text-stress',
        description: values.colorSource['devui-aide-text-stress'],
      },
      {
        type: 'text',
        name: '$devui-placeholder',
        description: values.colorSource['devui-placeholder'],
      },
      { type: 'text', name: '$devui-light-text', description: values.colorSource['devui-light-text'] },
      { type: 'text', name: '$devui-dark-text', description: values.colorSource['devui-dark-text'] },
      { type: 'text', name: '$devui-link', description: values.colorSource['devui-link'] },
      {
        type: 'text',
        name: '$devui-link-active',
        description: values.colorSource['devui-link-active'],
      },
      { type: 'text', name: '$devui-link-light', description: values.colorSource['devui-link-light'] },
      {
        type: 'text',
        name: '$devui-link-light-active',
        description: values.colorSource['devui-link-light-active'],
      },
      { type: 'border', name: '$devui-line', description: values.colorSource['devui-line'] },
      {
        type: 'border',
        name: '$devui-dividing-line',
        description: values.colorSource['devui-dividing-line'],
      },
      { type: 'background', name: '$devui-block', description: values.colorSource['devui-block'] },
      { type: 'background', name: '$devui-area', description: values.colorSource['devui-area'] },
      { type: 'status', name: '$devui-danger', description: values.colorSource['devui-danger'] },
      { type: 'status', name: '$devui-warning', description: values.colorSource['devui-warning'] },
      { type: 'status', name: '$devui-waiting', description: values.colorSource['devui-waiting'] },
      { type: 'status', name: '$devui-success', description: values.colorSource['devui-success'] },
      { type: 'status', name: '$devui-info', description: values.colorSource['devui-info'] },
      { type: 'status', name: '$devui-initial', description: values.colorSource['devui-initial'] },
      {
        type: 'status',
        name: '$devui-unavailable',
        description: values.colorSource['devui-unavailable'],
      },
      {
        type: 'status',
        name: '$devui-shadow',
        description: values.colorSource['devui-shadow'],
      },
      {
        type: 'status',
        name: '$devui-light-shadow',
        description: values.colorSource['devui-light-shadow'],
      },

      { type: 'text', name: '$devui-icon-text', description: values.colorSource['devui-icon-text'] },
      { type: 'background', name: '$devui-icon-bg', description: values.colorSource['devui-icon-bg'] },
      { type: 'status', name: '$devui-icon-fill', description: values.colorSource['devui-icon-fill'] },
      {
        type: 'status',
        name: '$devui-icon-fill-hover',
        description: values.colorSource['devui-icon-fill-hover'],
      },
      {
        type: 'status',
        name: '$devui-icon-fill-active',
        description: values.colorSource['devui-icon-fill-active'],
      },
      {
        type: 'status',
        name: '$devui-icon-fill-active-hover',
        description: values.colorSource['evui-icon-fill-active-hover'],
      },

      {
        type: 'border',
        name: '$devui-form-control-line',
        description: values.colorSource['devui-form-control-line'],
      },
      {
        type: 'border',
        name: '$devui-form-control-line-hover',
        description: values.colorSource['devui-form-control-line-hover'],
      },
      {
        type: 'border',
        name: '$devui-form-control-line-active',
        description: values.colorSource['devui-form-control-line-active'],
      },
      {
        type: 'border',
        name: '$devui-form-control-line-active-hover',
        description: values.colorSource['devui-form-control-line-active-hover'],
      },

      {
        type: 'background',
        name: '$devui-list-item-active-bg',
        description: values.colorSource['devui-list-item-active-bg'],
      },
      {
        type: 'text',
        name: '$devui-list-item-active-text',
        description: values.colorSource['devui-list-item-active-text'],
      },
      {
        type: 'background',
        name: '$devui-list-item-active-hover-bg',
        description: values.colorSource['devui-list-item-active-hover-bg'],
      },
      {
        type: 'background',
        name: '$devui-list-item-hover-bg',
        description: values.colorSource['$devui-list-item-hover-bg'],
      },
      {
        type: 'text',
        name: '$devui-list-item-hover-text',
        description: values.colorSource['devui-list-item-hover-text'],
      },
      {
        type: 'background',
        name: '$devui-list-item-selected-bg',
        description: values.colorSource['devui-list-item-selected-bg'],
      },
      {
        type: 'background',
        name: '$devui-list-item-strip-bg',
        description: values.colorSource['devui-list-item-strip-bg'],
      },

      {
        type: 'background',
        name: '$devui-disabled-bg',
        description: values.colorSource['devui-disabled-bg'],
      },
      {
        type: 'border',
        name: '$devui-disabled-line',
        description: values.colorSource['devui-disabled-line'],
      },
      {
        type: 'text',
        name: '$devui-disabled-text',
        description: values.colorSource['devui-disabled-text'],
      },
      {
        type: 'text',
        name: '$devui-primary-disabled',
        description: values.colorSource['devui-primary-disabled'],
      },
      {
        type: 'status',
        name: '$devui-icon-fill-active-disabled',
        description: values.colorSource['devui-icon-fill-active-disabled'],
      },

      {
        type: 'background',
        name: '$devui-label-bg',
        description: values.colorSource['devui-label-bg'],
      },
      {
        type: 'background',
        name: '$devui-connected-overlay-bg',
        description: values.colorSource['devui-connected-overlay-bg'],
      },
      {
        type: 'border',
        name: '$devui-connected-overlay-line',
        description: values.colorSource['devui-connected-overlay-line'],
      },
      {
        type: 'background',
        name: '$devui-fullscreen-overlay-bg',
        description: values.colorSource['devui-fullscreen-overlay-bg'],
      },
      {
        type: 'background',
        name: '$devui-feedback-overlay-bg',
        description: values.colorSource['devui-feedback-overlay-bg'],
      },
      {
        type: 'text',
        name: '$devui-feedback-overlay-text',
        description: values.colorSource['devui-feedback-overlay-text'],
      },
      {
        type: 'background',
        name: '$devui-embed-search-bg',
        description: values.colorSource['devui-embed-search-bg'],
      },
      {
        type: 'background',
        name: '$devui-embed-search-bg-hover',
        description: values.colorSource['devui-embed-search-bg-hover'],
      },
      {
        type: 'background',
        name: '$devui-float-block-shadow',
        description: values.colorSource['devui-float-block-shadow'],
      },
      {
        type: 'background',
        name: '$devui-highlight-overlay',
        description: values.colorSource['devui-highlight-overlay'],
      },
      {
        type: 'background',
        name: '$devui-range-item-hover-bg',
        description: values.colorSource['devui-range-item-hover-bg'],
      },

      { type: 'status', name: '$devui-primary', light: '#5e7ce0', dark: '#5e7ce0', description: values.colorSource['devui-primary'] },
      {
        type: 'status',
        name: '$devui-primary-hover',
        description: values.colorSource['devui-primary-hover'],
      },
      {
        type: 'status',
        name: '$devui-primary-active',
        description: values.colorSource['devui-primary-active'],
      },
      {
        type: 'status',
        name: '$devui-contrast-hover',
        description: values.colorSource['devui-contrast-hover'],
      },
      {
        type: 'status',
        name: '$devui-contrast-active',
        description: values.colorSource['devui-contrast-active'],
      },

      {
        type: 'status',
        name: '$devui-danger-line',
        description: values.colorSource['devui-danger-line'],
      },
      { type: 'status', name: '$devui-danger-bg', description: values.colorSource['devui-danger-bg'] },
      {
        type: 'status',
        name: '$devui-warning-line',
        description: values.colorSource['devui-warning-line'],
      },
      { type: 'status', name: '$devui-warning-bg', description: values.colorSource['devui-warning-bg'] },
      { type: 'status', name: '$devui-info-line', description: values.colorSource['devui-info-line'] },
      { type: 'status', name: '$devui-info-bg', description: values.colorSource['devui-info-bg'] },
      {
        type: 'status',
        name: '$devui-success-line',
        description: values.colorSource['devui-success-line'],
      },
      { type: 'status', name: '$devui-success-bg', description: values.colorSource['devui-success-bg'] },
      {
        type: 'status',
        name: '$devui-primary-line',
        description: values.colorSource['devui-primary-line'],
      },
      { type: 'status', name: '$devui-primary-bg', description: values.colorSource['devui-primary-bg'] },
      {
        type: 'status',
        name: '$devui-default-line',
        description: values.colorSource['devui-default-line'],
      },
      { type: 'status', name: '$devui-default-bg', description: values.colorSource['devui-default-bg'] },
    ];

    this.catalogsList = [
      { name: values.catalogsList.theme, type: 'theme', expand: true },
      { name: values.catalogsList.text, type: 'text', expand: true },
      { name: values.catalogsList.border, type: 'border', expand: true },
      { name: values.catalogsList.background, type: 'background', expand: true },
      { name: values.catalogsList.status, type: 'status', expand: true },
    ];

    this.colors = [
      { name: '$global-bg', newName: '$devui-global-bg', description: values.colors['global-bg'] },
      { name: '$bg-white', newName: '$devui-base-bg', description: values.colors['bg-white'] },
      {
        name: '$base-bg-white',
        newName: '$devui-global-bg-normal',
        description: values.colors['base-bg-white'],
      },
      { name: '$block-bg-white', newName: '$devui-block', description: values.colors['block-bg-white'] },
      { name: '$brand-1', newName: '$devui-brand', description: values.colors['brand-1'] },
      { name: '$brand-2', newName: '$devui-brand-active-focus', description: values.colors['brand-2'] },
      {
        name: '$brand-3',
        newName: '$devui-list-item-selected-bg',
        description: values.colors['brand-3'],
      },
      { name: '$brand-4', newName: '$devui-brand-foil', description: values.colors['brand-4'] },

      { name: '$dark-1', newName: '$devui-text', description: values.colors['dark-1'] },
      { name: '$dark-2', newName: '$devui-aide-text', description: values.colors['dark-2'] },
      { name: '$dark-3', newName: '$devui-placeholder', description: values.colors['dark-3'] },
      {
        name: '$dark-1-boxshadow-light',
        newName: '$devui-light-shadow',
        description: values.colors['dark-1-boxshadow-light'],
      },
      {
        name: '$dark-1-boxshadow',
        newName: '$devui-shadow',
        description: values.colors['dark-1-boxshadow'],
      },
      { name: '$dark-1-3', newName: '废弃', light: '#252b3a', dark: '#d1d4da', description: values.colors['dark-1-3'] },
      { name: '$dividing', newName: '$devui-dividing-line', description: values.colors['dividing'] },
      {
        name: '$dropdown-overlay',
        newName: '$devui-connected-overlay-bg',
        light: '#ffffff',
        dark: '#2F2F2F',
        description: values.colors['dropdown-overlay'],
      },
      { name: '$font-dark', newName: '$devui-dark-text', description: values.colors['font-dark'] },
      { name: '$font-white', newName: '$devui-light-text', description: values.colors['font-white'] },
      {
        name: '$full-screen-overlay',
        newName: '$devui-fullscreen-overlay-bg',
        light: '#ffffff',
        dark: '#4C4C4C',
        description: values.colors['full-screen-overlay'],
      },
      { name: '$gray-1', newName: '$devui-line', description: values.colors['gray-1'] },
      { name: '$gray-2', newName: '$devui-dividing-line', description: values.colors['gray-2'] },
      { name: '$gray-3', newName: '$devui-area', description: values.colors['gray-3'] },
      {
        name: '$highlight-overlay',
        newName: '$devui-highlight-overlay',
        description: values.colors['highlight-overlay'],
      },
      {
        name: '$hover-control',
        newName: '$devui-brand-active',
        description: values.colors['hover-control'],
      },
      {
        name: '$hover-control-light',
        newName: '$devui-link-light-active',
        description: values.colors['hover-control-light'],
      },
      {
        name: '$hover-content',
        newName: '$devui-list-item-hover-bg',
        description: values.colors['hover-content'],
      },
      { name: '$huawei-bg', newName: '$devui-base-bg-dark', description: values.colors['huawei-bg'] },
      { name: '$huawei-red', newName: '$devui-contrast', description: values.colors['huawei-red'] },
      { name: '$icon-gray-bg', newName: '$devui-icon-fill', description: values.colors['icon-gray-bg'] },
      { name: '$link', newName: '$devui-link', description: values.colors['link'] },
      { name: '$link-light', newName: '$devui-link-light', description: values.colors['link-light'] },
      { name: '$status-red', newName: '$devui-danger', description: values.colors['status-red'] },
      { name: '$status-yellow', newName: '$devui-warning', description: values.colors['status-yellow'] },
      {
        name: '$status-waiting',
        newName: '$devui-waiting',
        description: values.colors['status-waiting'],
      },
      { name: '$status-green', newName: '$devui-success', description: values.colors['status-green'] },
      { name: '$status-blue', newName: '$devui-info', description: values.colors['status-blue'] },
      {
        name: '$status-initial',
        newName: '$devui-initial',
        description: values.colors['status-initial'],
      },
      {
        name: '$status-unavaliable',
        newName: '$devui-unavailable',
        description: values.colors['status-unavaliable'],
      },
      {
        name: '$strip-color',
        newName: '$devui-list-item-strip-bg',
        description: values.colors['strip-color'],
      },
      {
        name: '$tag-label-bgcolor',
        newName: '$devui-label-bg',
        description: values.colors['tag-label-bgcolor'],
      },
      {
        name: '$hwc-status-danger-border',
        newName: '$devui-danger-line',
        description: values.colors['hwc-status-danger-border'],
      },
      {
        name: '$hwc-status-danger-background',
        newName: '$devui-danger-bg',
        description: values.colors['hwc-status-danger-background'],
      },
      {
        name: '$hwc-status-warning-border',
        newName: '$devui-warning-line',
        description: values.colors['hwc-status-warning-border'],
      },
      {
        name: '$hwc-status-warning-background',
        newName: '$devui-warning-bg',
        description: values.colors['hwc-status-warning-background'],
      },
      {
        name: '$hwc-status-info-border',
        newName: '$devui-info-line',
        description: values.colors['hwc-status-info-border'],
      },
      {
        name: '$hwc-status-info-background',
        newName: '$devui-info-bg',
        description: values.colors['hwc-status-info-background'],
      },
      {
        name: '$hwc-status-success-border',
        newName: '$devui-success-line',
        description: values.colors['hwc-status-success-border'],
      },
      {
        name: '$hwc-status-success-background',
        newName: '$devui-success-bg',
        description: values.colors['hwc-status-success-background'],
      },
      {
        name: '$hwc-feedback-overlay-background',
        newName: '$devui-feedback-overlay-bg',
        description: values.colors['hwc-feedback-overlay-background'],
      },
      {
        name: '$hwc-feedback-overlay-font-color',
        newName: '$devui-feedback-overlay-text',
        description: values.colors['hwc-feedback-overlay-font-color'],
      },
      {
        name: '$color-bg-primary',
        newName: '$devui-primary',
        description: values.colors['color-bg-primary'],
      },
      {
        name: '$color-bg-primary-hover',
        newName: '$devui-primary-hover',
        description: values.colors['color-bg-primary-hover'],
      },
      {
        name: '$color-bg-primary-active',
        newName: '$devui-primary-active',
        description: values.colors['color-bg-primary-active'],
      },
      {
        name: '$hwc-drop-down-search',
        newName: '$devui-embed-search-bg',
        description: values.colors['hwc-drop-down-search'],
      },
      {
        name: '$hwc-drop-down-search-hover',
        newName: '$devui-embed-search-bg-hover',
        description: values.colors['hwc-drop-down-search-hover'],
      },
      { name: '$disabled-bg', newName: '$devui-disabled-bg', description: values.colors['disabled-bg'] },
      {
        name: '$disabled-border',
        newName: '$devui-disabled-line',
        description: values.colors['disabled-border'],
      },
      {
        name: '$disabled-content',
        newName: '$devui-disabled-text',
        description: values.colors['disabled-content'],
      },
    ];

    this.colorList = [
      ['#f2f5fc', '#e9edfa', '#beccfa', '#96adfa', '#7693f5', '#5e7ce0', '#526ecc', '#465eb8', '#3c51a6', '#344899', '#2a3c85'],
      ['#ebf6ff', '#d1ebff', '#b8e0ff', '#9ed5ff', '#85caff', '#6cbfff', '#4ea6e6', '#3590cc', '#207ab3', '#0f6999', '#035880'],
      ['#edfff9', '#cffcee', '#acf2dc', '#8be8cb', '#6ddebb', '#50d4ab', '#3ac295', '#27b080', '#169e6c', '#088c58', '#007a45'],
      ['#f0ffe6', '#e5ffd4', '#d8fcc0', '#c5f2a7', '#b3e890', '#a6dd82', '#92cc68', '#7eba50', '#6ca83b', '#5e9629', '#518519'],
      ['#fffbf0', '#fff1c2', '#ffe794', '#ffdc66', '#ffd138', '#fac20a', '#e3aa00', '#cc9600', '#b58200', '#9e6f00', '#875c00'],
      ['#fff3e8', '#ffe1c7', '#ffd0a6', '#ffbf85', '#ffad63', '#fa9841', '#e37d29', '#cc6414', '#b54e04', '#9e3f00', '#873400'],
      ['#ffeeed', '#ffd5d4', '#ffbcba', '#ffa4a1', '#ff8b87', '#f66f6a', '#de504e', '#c73636', '#b02121', '#991111', '#820404'],
      ['#ffedf3', '#ffd4e3', '#ffbad2', '#ffa1c2', '#fc86b0', '#f3689a', '#db4d83', '#c4356e', '#ad215b', '#96114d', '#800440'],
      ['#f5f0ff', '#e7d9ff', '#d8c2ff', '#caabff', '#bc94ff', '#a97af8', '#8a5ce0', '#6f42c9', '#572db3', '#3f1a9c', '#2a0c85'],
    ];

    this.generateColorData();
    this.setDataList();
  }

  generateColorData() {
    const lightData = devuiLightTheme.data;
    const darkData = devuiDarkTheme.data;
    this.colorSource.forEach((item) => {
      const colorName = item.name.slice(1);
      item.light = lightData[colorName];
      item.dark = darkData[colorName];
    });
    this.colors.forEach((item) => {
      if(item.newName !== '废弃') {
        const colorName = item.newName.slice(1);
        item.light = lightData[colorName];
        item.dark = darkData[colorName];
      }
    });
  }

  setDataList() {
    if(this.activeTab === 'tab1') {
      const result = [];
      this.tableList = [];
      this.catalogsList.forEach((catalog, catalogIndex) => {
        if (catalog.expand && !Object.prototype.hasOwnProperty.call(
          this.catalogsList[catalogIndex + 1] || {}, 'description')) {
          const insertItems = this.colorSource.filter((color) => color.type === catalog.type);
          this[`${insertItems[0].type}ColorSource`] = insertItems;
          this.tableList.push(this[`${insertItems[0].type}ColorSource`]);
          result.push(this[`${insertItems[0].type}ColorSource`]);
        }
      });
      this.catalogs = result;
    }
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
