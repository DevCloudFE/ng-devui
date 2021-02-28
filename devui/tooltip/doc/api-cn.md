# 如何使用

在 module 中引入:

```ts
import { TooltipModule } from 'ng-devui/tooltip';
```

在页面中使用:

```html
<!-- xxx可以是任意html元素 -->
<xxx dTooltip></xxx>
```

# dTooltip

## dTooltip 参数

|      参数       |                        类型                         |                默认                |                        说明                         | 跳转 Demo                      |
| :-------------: | :-------------------------------------------------: | :--------------------------------: | :-------------------------------------------------: | ------------------------------ |
|     content     |                 `string\|DOMString`                 |                 --                 |               必选，tooltip 显示内容                | [基本用法](demo#basic-usage)   |
|    position     | [`PositionType`](#positiontype) `\| PositionType[]` | ['top', 'right', 'bottom', 'left'] |               可选，tooltip 显示位置                | [基本用法](demo#basic-usage)   |
|   showAnimate   |                      `boolean`                      |               false                |               可选，是否显示划出动画                | [基本用法](demo#basic-usage)   |
| mouseEnterDelay |                      `number`                       |                150                 | 可选，鼠标移入后延时多少才显示 Tooltip，单位是 `ms` | [延时触发](demo#delay-trigger) |
| mouseLeaveDelay |                      `number`                       |                100                 | 可选，鼠标移出后延时多少才隐藏 Tooltip，单位是 `ms` | [延时触发](demo#delay-trigger) |

# 接口 & 类型定义

### PositionType

```ts
export type PositionType = 'left' | 'right' | 'top' | 'bottom';
```
