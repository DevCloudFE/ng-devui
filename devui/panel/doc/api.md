### d-panel 参数

|    参数     |   类型    |   默认    | 说明                  | 跳转 Demo                                  |
| :---------: | :-------: | :-------: | :-------------------- | ------------------------------------------ |
|    type     | `string`  | 'default' | 可选，面板的类型      | [基本用法](/components/panel/demo#basic-usage) |
|  cssClass   | `string`  |    --     | 可选，自定义 class 名 |
| isCollapsed | `boolean` |   false   | 可选，是否展开        | [基本用法](/components/panel/demo#basic-usage) |

### d-panel 事件

|  参数  |          类型           | 说明                                           |
| :----: | :---------------------: | :--------------------------------------------- |
| toggle | `EventEmitter<boolean>` | 可选，点击面板时的回调，返回当前面板的展开状态 |
