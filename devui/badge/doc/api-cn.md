# 如何使用
在module中引入：
```ts
import { BadgeModule } from 'ng-devui/badge';
```

在页面中使用：
```html
<d-badge count="6" status="success">
    <div>未读消息</div>
</d-badge>
<d-badge count="66"></d-badge>
```
# Badge

## d-badge 参数

|    参数     |      类型      |  默认值   | 描述                                                                           | 跳转 Demo                                            |
| :---------: | :------------:  | :-----: | :---------------------------------------------------------------------------  |  :---------------------------     |
|     count      |    `number`     |   --    | 可选，设置基本徽章和计数徽章中显示的数目 | [基本徽章](demo#badge-basic) |
|    maxCount     | `number`   | 99  | 可选，设置基本徽章和计数徽章最大可显示数目，当 count > maxCount 时显示maxCount+  | [基本徽章](demo#badge-basic)     |
|   showDot   | `boolean`  | false | 可选，true时为点状徽章(有包裹)或状态徽章(无包裹)，false时为基本徽章(有包裹)或计数徽章(无包裹) | [点状徽章](demo#badge-dot)   |
| status |`BadgeStatusType` | -- | 可选，状态色 'danger' \| 'warning' \| 'waiting' \| 'success' \| 'info' | [基本徽章](demo#badge-basic) |
|   badgePos    | `BadgePositionType`   |  'top-right'   | 可选，徽标位置 'top-left' \| 'top-right' \| 'bottpm-left' \| ''bottom-right''   | [徽章位置](demo#position)      |
|  offsetXY   |   `[number, number]`     |  --  | 可选，有包裹时徽标位置偏移量，格式为[x,y]，单位为px。x为相对right偏移量(right: -x `px`)，y为相对top偏移量(top: y `px`)               |   [自定义](demo#custom)   |
|    bgColor     |    `string`     |   --    | 可选，自定义徽标色，此时status参数设置的徽章状态色失效 |  [自定义](demo#custom)      |
|    textColor     |    `string`     |   --    | 可选， 可自定义徽标文字颜色 |  [自定义](demo#custom)      |
