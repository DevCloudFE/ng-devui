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
| data |  `TimeAxisData`   |  --  | 可选，配置数据，是一个对象                                | [基本用法](demo#basic-usage)           |
|  contentTemplate  | `TemplateRef` |  --  | 可选，内容模板，默认为空，当 model 为 `template` 时需要设置 | [内容使用模板自定义](demo#content-with-template) |

## data 参数

|   参数    |             类型             | 默认值 | 描述            | 跳转 Demo                                                |
| :-------: | :--------------------------: | :--: | :-------------- | -------------------------------------------------------- |
| direction |  `'vertical'\|'horizontal'`  |  ''  | 可选，方向      | [设置方向](demo#direction)           |
| position  |     `'left'\|'bottom'`      |  ''  | 可选,时间点定位 | [基本用法](demo#basic-usage)           |
|   model   | `'text'\|'html'\|'template'` |  ''  | 可选，模型      | [内容使用html](demo#content-with-html)           |
|   list    |           `array`            |  []  | 可选，列表数据  | [基本用法](demo#basic-usage)           |

## list 参数

|  参数  |                    类型                     | 默认值 | 描述                                                     | 跳转 Demo                                              |
| :----: | :-----------------------------------------: | :--: | :------------------------------------------------------- | ------------------------------------------------------ |
|  time  |                  `string`                   |  --  | 可选，时间                                                | [基本用法](demo#basic-usage)           |
|  text  |                  `string`                   |  --  | 可选，文本内容                                            | [基本用法](demo#basic-usage)           |
|  type  | `'primary'\|'success'\|'danger'\|'warning'` |  --  | 可选，类型                                                | [设置方向](demo#direction)           |
| status |            `'runned'\|'running'`            |  --  | 可选，状态，默认为空，值可以是 runned 已完成，running 运行中 | [设置方向](demo#direction)           |
|  data  |                   `array`                   |  --  | 可选，模板数据，当 model 设置为 template 时生效             | [内容使用模板自定义](demo#content-with-template) |

## TimeAxisData

```
interface TimeAxisData {
  direction?:  'vertical' | 'horizontal';
  position?: 'bottom' | 'left';
  model: 'text' | 'html' | 'template';
  list: Array<{
    time?: string;
    text?: string;
    type?: 'primary' | 'success' | 'danger' | 'warning';
    status?: 'runned' | 'running' | '';
    iconClass?: string;
    data?: any;
  }>;
}
```
