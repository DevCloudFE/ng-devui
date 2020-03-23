## d-transfer 参数

| 参数        | 类型          | 默认        |   说明                 |
| :---------: | :----------: | :---------: | :------------------------------------------|
| sourceOption        | array       | []      | 可选参数，穿梭框源数据 |
| targetOption    | array       | []      | 可选参数，穿梭框目标数据 |
| titles   | array      | []        | 可选参数，穿梭框标题 |
| height     | string     | 320px      | 可选参数，穿梭框高度 |
| isSearch | number       | false      | 可选参数，是否可以搜索 |
| isSourceDroppable | boolean       | false      | 可选参数，源是否可以拖拽 |
| isTargetDroppable | boolean       | false      | 可选参数，目标是否可以拖拽 |
| disabled | boolean       | false      | 可选参数  穿梭框禁止使用 |

## d-transfer事件

| 事件        | 类型          |  说明       |
| :---------: | :----------: | :---------: |
| transferToSource |   返回穿梭框源和目标数据 |当点击右穿梭时，返回源和目标数据；|
| transferToTarget |   返回穿梭框源和目标数据 |当点击左穿梭时，返回源和目标数据；|
