import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableExpandConfig } from 'ng-devui/data-table';
import { ThemeService } from 'ng-devui/theme';
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
  catalogs: CatalogConfig[] = [];

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
    this.catalogs.map((obj) => {
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
    this.colorSource = [
      { type: 'basic', name: '$devui-global-bg', light: '#f3f6f8', dark: '#202124', description: values.colorSource['devui-global-bg'] },
      {
        type: 'basic',
        name: '$devui-global-bg-normal',
        light: '#ffffff',
        dark: '#202124',
        description: values.colorSource['devui-global-bg-normal'],
      },
      {
        type: 'basic',
        name: '$devui-base-bg',
        light: '#ffffff',
        dark: '#2E2F31',
        description: values.colorSource['devui-global-bg-normal'],
      },
      {
        type: 'basic',
        name: '$devui-base-bg-dark',
        light: '#333854',
        dark: '#2e2f31',
        description: values.colorSource['devui-base-bg-dark'],
      },
      { type: 'basic', name: '$devui-brand', light: '#5e7ce0', dark: '#5e7ce0', description: values.colorSource['devui-brand'] },
      { type: 'basic', name: '$devui-brand-foil', light: '#859bff', dark: '#313a61', description: values.colorSource['devui-brand-foil'] },
      {
        type: 'basic',
        name: '$devui-brand-hover',
        light: '#7693f5',
        dark: '#425288',
        description: values.colorSource['devui-brand-hover'],
      },
      {
        type: 'basic',
        name: '$devui-brand-active',
        light: '#526ecc',
        dark: '#526ecc',
        description: values.colorSource['devui-brand-active'],
      },
      {
        type: 'basic',
        name: '$devui-brand-active-focus',
        light: '#344899',
        dark: '#344899',
        description: values.colorSource['devui-brand-active-focus'],
      },
      { type: 'basic', name: '$devui-contrast', light: '#C7000B', dark: '#C7000B', description: values.colorSource['devui-contrast'] },
      { type: 'basic', name: '$devui-text', light: '#252b3a', dark: '#E8E8E8', description: values.colorSource['devui-text'] },
      { type: 'basic', name: '$devui-text-weak', light: '#575d6c', dark: '#A0A0A0', description: values.colorSource['devui-text-weak'] },
      { type: 'basic', name: '$devui-aide-text', light: '#8a8e99', dark: '#909090', description: values.colorSource['devui-aide-text'] },
      {
        type: 'basic',
        name: '$devui-aide-text-stress',
        light: '#575d6c',
        dark: '#A0A0A0',
        description: values.colorSource['devui-aide-text-stress'],
      },
      {
        type: 'basic',
        name: '$devui-placeholder',
        light: '#8a8e99',
        dark: '#8A8A8A',
        description: values.colorSource['devui-placeholder'],
      },
      { type: 'basic', name: '$devui-light-text', light: '#ffffff', dark: '#ffffff', description: values.colorSource['devui-light-text'] },
      { type: 'basic', name: '$devui-dark-text', light: '#252b3a', dark: '#252b3a', description: values.colorSource['devui-dark-text'] },
      { type: 'basic', name: '$devui-link', light: '#526ecc', dark: '#526ECC', description: values.colorSource['devui-link'] },
      {
        type: 'basic',
        name: '$devui-link-active',
        light: '#344899',
        dark: '#344899',
        description: values.colorSource['devui-link-active'],
      },
      { type: 'basic', name: '$devui-link-light', light: '#96adfa', dark: '#96adfa', description: values.colorSource['devui-link-light'] },
      {
        type: 'basic',
        name: '$devui-link-light-active',
        light: '#beccfa',
        dark: '#beccfa',
        description: values.colorSource['devui-link-light-active'],
      },
      { type: 'basic', name: '$devui-line', light: '#adb0b8', dark: '#505153', description: values.colorSource['devui-line'] },
      {
        type: 'basic',
        name: '$devui-dividing-line',
        light: '#dfe1e6',
        dark: '#3D3E40',
        description: values.colorSource['devui-dividing-line'],
      },
      { type: 'basic', name: '$devui-block', light: '#ffffff', dark: '#606061', description: values.colorSource['devui-block'] },
      { type: 'basic', name: '$devui-area', light: '#f8f8f8', dark: '#34363A', description: values.colorSource['devui-area'] },
      { type: 'basic', name: '$devui-danger', light: '#f66f6a', dark: '#f66f6a', description: values.colorSource['devui-danger'] },
      { type: 'basic', name: '$devui-warning', light: '#fac20a', dark: '#fac20a', description: values.colorSource['devui-warning'] },
      { type: 'basic', name: '$devui-waiting', light: '#9faad7', dark: '#5e6580', description: values.colorSource['devui-waiting'] },
      { type: 'basic', name: '$devui-success', light: '#50d4ab', dark: '#50d4ab', description: values.colorSource['devui-success'] },
      { type: 'basic', name: '$devui-info', light: '#5e7ce0', dark: '#5e7ce0', description: values.colorSource['devui-info'] },
      { type: 'basic', name: '$devui-initial', light: '#e9edfa', dark: '#64676e', description: values.colorSource['devui-initial'] },
      {
        type: 'basic',
        name: '$devui-unavailable',
        light: '#f5f5f6',
        dark: '#5b5b5c',
        description: values.colorSource['devui-unavailable'],
      },
      {
        type: 'basic',
        name: '$devui-shadow',
        light: 'rgba(0, 0, 0, 0.2)',
        dark: 'rgba(17, 18, 19, 0.4)',
        description: values.colorSource['devui-shadow'],
      },
      {
        type: 'basic',
        name: '$devui-light-shadow',
        light: 'rgba(0, 0, 0, 0.1)',
        dark: 'rgba(17, 18, 19, 0.5)',
        description: values.colorSource['devui-light-shadow'],
      },

      { type: 'icon', name: '$devui-icon-text', light: '#252b3a', dark: '#E8E8E8', description: values.colorSource['devui-icon-text'] },
      { type: 'icon', name: '$devui-icon-bg', light: '#ffffff', dark: '#2E2F31', description: values.colorSource['devui-icon-bg'] },
      { type: 'icon', name: '$devui-icon-fill', light: '#d3d5d9', dark: '#606061', description: values.colorSource['devui-icon-fill'] },
      {
        type: 'icon',
        name: '$devui-icon-fill-hover',
        light: '#adb5ce',
        dark: '#73788a',
        description: values.colorSource['devui-icon-fill-hover'],
      },
      {
        type: 'icon',
        name: '$devui-icon-fill-active',
        light: '#5e7ce0',
        dark: '#5e7ce0',
        description: values.colorSource['devui-icon-fill-active'],
      },
      {
        type: 'icon',
        name: '$devui-icon-fill-active-hover',
        light: '#526ecc',
        dark: '#526ecc',
        description: values.colorSource['evui-icon-fill-active-hover'],
      },

      {
        type: 'form',
        name: '$devui-form-control-line',
        light: '#adb0b8',
        dark: '#505153',
        description: values.colorSource['devui-form-control-line'],
      },
      {
        type: 'form',
        name: '$devui-form-control-line-hover',
        light: '#575d6c',
        dark: '#909090',
        description: values.colorSource['devui-form-control-line-hover'],
      },
      {
        type: 'form',
        name: '$devui-form-control-line-active',
        light: '#5e7ce0',
        dark: '#5e7ce0',
        description: values.colorSource['devui-form-control-line-active'],
      },
      {
        type: 'form',
        name: '$devui-form-control-line-active-hover',
        light: '#344899',
        dark: '#344899',
        description: values.colorSource['devui-form-control-line-active-hover'],
      },

      {
        type: 'list',
        name: '$devui-list-item-active-bg',
        light: '#5e7ce0',
        dark: '#5e7ce0',
        description: values.colorSource['devui-list-item-active-bg'],
      },
      {
        type: 'list',
        name: '$devui-list-item-active-text',
        light: '#ffffff',
        dark: '#ffffff',
        description: values.colorSource['devui-list-item-active-text'],
      },
      {
        type: 'list',
        name: '$devui-list-item-active-hover-bg',
        light: '#526ecc',
        dark: '#526ecc',
        description: values.colorSource['devui-list-item-active-hover-bg'],
      },
      {
        type: 'list',
        name: '$devui-list-item-hover-bg',
        light: '#f2f5fc',
        dark: '#383838',
        description: values.colorSource['$devui-list-item-hover-bg'],
      },
      {
        type: 'list',
        name: '$devui-list-item-hover-text',
        light: '#526ecc',
        dark: '#526ecc',
        description: values.colorSource['devui-list-item-hover-text'],
      },
      {
        type: 'list',
        name: '$devui-list-item-selected-bg',
        light: '#e9edfa',
        dark: '#454545',
        description: values.colorSource['devui-list-item-selected-bg'],
      },
      {
        type: 'list',
        name: '$devui-list-item-strip-bg',
        light: '#f2f5fc',
        dark: '#383838',
        description: values.colorSource['devui-list-item-strip-bg'],
      },

      {
        type: 'disable',
        name: '$devui-disabled-bg',
        light: '#f5f5f6',
        dark: '#3D3E44',
        description: values.colorSource['devui-disabled-bg'],
      },
      {
        type: 'disable',
        name: '$devui-disabled-line',
        light: '#dfe1e6',
        dark: '#505153',
        description: values.colorSource['devui-disabled-line'],
      },
      {
        type: 'disable',
        name: '$devui-disabled-text',
        light: '#adb0b8',
        dark: '#7D7D7D',
        description: values.colorSource['devui-disabled-text'],
      },
      {
        type: 'disable',
        name: 'devui-primary-disabled',
        light: '#beccfa',
        dark: '#2b3458',
        description: values.colorSource['devui-primary-disabled'],
      },
      {
        type: 'disable',
        name: 'devui-icon-fill-active-disabled',
        light: '#beccfa',
        dark: '#2b3458',
        description: values.colorSource['devui-icon-fill-active-disabled'],
      },

      {
        type: 'specialBackground',
        name: '$devui-label-bg',
        light: '#eef0f5',
        dark: '#46443F',
        description: values.colorSource['devui-label-bg'],
      },
      {
        type: 'specialBackground',
        name: '$devui-connected-overlay-bg',
        light: '#ffffff',
        dark: '#2F2F2F',
        description: values.colorSource['devui-connected-overlay-bg'],
      },
      {
        type: 'specialBackground',
        name: '$devui-connected-overlay-line',
        light: '#526ecc',
        dark: '#526ecc',
        description: values.colorSource['devui-connected-overlay-line'],
      },
      {
        type: 'specialBackground',
        name: '$devui-fullscreen-overlay-bg',
        light: '#ffffff',
        dark: '#2E2F31',
        description: values.colorSource['devui-fullscreen-overlay-bg'],
      },
      {
        type: 'specialBackground',
        name: '$devui-feedback-overlay-bg',
        light: '#464d6e',
        dark: '#4C4C4C',
        description: values.colorSource['devui-feedback-overlay-bg'],
      },
      {
        type: 'specialBackground',
        name: '$devui-feedback-overlay-text',
        light: '#dfe1e6',
        dark: '#DFE1E6',
        description: values.colorSource['devui-feedback-overlay-text'],
      },
      {
        type: 'specialBackground',
        name: '$devui-embed-search-bg',
        light: '#f2f5fc',
        dark: '#383838',
        description: values.colorSource['devui-embed-search-bg'],
      },
      {
        type: 'specialBackground',
        name: '$devui-embed-search-bg-hover',
        light: '#eef0f5',
        dark: '#3D3E40',
        description: values.colorSource['devui-embed-search-bg-hover'],
      },
      {
        type: 'specialBackground',
        name: '$devui-float-block-shadow',
        light: 'rgba(94, 124, 224, 0.3)',
        dark: 'rgba(94, 124, 224, 0.3)',
        description: values.colorSource['devui-float-block-shadow'],
      },
      {
        type: 'specialBackground',
        name: '$devui-highlight-overlay',
        light: 'rgba(255, 255, 255, 0.8)',
        dark: 'rgba(255, 255, 255, 0.1)',
        description: values.colorSource['devui-highlight-overlay'],
      },
      {
        type: 'specialBackground',
        name: '$devui-range-item-hover-bg',
        light: '#e9edfa',
        dark: '#454545',
        description: values.colorSource['devui-range-item-hover-bg'],
      },

      { type: 'button', name: '$devui-primary', light: '#5e7ce0', dark: '#5e7ce0', description: values.colorSource['devui-primary'] },
      {
        type: 'button',
        name: '$devui-primary-hover',
        light: '#7693f5',
        dark: '#425288',
        description: values.colorSource['devui-primary-hover'],
      },
      {
        type: 'button',
        name: '$devui-primary-active',
        light: '#344899',
        dark: '#344899',
        description: values.colorSource['devui-primary-active'],
      },
      {
        type: 'button',
        name: '$devui-contrast-hover',
        light: '#D64A52',
        dark: '#D64A52',
        description: values.colorSource['devui-contrast-hover'],
      },
      {
        type: 'button',
        name: '$devui-contrast-active',
        light: '#B12220',
        dark: '#B12220',
        description: values.colorSource['devui-contrast-active'],
      },

      {
        type: 'status',
        name: '$devui-danger-line',
        light: '#f66f6a',
        dark: '#985C5A',
        description: values.colorSource['devui-danger-line'],
      },
      { type: 'status', name: '$devui-danger-bg', light: '#ffeeed', dark: '#4B3A39', description: values.colorSource['devui-danger-bg'] },
      {
        type: 'status',
        name: '$devui-warning-line',
        light: '#fa9841',
        dark: '#8D6138',
        description: values.colorSource['devui-warning-line'],
      },
      { type: 'status', name: '$devui-warning-bg', light: '#fff3e8', dark: '#554434', description: values.colorSource['devui-warning-bg'] },
      { type: 'status', name: '$devui-info-line', light: '#5e7ce0', dark: '#546BB7', description: values.colorSource['devui-info-line'] },
      { type: 'status', name: '$devui-info-bg', light: '#f2f5fc', dark: '#383D4F', description: values.colorSource['devui-info-bg'] },
      {
        type: 'status',
        name: '$devui-success-line',
        light: '#50d4ab',
        dark: '#5D887D',
        description: values.colorSource['devui-success-line'],
      },
      { type: 'status', name: '$devui-success-bg', light: '#edfff9', dark: '#304642', description: values.colorSource['devui-success-bg'] },
      {
        type: 'status',
        name: '$devui-primary-line',
        light: '#5e7ce0',
        dark: '#546BB7',
        description: values.colorSource['devui-primary-line'],
      },
      { type: 'status', name: '$devui-primary-bg', light: '#f2f5fc', dark: '#383D4F', description: values.colorSource['devui-primary-bg'] },
      {
        type: 'status',
        name: '$devui-default-line',
        light: '#5e7ce0',
        dark: '#5e7ce0',
        description: values.colorSource['devui-default-line'],
      },
      { type: 'status', name: '$devui-default-bg', light: '#f3f6f8', dark: '#383838', description: values.colorSource['devui-default-bg'] },
    ];

    this.catalogs = [
      { name: values.catalogs.basic, type: 'basic', expand: true },
      { name: values.catalogs.icon, type: 'icon', expand: true },
      { name: values.catalogs.form, type: 'form', expand: true },
      { name: values.catalogs.list, type: 'list', expand: true },
      { name: values.catalogs.disable, type: 'disable', expand: true },
      { name: values.catalogs.specialBackground, type: 'specialBackground', expand: true },
      { name: values.catalogs.button, type: 'button', expand: true },
      { name: values.catalogs.status, type: 'status', expand: true },
    ];

    this.colors = [
      { name: '$global-bg', newName: '$devui-global-bg', light: '#f3f6f8', dark: '#202124', description: values.colors['global-bg'] },
      { name: '$bg-white', newName: '$devui-base-bg', light: '#FFFFFF', dark: '#2E2F31', description: values.colors['bg-white'] },
      {
        name: '$base-bg-white',
        newName: '$devui-global-bg-normal',
        light: '#ffffff',
        dark: '#202124',
        description: values.colors['base-bg-white'],
      },
      { name: '$block-bg-white', newName: '$devui-block', light: '#ffffff', dark: '#606061', description: values.colors['block-bg-white'] },
      { name: '$brand-1', newName: '$devui-brand', light: '#5e7ce0', dark: '#5E7CE0', description: values.colors['brand-1'] },
      { name: '$brand-2', newName: '$devui-brand-active-focus', light: '#344899', dark: '#344899', description: values.colors['brand-2'] },
      {
        name: '$brand-3',
        newName: '$devui-list-item-selected-bg',
        light: '#e9edfa',
        dark: '#454545',
        description: values.colors['brand-3'],
      },
      { name: '$brand-4', newName: '$devui-brand-foil', light: '#859bff', dark: '#859BFF', description: values.colors['brand-4'] },

      { name: '$dark-1', newName: '$devui-text', light: '#252b3a', dark: '#E8E8E8', description: values.colors['dark-1'] },
      { name: '$dark-2', newName: '$devui-aide-text', light: '#575d6c', dark: '#909090', description: values.colors['dark-2'] },
      { name: '$dark-3', newName: '$devui-placeholder', light: '#8a8e99', dark: '#8A8A8A', description: values.colors['dark-3'] },
      {
        name: '$dark-1-boxshadow-light',
        newName: '$devui-light-shadow',
        light: 'rgba(41, 48, 64, 0.1)',
        dark: 'rgba(17, 18, 19, 0.5)',
        description: values.colors['dark-1-boxshadow-light'],
      },
      {
        name: '$dark-1-boxshadow',
        newName: '$devui-shadow',
        light: ' rgba(41, 48, 64, 0.2)',
        dark: 'rgba(17, 18, 19, 0.4)',
        description: values.colors['dark-1-boxshadow'],
      },
      { name: '$dark-1-3', newName: '废弃', light: '#252b3a', dark: '#d1d4da', description: values.colors['dark-1-3'] },
      { name: '$dividing', newName: '$devui-dividing-line', light: '#dfe1e6', dark: '#3D3E40', description: values.colors['dividing'] },
      {
        name: '$dropdown-overlay',
        newName: '$devui-connected-overlay-bg',
        light: '#ffffff',
        dark: '#2F2F2F',
        description: values.colors['dropdown-overlay'],
      },
      { name: '$font-dark', newName: '$devui-dark-text', light: '#293040', dark: '#293040', description: values.colors['font-dark'] },
      { name: '$font-white', newName: '$devui-light-text', light: '#ffffff', dark: '#ffffff', description: values.colors['font-white'] },
      {
        name: '$full-screen-overlay',
        newName: '$devui-fullscreen-overlay-bg',
        light: '#ffffff',
        dark: '#4C4C4C',
        description: values.colors['full-screen-overlay'],
      },
      { name: '$gray-1', newName: '$devui-line', light: '#adb0b8', dark: '#505153', description: values.colors['gray-1'] },
      { name: '$gray-2', newName: '$devui-dividing-line', light: '#dfe1e6', dark: '#3D3E40', description: values.colors['gray-2'] },
      { name: '$gray-3', newName: '$devui-area', light: '#f8f8f8', dark: '#34363A', description: values.colors['gray-3'] },
      {
        name: '$highlight-overlay',
        newName: '$devui-highlight-overlay',
        light: 'rgba(255, 255, 255, 0.8)',
        dark: 'rgba(255, 255, 255, 0.1)',
        description: values.colors['highlight-overlay'],
      },
      {
        name: '$hover-control',
        newName: '$devui-brand-active',
        light: '#526ecc',
        dark: '#526ECC',
        description: values.colors['hover-control'],
      },
      {
        name: '$hover-control-light',
        newName: '$devui-link-light-active',
        light: '#beccfa',
        dark: '#beccfa',
        description: values.colors['hover-control-light'],
      },
      {
        name: '$hover-content',
        newName: '$devui-list-item-hover-bg',
        light: '#f2f5fc',
        dark: '#383838',
        description: values.colors['hover-content'],
      },
      { name: '$huawei-bg', newName: '$devui-base-bg-dark', light: '#333854', dark: '#222222', description: values.colors['huawei-bg'] },
      { name: '$huawei-red', newName: '$devui-contrast', light: '#C7000B', dark: '#C7000B', description: values.colors['huawei-red'] },
      { name: '$icon-gray-bg', newName: '$devui-icon-fill', light: '#e3e5e9', dark: '#606061', description: values.colors['icon-gray-bg'] },
      { name: '$link', newName: '$devui-link', light: '#526ecc', dark: '#526ECC', description: values.colors['link'] },
      { name: '$link-light', newName: '$devui-link-light', light: '#96adfa', dark: '#96adfa', description: values.colors['link-light'] },
      { name: '$status-red', newName: '$devui-danger', light: '#f66f6a', dark: '#F66F6A', description: values.colors['status-red'] },
      { name: '$status-yellow', newName: '$devui-warning', light: '#fac20a', dark: '#FA9841', description: values.colors['status-yellow'] },
      {
        name: '$status-waiting',
        newName: '$devui-waiting',
        light: '#9faad7',
        dark: '#9faad7',
        description: values.colors['status-waiting'],
      },
      { name: '$status-green', newName: '$devui-success', light: '#50d4ab', dark: '#3DCCA6', description: values.colors['status-green'] },
      { name: '$status-blue', newName: '$devui-info', light: '#5e7ce0', dark: '#5E7CE0', description: values.colors['status-blue'] },
      {
        name: '$status-initial',
        newName: '$devui-initial',
        light: '#e9edfa',
        dark: '#E8F0FD',
        description: values.colors['status-initial'],
      },
      {
        name: '$status-unavaliable',
        newName: '$devui-unavailable',
        light: '#f5f5f6',
        dark: '#202124',
        description: values.colors['status-unavaliable'],
      },
      {
        name: '$strip-color',
        newName: '$devui-list-item-strip-bg',
        light: '#f2f5fc',
        dark: 'rgba(52, 54, 58, 0.5)',
        description: values.colors['strip-color'],
      },
      {
        name: '$tag-label-bgcolor',
        newName: '$devui-label-bg',
        light: '#eef0f5',
        dark: '#46443F',
        description: values.colors['tag-label-bgcolor'],
      },
      {
        name: '$hwc-status-danger-border',
        newName: '$devui-danger-line',
        light: '#ffa4a1',
        dark: '#985C5A',
        description: values.colors['hwc-status-danger-border'],
      },
      {
        name: '$hwc-status-danger-background',
        newName: '$devui-danger-bg',
        light: '#ffeeed',
        dark: '#4B3A39',
        description: values.colors['hwc-status-danger-background'],
      },
      {
        name: '$hwc-status-warning-border',
        newName: '$devui-warning-line',
        light: '#fa9841',
        dark: '#8D6138',
        description: values.colors['hwc-status-warning-border'],
      },
      {
        name: '$hwc-status-warning-background',
        newName: '$devui-warning-bg',
        light: '#fff3e8',
        dark: '#554434',
        description: values.colors['hwc-status-warning-background'],
      },
      {
        name: '$hwc-status-info-border',
        newName: '$devui-info-line',
        light: '#5e7ce0',
        dark: '#546BB7',
        description: values.colors['hwc-status-info-border'],
      },
      {
        name: '$hwc-status-info-background',
        newName: '$devui-info-bg',
        light: '#f2f5fc',
        dark: '#383D4F',
        description: values.colors['hwc-status-info-background'],
      },
      {
        name: '$hwc-status-success-border',
        newName: '$devui-success-line',
        light: '#50d4ab',
        dark: '#5D887D',
        description: values.colors['hwc-status-success-border'],
      },
      {
        name: '$hwc-status-success-background',
        newName: '$devui-success-bg',
        light: '#edfff9',
        dark: '#304642',
        description: values.colors['hwc-status-success-background'],
      },
      {
        name: '$hwc-feedback-overlay-background',
        newName: '$devui-feedback-overlay-bg',
        light: '#464d6e',
        dark: '#4C4C4C',
        description: values.colors['hwc-feedback-overlay-background'],
      },
      {
        name: '$hwc-feedback-overlay-font-color',
        newName: '$devui-feedback-overlay-text',
        light: '#dfe1e6',
        dark: '#DFE1E6',
        description: values.colors['hwc-feedback-overlay-font-color'],
      },
      {
        name: '$color-bg-primary',
        newName: '$devui-primary',
        light: '#f66f6a',
        dark: '#F66F6A',
        description: values.colors['color-bg-primary'],
      },
      {
        name: '$color-bg-primary-hover',
        newName: '$devui-primary-hover',
        light: '#ff8b87',
        dark: '#FF8B87',
        description: values.colors['color-bg-primary-hover'],
      },
      {
        name: '$color-bg-primary-active',
        newName: '$devui-primary-active',
        light: '#de504e',
        dark: '#DE504E',
        description: values.colors['color-bg-primary-active'],
      },
      {
        name: '$hwc-drop-down-search',
        newName: '$devui-embed-search-bg',
        light: '#f2f5fc',
        dark: '#F2F5FC',
        description: values.colors['hwc-drop-down-search'],
      },
      {
        name: '$hwc-drop-down-search-hover',
        newName: '$devui-embed-search-bg-hover',
        light: '#eef0f5',
        dark: '#EEF0F5',
        description: values.colors['hwc-drop-down-search-hover'],
      },
      { name: '$disabled-bg', newName: '$devui-disabled-bg', light: '#f5f5f6', dark: '#3d3e44', description: values.colors['disabled-bg'] },
      {
        name: '$disabled-border',
        newName: '$devui-disabled-line',
        light: '#dfe1e6',
        dark: '#505153',
        description: values.colors['disabled-border'],
      },
      {
        name: '$disabled-content',
        newName: '$devui-disabled-text',
        light: '#adb0b8',
        dark: '#7D7D7D',
        description: values.colors['disabled-content'],
      },
    ];

    this.setDataList();
  }

  setDataList() {
    const currentDataList = this.activeTab === 'tab1' ? 'colorSource' : 'colors';
    const result = [];
    this.catalogs.forEach((catalog, catalogIndex) => {
      result.push(catalog);
      if (catalog.expand && !this.catalogs[catalogIndex + 1]?.hasOwnProperty('description')) {
        const insertItems = this[currentDataList].filter((color) => color.type === catalog.type);
        result.push(...insertItems);
      }
    });
    this.catalogs = result;
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
