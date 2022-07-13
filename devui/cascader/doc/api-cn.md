# 如何使用

在 module 中引入：

```ts
import { CascaderModule } from 'ng-devui/cascader';
```

在页面中使用：

```
<d-cascader [options]="options"></d-cascader>
```

# d-cascader

## d-cascader 参数

|         参数         |                                       类型                                       |               默认               |                                        说明                                         | 跳转 Demo                          | 全局配置项 |
| :------------------: | :------------------------------------------------------------------------------: | :------------------------------: | :---------------------------------------------------------------------------------: | :--------------------------------- | ---------- |
|       trigger        |                                `'hover'\|'click'`                                |             'hover'              |                            可选，指定展开次级菜单的方式                             | [基本用法](demo#basic-usage)       |
|       options        |                       [`CascaderItem`](#cascaderitem)`[]`                        |                []                |                               必选，级联器的菜单信息                                | [基本用法](demo#basic-usage)       |
|     placeholder      |                                     `string`                                     |                ''                |                          可选，没有选择时的输入框展示信息                           | [基本用法](demo#basic-usage)       |
|        width         |                                     `number`                                     |               200                |                  可选，单位 px，用于控制组件输入框宽度和下拉的宽度                  | [基本用法](demo#basic-usage)       |
|    dropdownWidth     |                                     `number`                                     |              width               |           可选，单位 px，控制下拉列表的宽度，默认和组件输入框 width 相等            | [基本用法](demo#basic-usage)       |
|       disabled       |                                    `boolean`                                     |              false               |                                可选，级联器是否禁用                                 | [基本用法](demo#basic-usage)       |
|       showPath       |                                    `boolean`                                     |              false               |                  可选，级联器选中项是否显示路径，仅单选模式下生效                   | [基本用法](demo#basic-usage)       |
|      allowClear      |                                    `boolean`                                     |              false               |                                 可选，是否允许清除                                  | [基本用法](demo#basic-usage)       |
|       multiple       |                                    `boolean`                                     |              false               |                可选，级联器是否开启多选模式，开启后为 checkbox 选择                 | [多选模式](demo#multiple-cascader) |
|   canSelectParent    |                                    `boolean`                                     |              false               |                          可选，级联器是否允许选择父级节点                           | [父级可选](demo#parent-cascader)   |
|   checkboxRelation   |                      `{upward: boolean, downward: boolean}`                      | `{upward: true, downward: true}` | 可选，级联器多选下高级状态配置， upward 为状态向父级更新，downward 为状态向子级更新 | [父级可选](demo#parent-cascader)   |
|     allowSearch      |                                    `boolean`                                     |              false               |                            可选，级联器是否开启搜索模式                             | [搜索模式](demo#search-cascader)   |
| dropDownItemTemplate |                                `TemplateRef<any>`                                |              -               |                       可选，传入一个渲染 dropItem 的固定模板,可获取到option和label参数                        | [模板类型](demo#template-cascader) |
| dropdownHeaderTemplate |                                `TemplateRef<any>`                                |              -               |                       可选，传入一个渲染下拉头部的渲染模板，可获取到index参数                        | [模板类型](demo#cascader-header-template) |
|    loadChildrenFn    | `(value: CascaderItem) => Promise<CascaderItem[]> \| Observable<CascaderItem[]>` |               null               |                         可选，传入懒加载的加载子节点的函数                          | [点击加载](demo#lazyload-cascader) |
|  dropdownPanelClass  |                                     `string`                                     |                -                 |                        下拉面板的 class,用于用户选中某个面板                        | [基本用法](demo#basic-usage)       |
|    showAnimation     |                                    `boolean`                                     |               true               |                                 可选，是否开启动画                                  |                                    | ✔          |
|    appendToBody     |                                    `boolean`                                     |               true               |                                 可选，将下拉附着到body                                |                                   |
|    hostTemplate     |                                     `templateRef<any>`                                     |               -               |                                 自定义下拉的宿主，暴露参数value，为当前选中的值                                |            [基本用法](demo#basic-usage)                       |

## d-cascader 事件

|    参数     |          类型           | 说明                                         | 跳转 Demo                          |
| :---------: | :---------------------: | :------------------------------------------- | ---------------------------------- |
| toggleEvent | `EventEmitter<boolean>` | 可选，下拉开关触发事件，返回是否开启的布尔值 | [多选模式](demo#multiple-cascader) |

## ngModel

ngModel 在单选模式绑定为选中项的路径值数组'Array<string | number>'，例如[1,2]。

ngModel 在多选模式下绑定为所有选中项的路径数组的数组'Array<string | number>[]', 例如[[1,2], [1,3], [1,4,5]]。

ngModelChange 可监听其变化。

# 接口 & 类型定义

### CascaderItem

```
interface CascaderItem {
  label: string;
  value: number | string;
  isLeaf?: boolean;
  children?: CascaderItem[];
  disabled?: boolean;
  icon?: string;
  // 用户可以传入自定义属性，并在dropDownItemTemplate中使用
  [prop: string]: any;
}
```
