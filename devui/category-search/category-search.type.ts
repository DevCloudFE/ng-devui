import { TemplateRef } from '@angular/core';

export type CategorySearchTagType = 'radio' | 'checkbox' | 'dateRange' | 'label' | 'textInput' | 'numberRange' | 'treeSelect';
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
  type: CategorySearchTagType;
  /**
   * 配置项所属的分组
   */
  group?: string;
  /**
   * tag 值的选择项数据
   */
  options: Array<ITagOption>;
  /**
   * 用于显示的 tag 值的键值，如未设置默认取label
   */
  filterKey?: 'label';
  /**
   * 用于显示的label类型中色值的键值，如未设置默认取color
   */
  colorKey?: 'color';
  /**
  * 自定义下拉模板的展示内容
  */
  customTemplate: TemplateRef<any>;
  /**
   * 已选中值
   */
  value?: {
    label?: string;
    value: Array<ITagOption>;
    cache?: Array<ITagOption>;
  };
  [propName: string]: any;
}

export interface ITagOption {
  /**
   * 选项，label和color默认都会取对应的 filterKey 和 colorKey，如未设置取默认值
   */
  label?: string; // 通用默认属性，用于设置分类名称
  color?: string; // label 专用，用于设置标签颜色
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
