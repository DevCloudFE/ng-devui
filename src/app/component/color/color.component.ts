import { Component, OnInit } from '@angular/core';
import { TableExpandConfig } from 'ng-devui/data-table';

export const colorSource = [
  { type: 'basic', name: '$devui-global-bg', light: '#f3f6f8', dark: '#202124', description: '全局带底色背景' },
  { type: 'basic', name: '$devui-global-bg-normal', light: '#ffffff', dark: '#202124', description: '全局白色背景' },
  { type: 'basic', name: '$devui-base-bg', light: '#ffffff', dark: '#2E2F31', description: '基础区块背景白色' },
  { type: 'basic', name: '$devui-base-bg-dark', light: '#333854', dark: '#2e2f31', description: '基础区块背景深色(固定)' },
  { type: 'basic', name: '$devui-brand', light: '#5e7ce0', dark: '#5e7ce0', description: '品牌色' },
  { type: 'basic', name: '$devui-brand-foil', light: '#859bff', dark: '#313a61', description: '品牌色辅助色、正衬色' },
  { type: 'basic', name: '$devui-brand-hover', light: '#7693f5', dark: '#425288', description: '品牌色高亮色（加亮）' },
  { type: 'basic', name: '$devui-brand-active', light: '#526ecc', dark: '#526ecc', description: '品牌色激活色（加深）' },
  { type: 'basic', name: '$devui-brand-active-focus', light: '#344899', dark: '#344899', description: '品牌色焦点色（重度加深）' },
  { type: 'basic', name: '$devui-contrast', light: '#f66f6a', dark: '#E41F2B', description: '品牌色撞色、对比色、反衬色、第二品牌色' },
  { type: 'basic', name: '$devui-text', light: '#252b3a', dark: '#E8E8E8', description: '正文文本' },
  { type: 'basic', name: '$devui-text-weak', light: '#575d6c', dark: '#A0A0A0', description: '弱化的正文信息（手风琴子项，表头）' },
  { type: 'basic', name: '$devui-aide-text', light: '#8a8e99', dark: '#909090', description: '辅助文本、帮助信息（面包屑）' },
  { type: 'basic', name: '$devui-aide-text-stress', light: '#575d6c', dark: '#A0A0A0', description: '辅助文本、帮助信息里的强调色' },
  { type: 'basic', name: '$devui-placeholder', light: '#8a8e99', dark: '#646464', description: '占位符' },
  { type: 'basic', name: '$devui-light-text', light: '#ffffff', dark: '#ffffff', description: '有色深色背景下字体颜色（固定）' },
  { type: 'basic', name: '$devui-dark-text', light: '#252b3a', dark: '#252b3a', description: '有色浅色背景下字体颜色（固定）' },
  { type: 'basic', name: '$devui-link', light: '#526ecc', dark: '#526ECC', description: '链接文本颜色' },
  { type: 'basic', name: '$devui-link-active', light: '#344899', dark: '#344899', description: '链接文本悬停/激活颜色' },
  { type: 'basic', name: '$devui-link-light', light: '#96adfa', dark: '#96adfa', description: '深色背景下链接文本颜色' },
  { type: 'basic', name: '$devui-link-light-active', light: '#beccfa', dark: '#beccfa', description: '深色背景下链接文本悬停/激活颜色' },
  { type: 'basic', name: '$devui-line', light: '#adb0b8', dark: '#505153', description: '边框分割线，仅用于边框' },
  { type: 'basic', name: '$devui-dividing-line', light: '#dfe1e6', dark: '#3D3E40', description: '内容分割线，用于内容之间的分割' },
  { type: 'basic', name: '$devui-block', light: '#ffffff', dark: '#606061', description: '大面积的不可折叠区块的背景色（例如顶部导航背景色）' },
  { type: 'basic', name: '$devui-area', light: '#f8f8f8', dark: '#34363A', description: '可折叠区块的背景色（展开区域颜色）' },
  { type: 'basic', name: '$devui-danger', light: '#f66f6a', dark: '#f66f6a', description: '失败、错误、告警' },
  { type: 'basic', name: '$devui-warning', light: '#fac20a', dark: '#fac20a', description: '警告、需注意类型提示' },
  { type: 'basic', name: '$devui-waiting', light: '#9faad7', dark: '#5e6580', description: '等待中' },
  { type: 'basic', name: '$devui-success', light: '#50d4ab', dark: '#50d4ab', description: '成功、正确' },
  { type: 'basic', name: '$devui-info', light: '#5e7ce0', dark: '#5e7ce0', description: '通知、一般提示、执行中' },
  { type: 'basic', name: '$devui-initial', light: '#e9edfa', dark: '#64676e', description: '初始化、未执行' },
  { type: 'basic', name: '$devui-unavailable', light: '#f5f5f6', dark: '#5b5b5c', description: '不可用、禁用状态' },
  { type: 'basic', name: '$devui-shadow', light: 'rgba(0, 0, 0, 0.2)', dark: 'rgba(17, 18, 19, 0.4)', description: '阴影色' },
  { type: 'basic', name: '$devui-light-shadow', light: 'rgba(0, 0, 0, 0.1)', dark: 'rgba(17, 18, 19, 0.5)', description: '弱化阴影色' },

  { type: 'icon', name: '$devui-icon-text', light: '#252b3a', dark: '#E8E8E8', description: '文字图标颜色，同 正文颜色' },
  { type: 'icon', name: '$devui-icon-bg', light: '#ffffff', dark: '#2E2F31', description: ' svg图标 背景色' },
  { type: 'icon', name: '$devui-icon-fill', light: '#d3d5d9', dark: '#606061', description: ' svg图标 灰色填充色' },
  { type: 'icon', name: '$devui-icon-fill-hover', light: '#adb5ce', dark: '#73788a', description: 'svg图标 灰色填充色悬停反馈色' },
  { type: 'icon', name: '$devui-icon-fill-active', light: '#5e7ce0', dark: '#5e7ce0', description: 'svg图标 高亮填充色（激活状态）' },
  { type: 'icon', name: '$devui-icon-fill-active-hover', light: '#526ecc', dark: '#526ecc', description: 'svg图标 高亮填充色悬停反馈色' },

  { type: 'form', name: '$devui-form-control-line', light: '#adb0b8', dark: '#505153', description: '表单控件边框色，同 边框分割线' },
  { type: 'form', name: '$devui-form-control-line-hover', light: '#575d6c', dark: '#909090', description: '表单控件边框悬停反馈色' },
  { type: 'form', name: '$devui-form-control-line-active', light: '#5e7ce0', dark: '#5e7ce0', description: '表单控件边框激活色，用于获得焦点' },
  { type: 'form', name: '$devui-form-control-line-active-hover', light: '#344899', dark: '#344899', description: '表单控件边框激活色，用于获得焦点且悬停' },

  { type: 'list', name: '$devui-list-item-active-bg', light: '#5e7ce0', dark: '#5e7ce0', description: '列表类型单选选中背景' },
  {
    type: 'list', name: '$devui-list-item-active-text', light: '#ffffff', dark: '#ffffff',
    description: '列表类型单选选中背景搭配文本，同 有色深色背景下字体颜色（固定）'
  },
  { type: 'list', name: '$devui-list-item-active-hover-bg', light: '#526ecc', dark: '#526ecc', description: '列表类型单选选中背景悬停反馈色（仅用于分页等）' },
  { type: 'list', name: '$devui-list-item-hover-bg', light: '#f2f5fc', dark: '#383838', description: '列表类型普通选项悬停背景' },
  { type: 'list', name: '$devui-list-item-hover-text', light: '#526ecc', dark: '#526ecc', description: '列表类型普通选项悬停背景搭配文本' },
  { type: 'list', name: '$devui-list-item-selected-bg', light: '#f2f5fc', dark: '#454545', description: '列表类型多选被选中的行色，仅用于表格类' },
  { type: 'list', name: '$devui-list-item-strip-bg', light: '#f2f5fc', dark: '#383838', description: '列表类型斑马纹色，仅用于表格类' },

  { type: 'disable', name: '$devui-disabled-bg', light: '#f5f5f6', dark: '#3D3E44', description: 'disabled背景颜色' },
  { type: 'disable', name: '$devui-disabled-line', light: '#dfe1e6', dark: '#505153', description: 'disabled边框颜色' },
  { type: 'disable', name: '$devui-disabled-text', light: '#adb0b8', dark: '#505153', description: 'disabled文字颜色' },

  { type: 'specialBackground', name: '$devui-label-bg', light: '#eef0f5', dark: '#46443F', description: '默认标签化选项背景色' },
  { type: 'specialBackground', name: '$devui-connected-overlay-bg', light: '#ffffff', dark: '#2F2F2F', description: '有连接点的弹出菜单层背景色' },
  { type: 'specialBackground', name: '$devui-connected-overlay-line', light: '#526ecc', dark: '#526ecc', description: '有连接点的弹出菜单层边框色' },
  {
    type: 'specialBackground', name: '$devui-fullscreen-overlay-bg', light: '#ffffff', dark: '#4C4C4C',
    description: '全屏类型的弹出内容层背景色（模态弹窗）'
  },
  {
    type: 'specialBackground', name: '$devui-feedback-overlay-bg', light: '#464d6e', dark: '#4C4C4C',
    description: '信息提示反馈类型的漂浮层背景色（toast、popover）'
  },
  {
    type: 'specialBackground', name: '$devui-feedback-overlay-text', light: '#dfe1e6', dark: '#DFE1E6',
    description: '信息提示反馈类型的漂浮层背景色搭配文本色'
  },
  { type: 'specialBackground', name: '$devui-embed-search-bg', light: '#f2f5fc', dark: '#383838', description: '被嵌套的无边框搜索框背景色' },
  {
    type: 'specialBackground', name: '$devui-embed-search-bg-hover', light: '#eef0f5', dark: '#3D3E40',
    description: '被嵌套的无边框搜索框背景色'
  },
  {
    type: 'specialBackground', name: '$devui-float-block-shadow', light: 'rgba(94, 124, 224, 0.3)', dark: 'rgba(94, 124, 224, 0.3)',
    description: '特殊浮层背景色（待修正）'
  },
  {
    type: 'specialBackground', name: '$devui-highlight-overlay', light: 'rgba(255, 255, 255, 0.8)', dark: 'rgba(255, 255, 255, 0.1)',
    description: '局部半透明全局浮层背景色（比如底部）'
  },

  { type: 'button', name: '$devui-primary', light: '#5e7ce0', dark: '#5e7ce0', description: '主要按钮，同品牌色' },
  { type: 'button', name: '$devui-primary-hover', light: '#7693f5', dark: '#425288', description: '主要按钮悬停' },
  { type: 'button', name: '$devui-primary-active', light: '#344899', dark: '#344899', description: '主要按钮激活' },
  { type: 'button', name: '$devui-contrast-hover', light: '#ff8b87', dark: '#884946', description: '突出按钮悬停' },
  { type: 'button', name: '$devui-contrast-active', light: '#de504e', dark: '#de504e', description: '突出按钮激活' },

  { type: 'status', name: '$devui-danger-line', light: '#f66f6a', dark: '#985C5A', description: '失败边框' },
  { type: 'status', name: '$devui-danger-bg', light: '#ffeeed', dark: '#4B3A39', description: '失败底色' },
  { type: 'status', name: '$devui-warning-line', light: '#fa9841', dark: '#8D6138', description: '警告边框' },
  { type: 'status', name: '$devui-warning-bg', light: '#fff3e8', dark: '#554434', description: '警告底色' },
  { type: 'status', name: '$devui-info-line', light: '#5e7ce0', dark: '#546BB7', description: '通知边框' },
  { type: 'status', name: '$devui-info-bg', light: '#f2f5fc', dark: '#383D4F', description: '通知底色' },
  { type: 'status', name: '$devui-success-line', light: '#50d4ab', dark: '#5D887D', description: '成功边框' },
  { type: 'status', name: '$devui-success-bg', light: '#edfff9', dark: '#304642', description: '成功底色' },
  { type: 'status', name: '$devui-primary-line', light: '#5e7ce0', dark: '#546BB7', description: '主要边框' },
  { type: 'status', name: '$devui-primary-bg', light: '#f2f5fc', dark: '#383D4F', description: '主要底色' },
  { type: 'status', name: '$devui-default-line', light: '#5e7ce0', dark: '#5e7ce0', description: '默认边框' },
  { type: 'status', name: '$devui-default-bg', light: '#f3f6f8', dark: '#383838', description: '默认底色' },
];

export interface CatalogConfig {
  name: string;
  type: string;
  expand?: boolean;
  [propName: string]: any;
}

@Component({
  selector: 'd-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {
  headerExpandConfig: TableExpandConfig;
  catalogs: CatalogConfig[] = [
    { name: '基本变量', type: 'basic', expand: true, },
    { name: '图标', type: 'icon', expand: true },
    { name: '表单', type: 'form', expand: true },
    { name: '列表', type: 'list', expand: true },
    { name: '禁用', type: 'disable', expand: true, },
    { name: '特殊背景色', type: 'specialBackground', expand: true },
    { name: '按钮', type: 'button', expand: true },
    { name: '状态', type: 'status', expand: true },
  ];

  constructor() { }

  ngOnInit() {
    const result = [];
    this.catalogs.forEach((catalog) => {
      result.push(catalog);
      if (catalog.expand) {
        const insertItems = colorSource.filter(color => color.type === catalog.type);
        result.push(...insertItems);
      }
    });
    this.catalogs = result;
  }
  toggleExpand(rowItem, index) {
    rowItem.expand = !rowItem.expand;
    if (rowItem.expand) {
      const insertItems = colorSource.filter(color => color.type === rowItem.type);
      this.catalogs.splice(index + 1, 0, ...insertItems);
    } else {
      const itemLength = colorSource.filter(color => color.type === rowItem.type).length;
      this.catalogs.splice(index + 1, itemLength);
    }
  }
}
