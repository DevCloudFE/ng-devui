# 如何使用

在module中引入：

```ts
import { AlertModule } from 'ng-devui/alert';
```

在页面中使用：

```xml
<d-alert></d-alert>
```
# d-alert
## d-alert 参数

|    参数     |                   类型                   |  默认  | 说明                                      | 跳转 Demo                                  |全局配置项| 
| :----------------: | :---------: | :--------------------------------------: | :----: | :---------------------------------------- | ------------------------------------------ |
|    type     |               [`AlertType`](#alerttype)    | 'info' |       必选，指定警告提示的样式        | [基本用法](demo#basic-usage) |
|  cssClass   |                 `string`                 |   --   | 可选，自定义 class 名                     |
|  closeable  |                `boolean`                 |  true  | 可选，默认显示关闭按钮                    | [基本用法](demo#tips-to-close) |
| dismissTime |                 `number`                 |   --   | 可选，自动关闭 alert 的延迟时间（`ms`） |
|  showIcon   |                `boolean`                 |  true  | 可选，是否使用默认的类型图标              | [不使用默认图标](demo#without-icon) |

## d-alert 事件

|    参数    |        类型         | 说明                       | 跳转 Demo                                    |
| :--------: | :-----------------: | :------------------------- | -------------------------------------------- |
| closeEvent | `EventEmitter<AlertComponent>` | 可选，关闭时触发的回调函数 | [可关闭的提示](demo#tips-to-close) |

# 接口 & 类型定义
### AlertType

默认值为'info'， 指定alert警告提示的类型

```ts
export type AlertType = 'success' | 'danger' | 'warning' | 'info' | 'simple';
```