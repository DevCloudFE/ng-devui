## d-time-axis 参数

|      参数      |   类型   | 默认 | 说明                                                      | 跳转 Demo                                                |
| :------------: | :------: | :--: | :-------------------------------------------------------- | -------------------------------------------------------- |
| data |  `Object`   |  --  | 可选，配置数据，是一个对象                                | [基本用法](demo#basic-usage)           |
|  contentTemplate  | `TemplateRef` |  --  | 可选，内容模板，默认为空，当 model 为 `template` 时需要设置 | [内容使用模板自定义](demo#content-with-template) |

## data 参数

|   参数    |             类型             | 默认 | 说明            |
| :-------: | :--------------------------: | :--: | :-------------- |
| direction |  `'vertical'\|'horizontal'`  |  ''  | 可选，方向      |
| position  |     `'left'\|'bottom'`      |  ''  | 可选,时间点定位 |
|   model   | `'text'\|'html'\|'template'` |  ''  | 可选，模型      |
|   list    |           `array`            |  []  | 可选，列表数据  |

## list 参数

|  参数  |                    类型                     | 默认 | 说明                                                         |
| :----: | :-----------------------------------------: | :--: | :----------------------------------------------------------- |
|  time  |                  `string`                   |  --  | 可选，时间                                                   |
|  text  |                  `string`                   |  --  | 可选，文本内容                                               |
|  type  | `'primary'\|'success'\|'danger'\|'warning'` |  --  | 可选，类型                                                   |
| status |            `'runned'\|'running'`            |  --  | 可选，状态，默认为空，值可以是 runned 已完成，running 运行中 |
|  data  |                   `array`                   |  --  | 可选，模板数据，当 model 设置为 template 时生效              |
