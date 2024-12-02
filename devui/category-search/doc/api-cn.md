## 如何使用

在 module 中引入：

```ts
import { CategorySearchModule } from 'ng-devui/category-search';
```

页面中使用：

```html
<d-category-search></d-category-search>
```

### d-category-search 参数

| 参数                       | 类型                                                                                | 默认                                          | 说明                                                                                        | 跳转                                    |
| -------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------- |
| category                   | `ICategorySearchTagItem`                                                            | --                                            | 必选，传入分类搜索源数据                                                                    | [基本用法](demo#basic-usage)            |
| defaultSearchField         | `String[]`                                                                          | []                                            | 可选，配置输入关键字时可在哪些分类中筛选                                                    | [基本用法](demo#basic-usage)            |
| selectedTags               | `ICategorySearchTagItem`                                                            | --                                            | 可选，传入需要默认选中的分类数据                                                            | [基本用法](demo#basic-usage)            |
| placeholderText            | `string`                                                                            | --                                            | 可选，自定义搜索输入框占位文字                                                              | [基本用法](demo#basic-usage)            |
| ~~allowSave~~              | `boolean`                                                                           | true                                          | 可选，是否显示保存当前过滤的按钮                                                            | [基本用法](demo#basic-usage)            |
| ~~allowClear~~             | `boolean`                                                                           | true                                          | 可选，是否显示清除当前过滤的按钮                                                            | [基本用法](demo#basic-usage)            |
| ~~allowShowMore~~          | `boolean`                                                                           | <span style="white-space:nowrap">false</span> | 可选，是否显示当前过滤条件下拉列表的按钮                                                    | [大数据量优化展示](demo#auto-scroll)    |
| extendedConfig             | `ExtendedConfig`                                                                    | --                                            | 可选，配置右侧扩展按钮功能                                                                  | [自定义展示模板](demo#custom-template)  |
| showSearchCategory         | `boolean \| SearchConfig`                                                           | true                                          | 可选，是否显示搜索关键字下拉菜单                                                            | [自定义展示模板](demo##custom-template) |
| searchKey                  | `string`                                                                            | ''                                            | 可选，搜索框内的默认展示值                                                                  | [基本用法](demo#basic-usage)            |
| beforeTagChange            | `(tag, searchKey, operation) => boolean \| Promise<boolean> \| Observable<boolean>` | --                                            | 可选，改变标签前调用的方法，返回 boolean 类型，返回 false 可以阻止分类值改变                |                                         |
| toggleEvent                | `(dropdown, tag?, currentSelectTag?) => void`                                       | --                                            | 可选，已选分类的下拉菜单开关时调用的方法，可使用 return 阻止之后的默认方法执行              | [基本用法](demo#basic-usage)            |
| inputReadOnly              | `boolean`                                                                           | false                                         | 可选，限制是否可通过搜索框输入关键字搜索,`true`则无法输入关键字，仅可根据提供的分类数据筛选 |                                         |
| inputAutofocus             | `boolean`                                                                           | true                                          | 可选，是否允许自动聚焦搜索框，规避有滚动条场景下自动聚焦导致的位移                          |                                         |
| disabled                   | `boolean`                                                                           | false                                         | 可选，是否禁用分类搜索                                                                      |                                         |
| dropdownBoundary           | `boolean`                                                                           | false                                         | 可选，限制已选分类下拉菜单的左右边界，避免分类显示过长导致下拉菜单出现在组件范围以外        |                                         |
| tagMaxWidth                | `number`                                                                            | --                                            | 可选，单个过滤条件的最大宽度，超过则显示省略号，不设置则不限制                              | [大数据量优化展示](demo#auto-scroll)    |
| textConfig                 | `{keywordName: string, createFilter: string, filterTitle: string}`                  | --                                            | 可选，配置关键字分类名称、保存过滤器下拉窗口的文字内容                                      | [自定义展示模板](demo##custom-template) |
| toggleScrollToTail         | `boolean`                                                                           | false                                         | 可选，在有滚动条存在时初始化加载或选择过滤内容后自动滚动至最右侧，以便用户选择新的过滤内容  | [大数据量优化展示](demo#auto-scroll)    |
| filterNameRules            | `DValidateRules`                                                                    | false                                         | 可选，配置保存过滤器标题的校验规则，详细规则参见 ng-devui 库 form 组件                      | [基本用法](demo#basic-usage)            |
| categoryInGroup            | `boolean`                                                                           | false                                         | 可选，是否按组别显示分类下拉列表                                                            | [大数据量优化展示](demo#auto-scroll)    |
| groupOrderConfig           | `String[]`                                                                          | --                                            | 可选，配置组的排序                                                                          | [大数据量优化展示](demo#auto-scroll)    |
| customGroupNameTemplate    | `TemplateRef<any>`                                                                  | --                                            | 可选，自定义组名称显示模板                                                                  | [大数据量优化展示](demo#auto-scroll)    |
| customCategoryNameTemplate | `TemplateRef<any>`                                                                  | --                                            | 可选，自定义分类名称显示模板                                                                | [大数据量优化展示](demo#auto-scroll)    |
| showGlowStyle              | `boolean`                                                                           | true                                          | 可选，是否显示悬浮发光效果                                                                  |

### d-category-search 事件

| 事件               | 类型                              | 说明                                                         |
| ------------------ | --------------------------------- | ------------------------------------------------------------ |
| selectedTagsChange | `EventEmitter<SelectedTagsEvent>` | 分类数据变更时触发，返回值为当前选中的分类数据               |
| searchKeyChange    | `EventEmitter<String>`            | 搜索关键字变更时触发，返回值为输入框的绑定值                 |
| searchEvent        | `EventEmitter<SearchEvent>`       | 点击搜索按钮时触发，返回值为当前选中分类数据和搜索框中关键字 |
| createFilterEvent  | `EventEmitter<CreateFilterEvent>` | 点击保存按钮时触发，返回值为当前选中分类数据和搜索框中关键字 |
| clearAllEvent      | `EventEmitter<MouseEvent>`        | 点击清除按钮时触发，返回值为当前选中分类数据和搜索框中关键字 |

```ts
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
   * 配置项可生产的tag类型,目前支持七种类型，不设置类型时只能使用自定义模板，参见自定义示例'访问来源'
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
  colorKey?: string | 'color';
  /**
   * 自定义下拉模板的展示内容
   */
  customTemplate?: TemplateRef<any>;
  /**
   * 当前分类选中后是否可以删除
   */
  deletable?: boolean;
  /**
   * 已选中值
   */
  value?: {
    label: string; // 用于显示选中值，如果指定了 filterKey 则使用该值为属性名，例如 basic demo 中的状态
    value: string | ITagOption | Array<ITagOption | number | string | Date>; // 下拉列表的选择值
    cache: string | ITagOption | Array<ITagOption | number | string | Date>; // 下拉列表展开时用于重置选择值的缓存数据
  };
  /**
   * checkbox | label 类型是否显示全选
   */
  showSelectAll?: boolean;
  /**
   * dateRange 类型是否显示时分秒
   */
  showTime?: boolean;
  /**
   * dateRange 类型默认激活开始或者结束日期
   */
  activeRangeType?: 'start' | 'end';
  /**
   * textInput | numberRange 类型设置最大长度，numberRange 需传入对象分别设置左右
   */
  maxLength?: number | { left?: number; right?: number };
  /**
   * textInput | numberRange 类型设置占位符，numberRange 需传入对象分别设置左右
   */
  placeholder?: string | { left?: string; right?: string };
  /**
   * numberRange 步进值，需传入对象分别设置左右
   */
  step?: { left?: number; right?: number };
  /**
   * numberRange 最大值，需传入对象分别设置左右
   */
  max?: { left?: number; right?: number };
  /**
   * numberRange 最小值，需传入对象分别设置左右
   */
  min?: { left?: number; right?: number };
  /**
   * numberRange 限制输入的正则或正则字符串，需传入对象分别设置左右
   */
  reg?: { left?: RegExp | string; right?: RegExp | string };
  /**
   * numberRange 限制小数点后的位数，需传入对象分别设置左右
   */
  decimalLimit?: { left?: number; right?: number };
  /**
   * numberRange 校验方法，点击确定时执行，返回 true 通过
   */
  validateFunc?: (start: number, end: number, tag: ICategorySearchTagItem) => boolean;
  /**
   * treeSelect 类型是否为多选，并显示已选择列表
   */
  multiple?: boolean;
  /**
   * treeSelect 类型是否显示搜索框
   */
  searchable?: boolean;
  /**
   * treeSelect 类型设置搜索框占位符
   */
  searchPlaceholder?: string;
  /**
   * treeSelect 类型自定义搜索方法，参数为搜索关键字和 d-operable-tree 组件实例
   */
  searchFn?: (value: string, treeInstance: OperableTreeComponent) => boolean | Array<any>;
  /**
   * treeSelect 类型相关配置，请参考treeSelect组件API中同名配置
   */
  checkableRelation?: 'upward' | 'downward' | 'both' | 'none';
  treeNodeIdKey?: string;
  treeNodeChildrenKey?: string;
  treeNodeTitleKey?: string;
  disabledKey?: string;
  leafOnly?: boolean;
  iconParentOpen?: string;
  iconParentClose?: string;
  iconLeaf?: string;
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

export interface SelectedTagsEvent = {
  selectedTags: Array<ICategorySearchTagItem>;
  currentChangeTag: ICategorySearchTagItem;
  operation: 'add' | 'delete' | 'clear';
};

export interface CreateFilterEvent = {
  name: string;
  selectedTags: Array<ICategorySearchTagItem>;
  keyword: string;
};

export interface SearchEvent = {
  selectedTags: Array<ICategorySearchTagItem>;
  searchKey: string;
};

export interface SearchConfig {
  keyword?: boolean;
  keywordDescription?: ((searchKey: string) => string);
  field?: boolean;
  fieldDescription?: ((label: string) => string);
  category?: boolean;
  categoryDescription?: string;
  noCategoriesAvailableTip?: boolean;
  searchInputMaxLength?: number;
}

export interface TextConfig {
  keywordName?: string;
  createFilter?: string;
  filterTitle?: string;
  labelConnector?: string;
  noCategoriesAvailable?: string;
}

export interface ExtendedConfig {
  show?: boolean;
  clear?: {
    show?: boolean;
    disabled?: boolean;
    template?: TemplateRef<any>;
  };
  save?: {
    show?: boolean;
    disabled?: boolean;
    template?: TemplateRef<any>;
  };
  more?: {
    show?: boolean;
    disabled?: boolean;
    template?: TemplateRef<any>;
  };
  customTemplate?: TemplateRef<any>;
}

export type DValidateRules =
  | {
      validators?: DValidateRule[]; // 同步校验规则

      asyncValidators?: DAsyncValidateRule[]; // 异步校验规则

      asyncDebounceTime?: number; // 异步校验器debounceTime（单位ms），默认为300

      errorStrategy?: DValidationErrorStrategy; // error更新策略，默认为'dirty'

      message?: string; // 统一配置的message，如果你的某一条校验规则未配置message，将取统一message

      messageShowType?: 'popover' | 'text' | 'none'; // 消息自动显示策略（当前仅单个表单组件下生效），(popover | d-form-item容器内部显示 | 不显示)

      // 消息显示为popover时，设置popover的内容弹出方向，默认为['right', 'bottom']
      popPosition?: 'top' | 'right' | 'bottom' | 'left' | ('top' | 'right' | 'bottom' | 'left')[];
    }
  | DValidateRule[]; // 若只需设置同步校验规则，可传同步校验规则数组
```
