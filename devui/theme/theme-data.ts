import { Theme } from './theme';
export const devuiLightTheme: Theme = new Theme({
  id: 'devui-light-theme',
  name: 'Light Mode',
  cnName: '浅色主题',
  data: {
    // 基础变量
    'devui-global-bg': '#f3f6f8',
    'devui-global-bg-normal': '#ffffff',
    'devui-base-bg': '#ffffff',
    'devui-base-bg-dark': '#333854',
    'devui-brand': '#5e7ce0',
    'devui-brand-foil': '#859bff',
    'devui-brand-hover': '#7693f5',
    'devui-brand-active': '#526ecc',
    'devui-brand-active-focus': '#344899',
    'devui-contrast': '#c7000b',
    'devui-text': '#252b3a',
    'devui-text-weak': '#575d6c',
    'devui-aide-text': '#8a8e99',
    'devui-aide-text-stress': '#575d6c',
    'devui-placeholder': '#8a8e99',
    'devui-light-text': '#ffffff',
    'devui-dark-text': '#252b3a',
    'devui-link': '#526ecc',
    'devui-link-active': '#526ecc',
    'devui-link-light': '#96adfa',
    'devui-link-light-active': '#beccfa',
    'devui-line': '#adb0b8',
    'devui-dividing-line': '#dfe1e6',
    'devui-block': '#ffffff',
    'devui-area': '#f8f8f8',
    'devui-danger': '#f66f6a',
    'devui-warning': '#fac20a',
    'devui-waiting': '#9faad7',
    'devui-success': '#50d4ab',
    'devui-info': '#5e7ce0',
    'devui-initial': '#e9edfa',
    'devui-unavailable': '#f5f5f6',
    'devui-shadow': 'rgba(0, 0, 0, 0.2)',
    'devui-light-shadow': 'rgba(0, 0, 0, 0.1)',
    // 图标
    'devui-icon-text': '#252b3a',
    'devui-icon-bg': '#ffffff',
    'devui-icon-fill': '#d3d5d9',
    'devui-icon-fill-hover': '#adb5ce',
    'devui-icon-fill-active': '#5e7ce0',
    'devui-icon-fill-active-hover': '#526ecc',
    // 表单
    'devui-form-control-line': '#adb0b8',
    'devui-form-control-line-hover': '#575d6c',
    'devui-form-control-line-active': '#5e7ce0',
    'devui-form-control-line-active-hover': '#344899',
    'devui-list-item-active-bg': '#5e7ce0',
    'devui-list-item-active-text': '#ffffff',
    'devui-list-item-active-hover-bg': '#526ecc',
    'devui-list-item-hover-bg': '#f2f5fc',
    'devui-list-item-hover-text': '#526ecc',
    'devui-list-item-selected-bg': '#e9edfa',
    'devui-list-item-strip-bg': '#f2f5fc',
    // 禁用
    'devui-disabled-bg': '#f5f5f6',
    'devui-disabled-line': '#dfe1e6',
    'devui-disabled-text': '#adb0b8',
    'devui-primary-disabled': '#beccfa',
    'devui-icon-fill-active-disabled': '#beccfa',
    // 特殊背景色
    'devui-label-bg': '#eef0f5',
    'devui-connected-overlay-bg': '#ffffff',
    'devui-connected-overlay-line': '#526ecc',
    'devui-fullscreen-overlay-bg': '#ffffff',
    'devui-feedback-overlay-bg': '#464d6e',
    'devui-feedback-overlay-text': '#dfe1e6',
    'devui-embed-search-bg': '#f2f5fc',
    'devui-embed-search-bg-hover': '#eef0f5',
    'devui-float-block-shadow': 'rgba(94, 124, 224, 0.3)',
    'devui-highlight-overlay': 'rgba(255, 255, 255, 0.8)',
    'devui-range-item-hover-bg': '#e9edfa',
    // 按钮
    'devui-primary': '#5e7ce0',
    'devui-primary-hover': '#7693f5',
    'devui-primary-active': '#344899',
    'devui-contrast-hover': '#d64a52',
    'devui-contrast-active': '#b12220',
    // 状态
    'devui-danger-line': '#f66f6a',
    'devui-danger-bg': '#ffeeed',
    'devui-warning-line': '#fa9841',
    'devui-warning-bg': '#fff3e8',
    'devui-info-line': '#5e7ce0',
    'devui-info-bg': '#f2f5fc',
    'devui-success-line': '#50d4ab',
    'devui-success-bg': '#edfff9',
    'devui-primary-line': '#5e7ce0',
    'devui-primary-bg': '#f2f5fc',
    'devui-default-line': '#5e7ce0',
    'devui-default-bg': '#f3f6f8',
    // 字体设置相关
    'devui-font-size': '12px',
    'devui-font-size-card-title': '14px',
    'devui-font-size-page-title': '16px',
    'devui-font-size-modal-title': '18px',
    'devui-font-size-price': '20px',
    'devui-font-size-data-overview': '24px',
    'devui-font-size-icon': '16px',
    'devui-font-size-sm': '12px',
    'devui-font-size-md': '12px',
    'devui-font-size-lg': '14px',
    'devui-font-title-weight': 'bold',
    'devui-font-content-weight': 'normal',
    'devui-line-height-base': '1.5',
    // 圆角
    'devui-border-radius': '2px',
    'devui-border-radius-feedback': '4px',
    'devui-border-radius-card': '6px',
    // 阴影
    'devui-shadow-length-base': '0 1px 4px 0',
    'devui-shadow-length-slide-left': '-2px 0 8px 0',
    'devui-shadow-length-slide-right': '2px 0 8px 0',
    'devui-shadow-length-connected-overlay': '0 2px 8px 0',
    'devui-shadow-length-hover': '0 4px 16px 0',
    'devui-shadow-length-feedback-overlay': '0 4px 16px 0',
    'devui-shadow-fullscreen-overlay': '0 8px 40px 0',
    // 动效
    'devui-animation-duration-slow': '300ms',
    'devui-animation-duration-base': '200ms',
    'devui-animation-duration-fast': '100ms',
    'devui-animation-ease-in': 'cubic-bezier(0.5, 0, 0.84, 0.25)',
    'devui-animation-ease-out': 'cubic-bezier(0.16, 0.75, 0.5, 1)',
    'devui-animation-ease-in-out': 'cubic-bezier(0.5, 0.05, 0.5, 0.95)',
    'devui-animation-ease-in-smooth': 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    'devui-animation-linear': 'cubic-bezier(0, 0, 1, 1)',
    // zIndex
    'devui-z-index-full-page-overlay': '1080',
    'devui-z-index-pop-up': '1060',
    'devui-z-index-dropdown': '1052',
    'devui-z-index-modal': '1050',
    'devui-z-index-drawer': '1040',
    'devui-z-index-framework': '1000'
  },
  isDark: false,
});
export const devuiGreenTheme: Theme = new Theme({
  id: 'avenueui-green-theme',
  name: 'Green - Light Mode',
  cnName: '绿色主题',
  data: Object.assign({}, devuiLightTheme.data, {
    'devui-global-bg': '#f3f8f7',
    'devui-brand': '#3DCCA6',
    'devui-brand-foil': '#7fdac1',
    'devui-brand-hover': '#6DDEBB',
    'devui-brand-active': '#07c693',
    'devui-brand-active-focus': '#369676',
    'devui-link': '#07c693',
    'devui-link-active': '#07c693',
    'devui-link-light': '#96fac8',
    'devui-link-light-active': '#befade',
    'devui-info': '#079CCD',
    'devui-initial': '#CCCCCC',
    'devui-icon-fill-active': '#3DCCA6',
    'devui-icon-fill-active-hover': '#07c693',
    'devui-form-control-line-active': '#3DCCA6',
    'devui-form-control-line-active-hover': '#2EB28A',
    'devui-list-item-active-bg': '#3DCCA6',
    'devui-list-item-active-hover-bg': '#07c693',
    'devui-list-item-hover-bg': '#f3fef9',
    'devui-list-item-hover-text': '#07c693',
    'devui-list-item-selected-bg': '#f3fef9',
    'devui-list-item-strip-bg': '#f3fef9',
    'devui-connected-overlay-line': '#07c693',
    'devui-embed-search-bg': '#f3fef9',
    'devui-float-block-shadow': 'rgba(94, 224, 181, 0.3)',
    'devui-primary': '#3DCCA6',
    'devui-primary-hover': '#6DDEBB',
    'devui-primary-active': '#369676',
    'devui-info-line': '#0486b1',
    'devui-info-bg': '#e3f0f5',
    'devui-success-line': '#50d492',
    'devui-success-bg': '#edfff9',
    'devui-primary-line': '#3DCCA6',
    'devui-primary-bg': '#f3fef9',
    'devui-default-line': '#3DCCA6',
    'devui-default-bg': '#f3f8f7',
    'devui-primary-disabled': '#c5f0e5',
    'devui-icon-fill-active-disabled': '#c5f0e5',
    'devui-range-item-hover-bg': '#d8f9ea',
  }),
  extends: 'devui-light-theme',
  isDark: false,
});
export const devuiDarkTheme: Theme = new Theme({
  id: 'devui-dark-theme',
  name: 'Dark Mode',
  cnName: '深色主题',
  data: {
    'devui-global-bg': '#202124',
    'devui-global-bg-normal': '#202124',
    'devui-base-bg': '#2E2F31',
    'devui-base-bg-dark': '#2e2f31',
    'devui-brand': '#5e7ce0',
    'devui-brand-foil': '#313a61',
    'devui-brand-hover': '#425288',
    'devui-brand-active': '#526ecc',
    'devui-brand-active-focus': '#344899',
    'devui-contrast': '#C7000B',
    'devui-text': '#E8E8E8',
    'devui-text-weak': '#A0A0A0',
    'devui-aide-text': '#909090',
    'devui-aide-text-stress': '#A0A0A0',
    'devui-placeholder': '#8A8A8A',
    'devui-light-text': '#ffffff',
    'devui-dark-text': '#252b3a',
    'devui-link': '#526ECC',
    'devui-link-active': '#344899',
    'devui-link-light': '#96adfa',
    'devui-link-light-active': '#beccfa',
    'devui-line': '#505153',
    'devui-dividing-line': '#3D3E40',
    'devui-block': '#606061',
    'devui-area': '#34363A',
    'devui-danger': '#f66f6a',
    'devui-warning': '#fac20a',
    'devui-waiting': '#5e6580',
    'devui-success': '#50d4ab',
    'devui-info': '#5e7ce0',
    'devui-initial': '#64676e',
    'devui-unavailable': '#5b5b5c',
    'devui-shadow': 'rgba(17, 18, 19, 0.4)',
    'devui-light-shadow': 'rgba(17, 18, 19, 0.5)',
    // 图标
    'devui-icon-text': '#E8E8E8',
    'devui-icon-bg': '#2E2F31',
    'devui-icon-fill': '#606061',
    'devui-icon-fill-hover': '#73788a',
    'devui-icon-fill-active': '#5e7ce0',
    'devui-icon-fill-active-hover': '#526ecc',
    // 表单
    'devui-form-control-line': '#505153',
    'devui-form-control-line-hover': '#909090',
    'devui-form-control-line-active': '#5e7ce0',
    'devui-form-control-line-active-hover': '#344899',
    'devui-list-item-active-bg': '#5e7ce0',
    'devui-list-item-active-text': '#ffffff',
    'devui-list-item-active-hover-bg': '#526ecc',
    'devui-list-item-hover-bg': '#383838',
    'devui-list-item-hover-text': '#526ecc',
    'devui-list-item-selected-bg': '#454545',
    'devui-list-item-strip-bg': '#383838',
    // 禁用
    'devui-disabled-bg': '#3D3E44',
    'devui-disabled-line': '#505153',
    'devui-disabled-text': '#7D7D7D',
    'devui-primary-disabled': '#2B3458',
    'devui-icon-fill-active-disabled': '#2B3458',
    // 特殊背景色
    'devui-label-bg': '#46443F',
    'devui-connected-overlay-bg': '#2F2F2F',
    'devui-connected-overlay-line': '#526ecc',
    'devui-fullscreen-overlay-bg': '#2E2F31',
    'devui-feedback-overlay-bg': '#4C4C4C',
    'devui-feedback-overlay-text': '#DFE1E6',
    'devui-embed-search-bg': '#383838',
    'devui-embed-search-bg-hover': '#3D3E40',
    'devui-float-block-shadow': 'rgba(94, 124, 224, 0.3)',
    'devui-highlight-overlay': 'rgba(255, 255, 255, 0.1)',
    'devui-range-item-hover-bg': '#454545',
    // 按钮
    'devui-primary': '#5e7ce0',
    'devui-primary-hover': '#425288',
    'devui-primary-active': '#344899',
    'devui-contrast-hover': '#D64A52',
    'devui-contrast-active': '#B12220',
    // 状态
    'devui-danger-line': '#985C5A',
    'devui-danger-bg': '#4B3A39',
    'devui-warning-line': '#8D6138',
    'devui-warning-bg': '#554434',
    'devui-info-line': '#546BB7',
    'devui-info-bg': '#383D4F',
    'devui-success-line': '#5D887D',
    'devui-success-bg': '#304642',
    'devui-primary-line': '#546BB7',
    'devui-primary-bg': '#383D4F',
    'devui-default-line': '#5e7ce0',
    'devui-default-bg': '#383838',
  },
  extends: 'devui-light-theme',
  isDark: true,
});
export const avenueuiGreenDarkTheme: Theme = new Theme({
  id: 'avenueui-green-dark-theme',
  name: 'Green - Dark Mode',
  cnName: '绿色深色主题',
  data: Object.assign({}, devuiDarkTheme.data, {
    'devui-brand': '#3DCCA6',
    'devui-brand-foil': '#395e54',
    'devui-brand-hover': '#4c9780',
    'devui-brand-active': '#07c693',
    'devui-brand-active-focus': '#297058',
    'devui-link': '#07c693',
    'devui-link-active': '#08a57b',
    'devui-info': '#046788',
    'devui-initial': '#64676e',
    'devui-icon-fill-active': '#3DCCA6',
    'devui-icon-fill-active-hover': '#07c693',
    'devui-form-control-line-active': '#3DCCA6',
    'devui-form-control-line-active-hover': '#297058',
    'devui-list-item-active-bg': '#3DCCA6',
    'devui-list-item-active-hover-bg': '#07c693',
    'devui-list-item-hover-text': '#07c693',
    'devui-connected-overlay-line': '#07c693',
    'devui-embed-search-bg': '#3f4241',
    'devui-float-block-shadow': 'rgba(94, 224, 181, 0.3)',
    'devui-primary': '#3DCCA6',
    'devui-primary-hover': '#6DDEBB',
    'devui-primary-active': '#369676',
    'devui-info-line': '#035e7c',
    'devui-info-bg': '#383c3d',
    'devui-primary-line': '#3DCCA6',
    'devui-primary-bg': '#3f4241',
    'devui-default-line': '#3DCCA6',
    'devui-default-bg': '#383838',
    'devui-primary-disabled': '#28544B',
    'devui-icon-fill-active-disabled': '#28544B',
  }),
  extends: 'devui-dark-theme',
  isDark: true,
});
