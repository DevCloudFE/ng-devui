# 如何使用

在 module 中引入：

```ts
import { CheckBoxModule } from 'ng-devui/checkbox';
```

在页面中使用：

```html
<d-checkbox></d-checkbox>
<d-checkbox-group></d-checkbox-group>
```

## d-checkbox

### d-checkbox 参数

| 参数          | 类型                            | 默认  | 说明                                                                                  | 跳转 Demo                         | 全局配置项 |
| ------------- | ------------------------------- | ----- | ------------------------------------------------------------------------------------- | --------------------------------- | ---------- |
| name          | `string`                        | --    | 可选，表单域名，input 原生 name 属性                                                  | [基本用法](demo#checkbox-basic)   |
| label         | `string`                        | --    | 可选，显示标签                                                                        | [基本用法](demo#checkbox-basic)   |
| isShowTitle   | `boolean`                       | true  | 可选，是否显示 title 提示，默认显示参数`label`的值                                    | [基本用法](demo#checkbox-basic)   |
| title         | `string`                        | --    | 可选，显示自定义 title 提示内容                                                       | [基本用法](demo#checkbox-basic)   |
| disabled      | `boolean`                       | false | 可选，是否禁用                                                                        | [基本用法](demo#checkbox-basic)   |
| labelTemplate | `TemplateRef`                   | --    | 可选，标签的自定义模板                                                                | [基本用法](demo#checkbox-basic)   |
| halfchecked   | `boolean`                       | false | 可选，半选状态                                                                        | [基本用法](demo#checkbox-basic)   |
| color         | `string`                        | --    | 可选，复选框颜色                                                                      | [基本用法](demo#checkbox-basic)   |
| showAnimation | `boolean`                       | true  | 可选，控制是否显示动画                                                                | [基本用法](demo#checkbox-basic)   | ✔          |
| beforeChange  | `Function\|Promise\|Observable` | --    | 可选，checkbox 切换前的回调函数，返回 boolean 类型，返回 false 可以阻止 checkbox 切换 | [回调切换](demo#condition-change) |
| cssClass      | `string`                        | --    | 可选，checkbox 的 className                                                           |
| showGlowStyle | `boolean`                       | true  | 可选，是否显示悬浮发光效果                                                            |

### d-checkbox 事件

| 事件   | 类型                    | 说明                                     | 跳转 Demo                       |
| ------ | ----------------------- | ---------------------------------------- | ------------------------------- |
| change | `EventEmitter<boolean>` | 复选框的值改变时发出的事件，值是当前状态 | [基本用法](demo#checkbox-basic) |

## d-checkbox-group

### d-checkbox-group 参数

| 参数          | 类型                            | 默认     | 说明                                                                                        | 跳转 Demo                             | 全局配置项 |
| ------------- | ------------------------------- | -------- | ------------------------------------------------------------------------------------------- | ------------------------------------- | ---------- |
| name          | `string`                        | --       | 可选，表单域名，input 原生 name 属性                                                        | [使用 CheckBoxGroup](demo#tabs-group) |
| direction     | `'row'\|'column'`               | 'column' | 可选，显示方向                                                                              | [使用 CheckBoxGroup](demo#tabs-group) |
| itemWidth     | `number`                        | --       | 可选，表示每一项 checkbox 的宽度（`px`）                                                    | [使用 CheckBoxGroup](demo#tabs-group) |
| isShowTitle   | `boolean`                       | true     | 可选，是否显示 title 提示                                                                   | [使用 CheckBoxGroup](demo#tabs-group) |
| options       | `Array<any>`                    | []       | 可选，复选框选项数组                                                                        | [使用 CheckBoxGroup](demo#tabs-group) |
| filterKey     | `string`                        | --       | 可选，options 为对象数组时，标识选项唯一 id 的键值                                          | [使用 CheckBoxGroup](demo#tabs-group) |
| labelTemplate | `TemplateRef`                   | --       | 可选，标签的自定义模板                                                                      | [使用 CheckBoxGroup](demo#tabs-group) |
| color         | `string`                        | --       | 可选，复选框颜色                                                                            | [使用 CheckBoxGroup](demo#tabs-group) |
| showAnimation | `boolean`                       | true     | 可选，控制是否显示动画                                                                      | [使用 CheckBoxGroup](demo#tabs-group) | ✔          |
| beforeChange  | `Function\|Promise\|Observable` | --       | 可选，checkbox 切换前的回调函数，返回 boolean 类型，返回 false 可以阻止 checkbox-group 切换 | [回调切换](demo#condition-change)     |
| disabled      | `boolean`                       | false    | 可选，是否禁用整个按钮组                                                                    | [使用 CheckBoxGroup](demo#tabs-group) |

### d-checkbox-group 事件

| 事件   | 类型                    | 说明                | 跳转 Demo                             |
| ------ | ----------------------- | ------------------- | ------------------------------------- |
| change | `EventEmitter<boolean>` | checkbox 值改变事件 | [使用 CheckBoxGroup](demo#tabs-group) |
