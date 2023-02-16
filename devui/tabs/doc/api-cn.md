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
    content
  </d-tab>
</d-tabs>
```

## d-tabs

### d-tabs 参数

| 参数         | 类型                                    | 默认   | 说明                                                                                                            | 跳转 Demo                                  | 全局配置项 |
| ------------ | --------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ---------- |
| type         | `tabs\|pills\|options\|wrapped\|slider` | 'tabs' | 可选，选项卡组的类型                                                                                            | [Pills 类型](demo#type-pills)              |
| size         | `xs\|sm\|md\|lg`                        | 'md'   | 可选，选项卡组的尺寸                                                                                            | [选项卡尺寸](demo#size)                    |
| showContent  | `boolean`                               | true   | 可选，是否显示选项卡对应的内容                                                                                  | [不设置内容](demo#no-set-content)          |
| activeTab    | `string`                                | --     | 可选，当前激活的选项卡，值为选项卡的 id                                                                         | [基本用法](demo#basic-usage)               |
| customWidth  | `string`                                | --     | 可选，自定义选项卡的宽度                                                                                        |                                            |
| beforeChange | `function\|Promise\|Observable`         | --     | tab 切换前的回调函数,返回 boolean 类型，返回 false 可以阻止 tab 的切换                                          | [拦截 tab 切换](demo#intercept-tab-switch) |
| reactivable  | `boolean`                               | false  | 可选，点击当前处于激活态的 tab 时是否触发`activeTabChange`事件，`true`为允许触发，`false`为不允许触发           | [拦截 tab 切换](demo#intercept-tab-switch) |
| closeable    | `boolean`                               | false  | 可选，是否显示删除图标                                                                                          | [添加 / 删除](demo#add-delete)             |
| closeableIds | `Array<string>`                         | []     | 可选，指定可删除的选项卡 Id。默认为空数组，选项卡都可以被删除                                                   | [添加 / 删除](demo#add-delete)             |
| addable      | `boolean`                               | false  | 可选， 是否显示添加选项卡                                                                                       | [添加 / 删除](demo#add-delete)             |
| addTabTpl    | `TemplateRef<any>`                      | --     | 可选， 配合 addable 使用，自定义添加按钮选项卡                                                                  |                                            |
| scrollMode   | `boolean \| 'normal'\| 'auto'`          | false  | 可选， 是否启用大数据滚动显示，normal 和 true 时为开启，auto 时会根据选项卡总宽度与容器宽度比较自动开关滚动模式 | [大数据展示](demo#big-data)                |
| isHidden     | `boolean`                               | false  | 可选， 选项卡内容隐藏时是否采用 hidden 方式不销毁 dom                                                           | [自定义模板](demo#custom-template)         |

### d-tabs 事件

| 参数                 | 类型                           | 说明                                                                                | 跳转 Demo                      |
| -------------------- | ------------------------------ | ----------------------------------------------------------------------------------- | ------------------------------ |
| activeTabChange      | `EventEmitter<number\|string>` | 可选，选项卡切换的回调函数，返回当前激活选项卡的 id                                 | [基本用法](demo#basic-usage)   |
| addOrDeleteTabChange | `EventEmitter<number\|string>` | 可选，添加、删除选项卡的回调函数，返回操作的选项卡 id 和 operation（add \| delete） | [添加 / 删除](demo#add-delete) |

### d-tab 参数

| 参数     | 类型             | 默认  | 说明                        | 跳转 Demo                         |
| -------- | ---------------- | ----- | --------------------------- | --------------------------------- |
| id       | `number\|string` | --    | 可选，用来标识 tab 的唯一值 | [基本用法](demo#basic-usage)      |
| title    | `string`         | --    | 可选，选项卡的标题          | [基本用法](demo#basic-usage)      |
| disabled | `boolean`        | false | 可选，选项卡是否不可用      | [不设置内容](demo#no-set-content) |
