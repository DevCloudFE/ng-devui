| 参数        | 类型          | 默认        |   说明                 |
| :---------: | :----------: | :---------: | :------------------------------------------|
| pageSize        | number       | '10'      | 可选参数，每页显示最大条目数量 |
| pageSizeOptions    | number[]       | '10'      | 可选参数，分页每页最大条目数量的下拉框的数据源，有四种选择[[5|10|15|20]] |
| pageIndex   | number      | '1'       | 可选参数，初始化页码 |
| maxItems     | number     | '10'      | 可选参数，分页最多显示几个按钮 |
| preLink   | string      | --       | 可选参数，pre按钮文字 |
| nextLink     | string     | --      | 可选参数， next按钮文字 |
| size   | number      | ''       | 可选参数，分页组件尺寸，有三种选择[[lg|''|sm]] |
| canJumpPage     | boolean     | 'true'      | 可选参数，是否显示分页输入跳转 |
| canChangePageSize   | boolean      | 'false'       | 可选参数，是否显示用于选择更改分页每页最大条目数量的下拉框 |
| canViewTotal     | boolean     | 'true'      | 可选参数，是否显示总条目 |
| totalItemText   | string      | 'Total Records'       | 可选参数，总条目文本 |
| gotToText     | string     | (none)       | 可选参数，跳转文本 |
| showJumpButton     | boolean     | 'false'       | 可选参数，是否显示跳转按钮 |
| pageIndexChange   | function      | (none)       | 可选参数，页码变化的回调 |
| pageSizeChange     | function     | (none)      | 可选参数，每页最大条目数量变更时的回调 |
| showTruePageIndex     | boolean     | false     | 可选参数，页码超出分页范围时候也显示当前页码的开关 |


