import { TemplateRef } from '@angular/core';

export type CategorySearchTagType = 'radio' | 'checkbox' | 'dateRange' | 'label' | 'textInput' | 'numberRange' | 'treeSelect' | 'keyword';

export interface ITagOption {
  /**
   * 选项，label和color默认都会取对应的 filterKey 和 colorKey，如未设置取默认值
   */
  label?: string; // 通用默认属性，用于设置分类名称
  color?: string; // label 专用，用于设置标签颜色
  [propName: string]: any;
}

/**
 * 候选tag数据配置项
 */
export interface ICategorySearchTagItem {
  /**
   * 搜索字段，tag的键，用于区分不同的分类，需要唯一
   */
  field: string;
  /**
   * tag 键的显示值
   */
  label: string;
  /**
   * 配置项可生产的tag类型
   */
  type?: CategorySearchTagType;
  /**
   * 配置项所属的分组
   */
  group?: string;
  /**
   * tag 值的选择项数据
   */
  options?: Array<ITagOption>;
  /**
   * 用于显示的 tag 值的键值，如未设置默认取label
   */
  filterKey?: string | 'label';
  /**
   * 用于显示的label类型中色值的键值，如未设置默认取color
   */
  colorKey?: 'color';
  /**
   * 自定义下拉模板的展示内容
   */
  customTemplate?: TemplateRef<any>;
  /**
   * 已选中值
   */
  value?: {
    label?: string;
    value?: string | ITagOption | Array<ITagOption | number | string | Date>;
    cache?: string | ITagOption | Array<ITagOption | number | string | Date>;
    [propName: string]: any;
  };
  [propName: string]: any;
}

export interface SelectedTagsEvent {
  selectedTags: Array<ICategorySearchTagItem>;
  currentChangeTag: ICategorySearchTagItem;
  operation: 'add' | 'delete' | 'clear';
}

export interface CreateFilterEvent {
  name: string;
  selectedTags: Array<ICategorySearchTagItem>;
  keyword: string;
}

export interface SearchEvent {
  selectedTags: Array<ICategorySearchTagItem>;
  searchKey: string;
}

export interface SearchConfig {
  keyword?: boolean;
  keywordDescription?: (searchKey: string) => string;
  field?: boolean;
  fieldDescription?: (label: string) => string;
  category?: boolean;
  categoryDescription?: string;
}

export const ALLOWED_SEARCH_FIELD_TYPES = ['radio', 'checkbox', 'label'];

export const COLORS = [
  '#f2f5fc',
  '#e9edfa',
  '#beccfa',
  '#96adfa',
  '#7693f5',
  '#5e7ce0',
  '#526ecc',
  '#465eb8',
  '#3c51a6',
  '#344899',
  '#2a3c85',
  '#ebf6ff',
  '#d1ebff',
  '#b8e0ff',
  '#9ed5ff',
  '#85caff',
  '#6cbfff',
  '#4ea6e6',
  '#3590cc',
  '#207ab3',
  '#0f6999',
  '#035880',
  '#edfff9',
  '#cffcee',
  '#acf2dc',
  '#8be8cb',
  '#6ddebb',
  '#50d4ab',
  '#3ac295',
  '#27b080',
  '#169e6c',
  '#088c58',
  '#007a45',
  '#f0ffe6',
  '#e5ffd4',
  '#d8fcc0',
  '#c5f2a7',
  '#b3e890',
  '#a6dd82',
  '#92cc68',
  '#7eba50',
  '#6ca83b',
  '#5e9629',
  '#518519',
  '#fffbf0',
  '#fff1c2',
  '#ffe794',
  '#ffdc66',
  '#ffd138',
  '#fac20a',
  '#e3aa00',
  '#cc9600',
  '#b58200',
  '#9e6f00',
  '#875c00',
  '#fff3e8',
  '#ffe1c7',
  '#ffd0a6',
  '#ffbf85',
  '#ffad63',
  '#fa9841',
  '#e37d29',
  '#cc6414',
  '#b54e04',
  '#9e3f00',
  '#873400',
  '#ffeeed',
  '#ffd5d4',
  '#ffbcba',
  '#ffa4a1',
  '#ff8b87',
  '#f66f6a',
  '#de504e',
  '#c73636',
  '#b02121',
  '#991111',
  '#820404',
  '#ffedf3',
  '#ffd4e3',
  '#ffbad2',
  '#ffa1c2',
  '#fc86b0',
  '#f3689a',
  '#db4d83',
  '#c4356e',
  '#ad215b',
  '#96114d',
  '#800440',
  '#f5f0ff',
  '#e7d9ff',
  '#d8c2ff',
  '#caabff',
  '#bc94ff',
  '#a97af8',
  '#8a5ce0',
  '#6f42c9',
  '#572db3',
  '#3f1a9c',
  '#2a0c85',
];
