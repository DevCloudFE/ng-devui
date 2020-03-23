### d-tabs 参数

| 参数        | 类型          | 默认        |   说明                 |
| :---------: | :----------: | :---------: | :------------------------------------------|
| type        | `tabs\|pills\|options`       | tabs        | 可选，选项卡组的类型 |
| showContent | `boolean`      | true        | 可选，是否显示选项卡对应的内容 |
| activeTab   | `string`      | --    | 可选，当前激活的选项卡，值为选项卡的id |
| cssClass   | `string`      | --    | 可选，自定义选项卡组的css类 |
| customWidth   | `string`      | --    | 可选，自定义选项卡的宽度 |
| vertical   | `boolean`      | false    | 可选，是否垂直显示 |
| beforeChange | `function\|Promise\|Observable` | --   | tab切换前的回调函数,返回boolean类型，返回false可以阻止tab的切换|

### d-tabs 事件

| 参数 | 类型  | 说明 |
| :---: | :---:| :---|
| activeTabChange | `EventEmitter<number\|string>`| 可选，选项卡切换的回调函数，返回当前激活选项卡的id |

### d-tab 参数

| 参数        | 类型          | 默认        |   说明                 |
| :---------: | :----------: | :---------: | :------------------------------------------|
| tabId       | `string`       | --     | 可选，选项卡的id值, 需要设置为唯一值 |
| id          | `number\|string`       | --      |  可选，一般和`tabId`一致 |
| title       | `string`       | --      | 可选，选项卡的标题 |
| disabled    | `boolean`     | false       | 可选，选项卡是否不可用 |
