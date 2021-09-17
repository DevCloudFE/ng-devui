# How to use

Import into module:

```ts
import { CascaderModule } from ' ng-devui/cascader';
```

In the page:

```
<d-cascader [options]="options"></d-cascader>
```

# d-cascader

## d-cascader parameters

|      Parameter       |                                       Type                                       |             Default              | Description                                                                                                                                                                                                                      | Jump to Demo                                    |Global Config| 
| :----------------: | :------------------: | :------------------------------------------------------------------------------: | :------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
|       trigger        |                                `hover'\|'click'`                                 |             'hover'              | Optional, specifying the mode for expanding submenu                                                                                                                                                                              | [Basic usage](demo#basic-usage)                 |
|       options        |                       [`CascaderItem`](#cascaderitem)`[]`                        |                []                | Mandatory: indicates the menu information of the cascader.                                                                                                                                                                       | [Basic usage](demo#basic-usage)                 |
|     placeholder      |                                     `string`                                     |                ''                | Optional, This parameter is used to display information in the text box if no value is selected.                                                                                                                                 | [Basic usage](demo#basic-usage)                 |
|        width         |                                     `number`                                     |               200                | Optional, The unit is px. It is used to control the width of the widget input box and the width of the drop-down list box.                                                                                                       | [Basic usage](demo#basic-usage)                 |
|    dropdownWidth     |                                     `number`                                     |              width               | Optional, The unit is px. Width of the drop-down list box. The default value is the same as the width of the gadget input box.                                                                                                   | [Basic usage](demo#basic-usage)                 |
|       disabled       |                                    `boolean`                                     |              false               | Optional, indicating whether the cascader is disabled.                                                                                                                                                                           | [Basic usage](demo#basic-usage)                 |
|       showPath       |                                    `boolean`                                     |              false               | Optional, Specifies whether to display the path for a selected item in the concatenation. This parameter is valid only in single-choice mode.                                                                                    | [Basic usage](demo#basic-usage)                 |
|      allowClear      |                                    `boolean`                                     |              false               | Optional, This parameter specifies whether to clear the alarm.                                                                                                                                                                   | [Basic usage](demo#basic-usage)                 |
|       multiple       |                                    `boolean`                                     |              false               | Optional, Whether to enable the multi-selection mode of the cascader. If the multi-selection mode is enabled, the checkbox is selected.                                                                                          | [Multi-selection mode](demo#multiple-cascader)  |
|   canSelectParent    |                                    `boolean`                                     |              false               | Optional, indicates whether a cascade node can be selected.                                                                                                                                                                      | [Parent node is optional](demo#parent-cascader) |
|   checkboxRelation   |                      `{upward: boolean, downward: boolean}`                      | `{upward: true, downward: true}` | Optional, Advanced status configuration when multiple cascaders are selected. The value up indicates that the status is updated to the parent level, and the value down indicates that the status is updated to the child level. | [Parent optional](demo#parent-cascader)         |
|     allowSearch      |                                    `boolean`                                     |              false               | Optional, Whether to enable the search mode for the cascader.                                                                                                                                                                    | [Search mode](demo#search-cascader)             |
| dropDownItemTemplate | `TemplateRef<any>` | - | (Optional) Transfer a fixed template for rendering drop items. The options and label parameters can be obtained. | [Template type](demo#template-cascader) |
| dropdownHeaderTemplate | `TemplateRef<any>` | - | (Optional) Input a rendering template of the rendering drop-down header. You can obtain the index parameter | [Template type](demo#cascader-header-template) |.
|    loadChildrenFn    | `(value: CascaderItem) => Promise<CascaderItem[]> \| Observable<CascaderItem[]>` |               null               | Optional, Transfer the function for loading subnodes in lazy loading                                                                                                                                                             | [Click to load](demo#lazyload-cascader)         |
|  dropdownPanelClass  |                                     `string`                                     |                -                 | Class of the drop-down panel, which is used to select a panel.                                                                                                                                                                   | [Basic usage](demo#basic-usage)                 |
|    appendToBody     |                                    `boolean`                                     |               true               |                                 Optional, attach the drop-down to the body                             |                                   |
| showAnimation | `boolean` | true | optional. Whether to enable animation. |   | ✔ |

## d-cascader event

|  Parameter  |          Type           | Description                                                                                        | Jump to Demo                                |
| :---------: | :---------------------: | :------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| toggleEvent | `EventEmitter<boolean>` | : optional. This parameter is used to trigger a drop-down list box. The Boolean value is returned. | [Multi-choice mode](demo#multiple-cascader) |

## ngModel

In radio mode, ngModel is bound to the path value array of the selected item'Array<string | number>', for example, [1,2].

In multi-select mode, ngModel is bound to the array 'Array<string | number>[]' of the path array of all selected items, for example, [[1,2], [1,3], [1,4,5]].

ngModelChange can listen to the change.

# Interface & Type Definition

### CascaderItem

```
interface CascaderItem {
label: string;
value: number | string;
isLeaf? : boolean;
children? : CascaderItem[];
disabled? : boolean;
icon? : string;
// Users can transfer customized attributes and use them in dropDownItemTemplate.
[prop: string]: any;
}
```
