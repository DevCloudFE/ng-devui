### d-pagination 参数

| 参数        | 类型          | 默认        |   说明                 |
| :---------: | :----------: | :---------: | :------------------------------------------|
| pageSize        | `number`       | 10     | 可选，每页显示最大条目数量 |
| total        | `number`       | 0    | 可选，显示的总条目数 |
| pageSizeOptions    | `number[] `      | 10     | 可选，分页每页最大条目数量的下拉框的数据源，默认有四种选择5, 10, 20, 50 |
| pageIndex   | `number`      | 1       | 可选，初始化页码 |
| maxItems     | `number`     | 10      | 可选，分页最多显示几个按钮 |
| preLink   | `string `     |     --       | 可选，pre按钮文字,默认设置为左箭头图标 |
| nextLink     | `string`     | --      | 可选， next按钮文字,默认设置为右箭头图标 |
| size   | `number `     | ''       | 可选，分页组件尺寸，有三种选择lg,``,sm,分别代表大，中，小 |
| canJumpPage     | `boolean`     | true     | 可选，是否显示分页输入跳转 |
| canChangePageSize   | `boolean`      | false       | 可选，是否显示用于选择更改分页每页最大条目数量的下拉框 |
| canViewTotal     | `boolean`     | true     | 可选，是否显示总条目 |
| totalItemText   | `string`      | '所有条目'       | 可选，总条目文本 |
| goToText     |` string `    | '跳至'      | 可选，跳转文本 |
| showJumpButton     | `boolean `    | false       | 可选，是否显示跳转按钮 |
| showTruePageIndex     | `boolean `    | false     | 可选，页码超出分页范围时候也显示当前页码的开关 |
| selectDirection     | `string`     | 'auto'     | 可选，下拉菜单默认方向,有三种选择'auto' , 'up' ,'down' |
| lite     | `boolean`     | false    | 可选，是否切换为极简模式 |
| showPageSelector     | `boolean`     | true     | 可选，`极简模式`下是否显示页码下拉 |
| haveConfigMenu     |` boolean `    | false     | 可选，`极简模式`下是否显示配置 |

### d-pagination 事件
| 参数 | 类型  | 说明 |
| :---: | :---:| :---|
| pageIndexChange   |  `EventEmitter<number>`      | 可选，页码变化的回调,返回当前页码值 |
| pageSizeChange     |  `EventEmitter<number> `    |  可选，每页最大条目数量变更时的回调，返回当前每页显示条目数 |



