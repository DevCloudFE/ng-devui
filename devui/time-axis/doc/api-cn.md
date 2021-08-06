# 如何使用

在module中引入：

```ts
import { TimeAxisModule } from 'ng-devui/time-axis';
```
在页面中使用：
```
<d-time-axis [data]="data"></d-time-axis>
```

# d-time-axis

## d-time-axis 参数

|      参数      |   类型   | 默认值 | 描述                                                      | 跳转 Demo                                                |全局配置项| 
| :----------------: | :------------: | :------: | :--: | :-------------------------------------------------------- | -------------------------------------------------------- |
| data |  [`TimeAxisData`](#data)   |  --  | 可选，配置时间轴及时间点数据                                | [设置方向](demo#direction)           |
|  contentTemplate  | `TemplateRef` |  --  | 可选，内容模板，默认为空，当 model 为 `template` 时需要设置 | [内容使用模板自定义](demo#content-with-template) |
| mode |  `'normal'\|'alternative'`   |  `'normal'`  | 可选，`normal`模式下内容按默认方向排布， `alternative`模式下内容交替排布      | [时间节点内容方向自定义](demo#content-with-alternative-mode)  |

## data

|   参数    |             类型             | 默认值 | 描述            | 跳转 Demo                                                |
| :-------: | :--------------------------: | :--: | :-------------- | -------------------------------------------------------- |
| direction |  `'vertical'\|'horizontal'`  |  ''  | 可选，设置时间轴方向      | [设置方向](demo#direction)           |
| position  |     `'left'\|'bottom'`      |  ''  | 可选，仅当direction 为 `vertical` 时定义时间参数位置 | [设置时间位置](demo#basic-usage)           |
| widthMode  |     `'fitContent'\|'fitWidth'`      |  `'fitContent'`  | 可选，仅当direction 为 `horizontal` 时，`widthMode='fitContent'`时间轴宽度由内容宽度自适应，`widthMode='fitWidth'`时间轴宽度撑满容器 | [时间点自定义](demo#custom-dot)           |
| horizontalAlign  |     `'center'\|'left'`      |  `'center'`  | 可选，仅当direction 为 `horizontal` 时，设置内容对齐方式 | [内容使用模板自定义](demo#content-with-template)           |
|   model   | `'text'\|'html'\|'template'` |  ''  | 可选，模型      | [内容使用html](demo#content-with-html)           |
|   list    |      [`array`](#list)        |  []  | 可选，列表数据  | [设置方向](demo#direction)           |

## list

|  参数  |                    类型                     | 默认值 | 描述                                                     | 跳转 Demo                                              |
| :----: | :-----------------------------------------: | :--: | :------------------------------------------------------- | ------------------------------------------------------ |
|  time  |                  `string`                   |  --  | 可选，时间    | [设置方向](demo#direction)           |
|  text  |                  `string`                   |  --  | 可选，文本内容                                            | [设置方向](demo#direction)           |
|  type  | `'primary' \| 'success' \| 'danger' \| 'warning'` |  `'primary'`  | 可选，时间点类型     | [设置时间位置](demo#basic-usage)           |
| ~~status~~ |         `'runned'\|'running'\|''`      |  --  | 可选，状态（`已废弃，建议使用lineStyle`） | [设置时间位置](demo#basic-usage)           |
|  data  |                   `array`                   |  --  | 可选，模板数据，当 model 设置为 template 时生效             | [内容使用模板自定义](demo#content-with-template) |
|  position  | `'up'\|'bottom'\|'left'\|'right'` |  --  | 可选，text 或 data的位置，若有time则time位于相反位置   | [时间节点内容方向自定义](demo#content-with-alternative-mode) |
|  lineStyle  | `{style: 'solid' \| 'dashed' \| 'dotted' \| 'none', color: string}`  | `{style: 'solid'}`  | 可选，设置时间轴线条样式   | [时间点自定义](demo#custom-dot) |
|  dotColor  | `string` |  --  | 可选，自定义时间圈颜色   | [内容使用模板自定义](demo#content-with-template) |
|  customDot  | `string\|HTMLElement\|TemplateRef` |  --  | 可选，自定义时间点   | [时间点自定义](demo#custom-dot) |
|  extraElement  | `string\|HTMLElement\|TemplateRef` |  --  | 可选，自定义两个时间点间附加元素   | [内容使用模板自定义](demo#content-with-template) |

## TimeAxisData

```
interface TimeAxisData {
  direction?:  'vertical' | 'horizontal' | '';
  position?: 'bottom' | 'left' | '';
  widthMode?: 'fitContent' | 'fitWidth';
  horizontalAlign?: 'center'|'left';
  model: 'text' | 'html' | 'template' | '';
  list: Array<{
    time?: string;
    text?: string;
    lineStyle?: object;
    dotColor?: string;
    customDot?: string | HTMLElement| TemplateRef<any>;
    type?: 'primary' | 'success' | 'danger' | 'warning';
    status?: 'runned' | 'running' | '';
    position?: 'top' | 'bottom' | 'left' | 'right';
    extraElement?: string | HTMLElement| TemplateRef<any>;
    iconClass?: string;
    data?: any;
  }>;
}
```

# 时间节点单独以HTML标签形式使用

## d-time-axis 参数
|  参数  |                    类型                     | 默认值 | 描述                                                     | 跳转 Demo                                              |
| :----: | :-----------------------------------------: | :--: | :------------------------------------------------------- | ------------------------------------------------------ |
|  direction  | `'vertical'\|'horizontal'` |  --  | 必选，设置时间轴方向 | [时间节点单独使用](demo#seperate-way) |
| mode |  `'normal'\|'alternative'`   |  `'normal'`  | 可选，`normal`模式下内容按默认方向排布， `alternative`模式下内容交替排布      | [时间节点单独使用](demo#seperate-way)  |
| widthMode  |     `'fitContent'\|'fitWidth'`      |  `'fitContent'`  | 可选，仅当direction 为 `horizontal` 时，`widthMode='fitContent'`时间轴宽度由内容宽度自适应，`widthMode='fitWidth'`时间轴宽度撑满容器 | [时间节点单独使用](demo#seperate-way)           |


## d-time-axis-item 参数

|  参数  |                    类型                     | 默认值 | 描述                                                     | 跳转 Demo                                              |
| :----: | :-----------------------------------------: | :--: | :------------------------------------------------------- | ------------------------------------------------------ |
|  direction  | `'vertical'\|'horizontal'` |  --  | 必选，设置时间轴点方向 | [时间节点单独使用](demo#seperate-way) |
|   model   | `'text'\|'html'\|'template'` |  ''  | 可选，模型      | [时间节点单独使用](demo#seperate-way)           |
|  time  |                  `string`                   |  --  | 可选，时间    | [时间节点单独使用](demo#seperate-way)           |
|  text  |                  `string`                   |  --  | 可选，文本内容                                            | [时间节点单独使用](demo#seperate-way)           |
|  type  | `'primary' \| 'success' \| 'danger' \| 'warning'` |  `'primary'`  | 可选，时间点类型     | [时间节点单独使用](demo#seperate-way)          |
|  data  |                   `array`                   |  --  | 可选，模板数据，当 model 设置为 template 时生效             | [时间节点单独使用](demo#seperate-way) |
|  contentTemplate  | `TemplateRef` |  --  | 可选，内容模板，默认为空，当 model 为 `template` 时需要设置 | [时间节点单独使用](demo#seperate-way) |
|  lineStyle  | `{style: 'solid' \| 'dashed' \| 'dotted' \| 'none', color: string}`  | `{style: 'solid'}`  | 可选，设置时间轴线条样式   | [时间节点单独使用](demo#seperate-way) |
|  customDot  | `string\|HTMLElement\|TemplateRef` |  --  | 可选，自定义时间点   | [时间节点单独使用](demo#seperate-way) |
|  extraElement  | `string\|HTMLElement\|TemplateRef` |  --  | 可选，自定义两个时间点间附加元素   | [时间节点单独使用](demo#seperate-way) |
|  position  | `'up'\|'bottom'\|'left'\|'right'` |  --  | 可选，text 或 data的位置，若有time则time位于相反位置   | [时间节点单独使用](demo#seperate-way) |
|  timePosition  | `'left'\|'bottom'` |  --  | 可选，仅当direction 为 `vertical` 时定义时间参数位置   | [时间节点单独使用](demo#seperate-way) |