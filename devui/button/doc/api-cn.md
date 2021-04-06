# 如何使用

在module中引入：

```ts
import { ButtonModule } from 'ng-devui/button';
```

在页面中使用：

```xml
<d-button></d-button>
```
# d-button
## d-button 参数

|    参数     |      类型      |  默认   | 说明                                                                           | 跳转 Demo                                            |全局配置项| 
| :----------------: | :---------: | :------------:  | :-----: | :---------------------------------------------------------------------------  |                                                     |
|     id      |            `string`             |   --    | 可选，button id     |   [主要按钮](demo#button-primary)                                             |
|    type     | [`IButtonType`](#ibuttontype)   | 'button'  | 可选，类型 `'button' \| 'submit' \| 'reset' ` |  [警示按钮](demo#button-danger)                                             |
|   bsStyle   | [`IButtonStyle`](#ibuttonstyle)  | 'primary' | 可选，风格 `'primary' \| 'common' \| 'text' \| 'text-dark' \| 'danger'`      | [次要按钮](demo#button-common)   |
|   bsSize    |  [`IButtonSize`](#ibuttonsize)   |  'md'   | 可选，大小 `'lg' \| 'md' \| 'sm' \| 'xs'`          | [按钮尺寸](demo#button-size)      |
| bsPosition |[`IButtonPosition`](#ibuttonposition) |'default' | 可选，按钮位置 `'default' \| 'left' \| 'right'`  | [左右按钮](demo#button-left-right)     |
|  bordered   |   `boolean`     |  false  | 可选，是否有边框          |      [自动获得焦点](demo#button-auto-focus)             |
|    icon     |    `string`     |   --    | 可选， 自定义按钮图标                                                          | [图标按钮](demo#button-icon)      |
| showLoading |   `boolean`     |  false  | 可选，是否显示加载提示                                                         | [加载中状态](demo#button-loading) |
|    width    |    `number`     |   --    | 可选，button 宽度    |   [主要按钮与次要按钮组合](demo#button-primary-and-common)         |
|  disabled   |   `boolean`     |  false  | 可选，是否禁用 button                                                         | [主要按钮](demo#button-primary)   |
|  autofocus  |   `boolean`     |  false  | 可选，按钮加载时是否自动获得焦点                                                | [自动获得焦点](demo#button-auto-focus)  |

## d-button 事件

|   参数   |        类型         | 说明                                                                                    | 跳转 Demo                                      |
| :------: | :-----------------: | :-------------------------------------------------------------------------------------- | ---------------------------------------------- |
| btnClick | `EventEmitter<MouseEvent>` | 可选，button 点击事件，解决disabled还会触发 click, 返回点击下后鼠标事件对象 |  [加载中状态](demo#button-loading)  |

# d-button-group
## d-button-group 参数  

|    参数     |      类型      |  默认   | 说明                                                                           | 跳转 Demo                                            |全局配置项| 
| :----------------: | :---------: | :------------:  | :-----: | :---------------------------------------------------------------------------  |                                                     |
|     size      |    [`IButtonGroupSize`](#ibuttongroupsize)     |  'md'   | 可选，大小`'lg' \| 'md' \| 'sm' \| 'xs'` | [按钮组](demo#button-groups) |


# 接口 & 类型定义
### IButtonType

默认值为'button'，表示button类型

```ts
export type IButtonType = 'button' | 'submit' | 'reset';
```

### IButtonStyle

默认值为'primary'，表示button风格

```ts
export type IButtonStyle = 'common' | 'primary' | 'text' | 'text-dark' | 'danger';
```

### IButtonPosition

默认值为'default'，表示button位置

```ts
export type IButtonPosition = 'left' | 'right' | 'default';
```

### IButtonSize
默认值为'md'，表示button尺寸

```ts
export type IButtonSize = 'lg' | 'md' | 'sm' | 'xs';
```

### IButtonGroupSize
默认值为'md'，表示button-group尺寸

```ts
export type IButtonGroupSize = 'lg' | 'md' | 'sm' | 'xs';
```
