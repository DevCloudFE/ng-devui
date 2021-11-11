## How to use

Import into module

```ts
import { CategorySearchModule } from 'ng-devui/category-search';
```

In the page

```html
<d-category-search></d-category-search>
```

### d-category-search 参数

|        Parameter        |                                        Type                                         | Default | Description                                                                                                                                                                       |                       Jump to Demo                        |
| :---------------------: | :---------------------------------------------------------------------------------: | :-----: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------: |
|        category         |                              `ICategorySearchTagItem`                               |   --    | Required. The data of categories.                                                                                                                                                 |              [Basic usage](demo#basic-usage)              |
|   defaultSearchField    |                                     `String[]`                                      |   []    | Optional. Configure the categories that can be filtered when entering keywords.                                                                                                   |              [Basic usage](demo#basic-usage)              |
|      selectedTags       |                              `ICategorySearchTagItem`                               |   --    | Optional. The categories to be selected by default.                                                                                                                               |              [Basic usage](demo#basic-usage)              |
|        allowSave        |                                      `boolean`                                      |  true   | Optional. Whether to show save current filter button.                                                                                                                             |              [Basic usage](demo#basic-usage)              |
|       allowClear        |                                      `boolean`                                      |  true   | Optional. Whether to display the button for clearing the current filter.                                                                                                          |              [Basic usage](demo#basic-usage)              |
|      allowShowMore      |                                      `boolean`                                      |  false  | Optional. Whether to display the button in the drop-down list of the current filter criteria.                                                                                     | [Large-scale data display optimization](demo#auto-scroll) |
|   showSearchCategory    |                                      `boolean`                                      |  true   | Optional. Whether to display the search keyword drop-down list.                                                                                                                   |                                                           |
|        searchKey        |                                      `string`                                       |   ''    | Optional. Default value displayed in the search box.                                                                                                                              |              [Basic usage](demo#basic-usage)              |
|     beforeTagChange     | `(tag, searchKey, operation) => boolean \| Promise<boolean> \| Observable<boolean>` |   --    | Optional. Method called before changing the tag, returns the boolean type, and returns false to prevent the classification value from changing.                                   |                                                           |
|       toggleEvent       |                    `(dropdown, tag?, currentSelectTag?) => void`                    |   --    | Optional. Method called when the drop-down menu switch of the selected classification is enabled, which can be executed by the default method after being blocked by return.      |              [Basic usage](demo#basic-usage)              |
|      inputReadOnly      |                                      `boolean`                                      |  false  | Optional. Specifies whether to enter keywords in the search box. If it is `true`, you cannot enter keywords and can only filter data based on the provided classification data.   |              [Basic usage](demo#basic-usage)              |
|       tagMaxWidth       |                                      `number`                                       |   --    | Optional. Maximum width of a single filter criterion. If the width exceeds the value, an ellipsis is displayed. If this parameter is not set, no restriction is imposed.          |                                                           |
|   toggleScrollToTail    |                                      `boolean`                                      |  false  | Optional. When a scroll bar exists, the system automatically scrolls to the right after loading or filtering content is selected, so that users can select new filtering content. | [Large-scale data display optimization](demo#auto-scroll) |
|     filterNameRules     |                                  `DValidateRules`                                   |  false  | Optional. Configure the validation rule for saving the filter title. For details, see the form component in the ng-devui library.                                                 |              [Basic usage](demo#basic-usage)              |
|     categoryInGroup     |                                      `boolean`                                      |  false  | Optional. Indicates whether to display the category drop-down list by group.                                                                                                      | [Large-scale data display optimization](demo#auto-scroll) |
|    groupOrderConfig     |                                     `String[]`                                      |   --    | Optional. Configure the sorting of groups.                                                                                                                                        | [Large-scale data display optimization](demo#auto-scroll) |
| customGroupNameTemplate |                                 `TemplateRef<any>`                                  |   --    | Optional. Custom Group Name Display Template.                                                                                                                                     | [Large-scale data display optimization](demo#auto-scroll) |

### d-category-search 事件

| 事件               | 类型                              | 说明                                                                                                                         |
| ------------------ | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| selectedTagsChange | `EventEmitter<SelectedTagsEvent>` | Triggered when category data is changed. The returned value is the selected category data.                                   |
| searchKeyChange    | `EventEmitter<String>`            | Triggered when the search keyword is changed. The return value is the bound value of the text box.                           |
| searchEvent        | `EventEmitter<SearchEvent>`       | Triggered when the search button is clicked. The returned value is the selected category data and keyword in the search box. |
| createFilterEvent  | `EventEmitter<CreateFilterEvent>` | Triggered when the Save button is clicked. The returned value is the selected category data and keyword in the search box.   |
| clearAllEvent      | `EventEmitter<MouseEvent>`        | Triggered when the Clear button is clicked. The returned value is the selected category data and keyword in the search box.  |

```ts
export type CategorySearchTagType = 'radio' | 'checkbox' | 'dateRange' | 'label' | 'textInput' | 'numberRange' | 'treeSelect';
/**
 * Candidate tag data configuration items
 */
export interface ICategorySearchTagItem {
  /**
   * Search field, which is the key of a tag. It is used to distinguish different categories and must be unique.
   */
  field: string;
  /**
   * Display value of the tag key.
   */
  label: string;
  /**
   * Type of the tag that can be generated by the configuration item. Currently, seven types are supported. If no type is set, only the customized template can be used. For details, see the customized example of traffic sources.
   */
  type: CategorySearchTagType;
  /**
   * Group to which a configuration item belongs.
   */
  group?: string;
  /**
   * Option data of the tag value
   */
  options: Array<ITagOption>;
  /**
   * Specifies the key value of the tag value to be displayed. If this parameter is not set, the value of label is used by default.
   */
  filterKey?: 'label';
  /**
   * Key value of the color value in the label type. If this parameter is not set, the default value is color.
   */
  colorKey?: 'color';
  /**
   * Customize the content to be displayed in the drop-down list box.
   */
  customTemplate?: TemplateRef<any>;
  /**
   * Selected Value
   */
  value?: {
    value: Array<ITagOption>; // Selected value from the drop-down list box
    label: string; // Used to display the selected value, or the property name if filterKey is specified, such as the status in basic demo.
    cache: Array<ITagOption>; // Cached data used to reset the selection value when the drop-down list expands
  };
  /**
   * Indicates whether to display hour, minute, and second for the dateRange type.
   */
  showTime?: boolean;
  [propName: string]: any;
}

export interface ITagOption {
  /**
   * Option. By default, the filterKey and colorKey values are used for label and color. If no value is set, the default values are used.
   */
  label?: string; // Common default attribute, which is used to set the category name.
  color?: string; // This parameter is used only for label. It is used to set the label color.
  [propName: string]: any;
}

export type SelectedTagsEvent = {
  selectedTags: Array<ICategorySearchTagItem>;
  currentChangeTag: ICategorySearchTagItem;
  operation: 'add' | 'delete' | 'clear';
};

export type CreateFilterEvent = {
  name: string;
  selectedTags: Array<ICategorySearchTagItem>;
  keyword: string;
};

export type SearchEvent = {
  selectedTags: Array<ICategorySearchTagItem>;
  searchKey: string;
};

export type DValidateRules =
  | {
      validators?: DValidateRule[]; // Synchronize verification rules.

      asyncValidators?: DAsyncValidateRule[]; // Asynchronous Verification Rule

      asyncDebounceTime?: number; // Asynchronous validator debounceTime (unit: ms). The default value is 300.

      errorStrategy?: DValidationErrorStrategy; // error update policy. The default value is'dirty'.

      message?: string; // Unified message. If no message is configured for a verification rule, the unified message is used.

      messageShowType?: 'popover' | 'text' | 'none'; // Automatic message display policy (currently, this policy takes effect only for a single form component). (displayed in the popover | d-form-item container | not displayed)

      // When the message is displayed as popover, set the popover content pop-up direction. The default value is ['right','bottom'].
      popPosition?: 'top' | 'right' | 'bottom' | 'left' | ('top' | 'right' | 'bottom' | 'left')[];
    }
  | DValidateRule[]; // If only the synchronization verification rule needs to be set, the synchronization verification rule array can be transferred.
```
