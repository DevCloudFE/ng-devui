# 如何使用

在 module 中引入：

```ts
import { TabsModule } from 'ng-devui/tabs';
```

在页面中使用：

```html
<d-tabs>
  <d-tab>
    <ng-template dTabTitle>...</ng-template>
    <ng-template dTabContent>...</ng-template>
  </d-tab>
</d-tabs>
```
# d-tabs
## d-tabs 参数

|     参数     |              类型               |  默认  | 说明                                                                                                  | 跳转 Demo                                                 |
| :----------: | :-----------------------------: | :----: | :---------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
|     type     |     `tabs\|pills\|options`      | 'tabs' | 可选，选项卡组的类型                                                                                  | [配置类型与排列](demo#configuration-type-and-arrangement) |
| showContent  |            `boolean`            |  true  | 可选，是否显示选项卡对应的内容                                                                        | [不设置内容](demo#no-set-content)                         |
|  activeTab   |            `string`             |   --   | 可选，当前激活的选项卡，值为选项卡的 id                                                               | [基本用法](demo#basic-usage)                              |
|   cssClass   |            `string`             |   --   | 可选，自定义选项卡组的 css 类                                                                         | [自定义模板](demo#custom-template)                        |
| customWidth  |            `string`             |   --   | 可选，自定义选项卡的宽度                                                                              | [配置类型与排列](demo#configuration-type-and-arrangement) |
|   vertical   |            `boolean`            | false  | 可选，是否垂直显示                                                                                    | [配置类型与排列](demo#configuration-type-and-arrangement) |
| beforeChange | `function\|Promise\|Observable` |   --   | tab 切换前的回调函数,返回 boolean 类型，返回 false 可以阻止 tab 的切换                                | [拦截 tab 切换](demo#intercept-tab-switch)                |
| reactivable  |            `boolean`            | false  | 可选，点击当前处于激活态的 tab 时是否触发`activeTabChange`事件，`true`为允许触发，`false`为不允许触发 | [拦截 tab 切换](demo#intercept-tab-switch)                |

## d-tabs 事件

|      参数       |              类型              | 说明                                                | 跳转 Demo                    |
| :-------------: | :----------------------------: | :-------------------------------------------------- | ---------------------------- |
| activeTabChange | `EventEmitter<number\|string>` | 可选，选项卡切换的回调函数，返回当前激活选项卡的 id | [基本用法](demo#basic-usage) |

### d-tab 参数

|   参数   |       类型       | 默认  | 说明                                   | 跳转 Demo                         |
| :------: | :--------------: | :---: | :------------------------------------- | --------------------------------- |
|  tabId   |     `string`     |  --   | 可选，选项卡的 id 值, 需要设置为唯一值 | [基本用法](demo#basic-usage)      |
|    id    | `number\|string` |  --   | 可选，一般和`tabId`一致                | [基本用法](demo#basic-usage)      |
|  title   |     `string`     |  --   | 可选，选项卡的标题                     | [基本用法](demo#basic-usage)      |
| disabled |    `boolean`     | false | 可选，选项卡是否不可用                 | [不设置内容](demo#no-set-content) |
