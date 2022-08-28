# 如何使用

在 module 中引入：

```ts
import { PanelModule } from 'ng-devui';
```

在页面中使用：

```html
<d-panel>
  <d-panel-header></d-panel-header>
  <d-panel-body></d-panel-body>
  <d-panel-footer></d-panel-footer>
</d-panel>
```

# d-panel

## d-panel 参数

|      参数      |              类型               |   默认    |                                            说明                                            | 跳转 Demo                                 | 全局配置项 |
| :------------: | :-----------------------------: | :-------: | :----------------------------------------------------------------------------------------: | :---------------------------------------- | ---------- |
|      type      |    [`PanelType`](#paneltype)    | 'default' |                                      可选，面板的类型                                      | [基本用法](demo#basic-usage)              |
|    cssClass    |            `string`             |    --     |                                   可选，自定义 class 名                                    |
|  isCollapsed   |            `boolean`            |   false   |                                       可选，是否展开                                       | [基本用法](demo#basic-usage)              |
| hasLeftPadding |            `boolean`            |   true    |                                   可选，是否显示左侧填充                                   | [基本用法](demo#basic-usage)              |
| showAnimation  |            `boolean`            |   true    |                                     可选，是否展示动画                                     | [基本用法](demo#basic-usage)              |
|  beforeToggle  | `Function\|Promise\|Observable` |    --     | 可选，面板折叠状态改变前的回调函数，返回 boolean 类型，返回 false 可以阻止面板改变折叠状态 | [根据条件阻止折叠](demo#condition-change) |

## d-panel 事件

|  参数  |          类型           | 说明                                           |
| :----: | :---------------------: | :--------------------------------------------- |
| toggle | `EventEmitter<boolean>` | 可选，点击面板时的回调，返回当前面板的展开状态 |

# 接口 & 类型定义

### PanelType

```ts
export type PanelType = 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'ghost';
```
