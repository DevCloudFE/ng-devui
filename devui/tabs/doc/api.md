### d-tabs 参数

|     参数     |              类型               | 默认  | 说明                                                                   | 跳转 Demo                                                        |
| :----------: | :-----------------------------: | :---: | :--------------------------------------------------------------------- | ---------------------------------------------------------------- |
|     type     |     `tabs\|pills\|options`      | tabs  | 可选，选项卡组的类型                                                   | [配置类型与排列](/components/tabs/demo#configuration-type-and-arrangement) |
| showContent  |            `boolean`            | true  | 可选，是否显示选项卡对应的内容                                         | [不设置内容](/components/tabs/demo#no-set-content)                     |
|  activeTab   |            `string`             |  --   | 可选，当前激活的选项卡，值为选项卡的 id                                | [基本用法](/components/tabs/demo#basic-usage)                        |
|   cssClass   |            `string`             |  --   | 可选，自定义选项卡组的 css 类                                          |[自定义模板](/components/tabs/demo#custom-template)
| customWidth  |            `string`             |  --   | 可选，自定义选项卡的宽度                                               | [配置类型与排列](/components/tabs/demo#configuration-type-and-arrangement) |
|   vertical   |            `boolean`            | false | 可选，是否垂直显示                                                     | [配置类型与排列](/components/tabs/demo#configuration-type-and-arrangement) |
| beforeChange | `function\|Promise\|Observable` |  --   | tab 切换前的回调函数,返回 boolean 类型，返回 false 可以阻止 tab 的切换 |[拦截tab切换](/components/tabs/demo#intercept-tab-switch)

### d-tabs 事件

|      参数       |              类型              | 说明                                                | 跳转 Demo                                 |
| :-------------: | :----------------------------: | :-------------------------------------------------- | ----------------------------------------- |
| activeTabChange | `EventEmitter<number\|string>` | 可选，选项卡切换的回调函数，返回当前激活选项卡的 id | [基本用法](/components/tabs/demo#basic-usage) |

### d-tab 参数

|   参数   |       类型       | 默认  | 说明                                   | 跳转 Demo                                    |
| :------: | :--------------: | :---: | :------------------------------------- | -------------------------------------------- |
|  tabId   |     `string`     |  --   | 可选，选项卡的 id 值, 需要设置为唯一值 | [基本用法](/components/tabs/demo#basic-usage)    |
|    id    | `number\|string` |  --   | 可选，一般和`tabId`一致                | [基本用法](/components/tabs/demo#basic-usage)    |
|  title   |     `string`     |  --   | 可选，选项卡的标题                     | [基本用法](/components/tabs/demo#basic-usage)    |
| disabled |    `boolean`     | false | 可选，选项卡是否不可用                 | [不设置内容](/components/tabs/demo#no-set-content) |
