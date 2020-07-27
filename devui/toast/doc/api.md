### d-toast 参数

|    参数    |       类型       |    默认    | 说明                                                                                                                        | 跳转 Demo                                  |
| :--------: | :--------------: | :--------: | :-------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
|   value    | `Array<Message>` |     --     | 必选，消息内容数组，Message 对象定义见下文                                                                                  | [基本用法](/components/toast/demo#basic-usage) |
|    life    |     `number`     | 5000/10000 | 可选，超时时间，超时后自动消失，鼠标悬停可以阻止消失，单位毫秒。普通、成功、提示类默认为 5000 毫秒，错误、警告类默认为 10000 毫秒 |
|    lifeMode    |     `string`     | global | 可选，超时时间模式，预设值为 global 和 single 。默认为 global，所有消息使用 life 或群组第一个消息的预设超时时间； 设置为 single 时， 每个消息使用自身的超时时间，参见 Message 中的 life 定义 |
|   sticky   |    `boolean`     |   false    | 可选，是否常驻，默认自动关闭                                                                                                |
|   style    |     `string`     |     --     | 可选，样式                                                                                                                  |
| styleClass |     `string`     |     --     | 可选，类名                                                                                                                  |

### d-toast 事件

|    参数     |           类型            | 说明                                                                           |
| :---------: | :-----------------------: |  :----------------------------------------------------------------------------- |
| closeEvent  |    `EventEmitter<any>`    |  可选，返回被手动关闭或自动消失的单条消息内容                                   |
| valueChange | `EventEmitter<Message[]>` |  可选，返回变化（手动关闭或自动消失）后剩余消息内容数组，Message 对象定义见下文 |

#### Message 定义

```
Message {
  severity?: string; // 预设值有common、success、error、warn、info，超时时间参见life说明，未设置或非预设值时超时时间为 5000 毫秒
  summary?: string; // 消息标题。当设置超时时间，未设置标题时，不展示标题和关闭按钮
  detail?: string; // 消息内容
  life?: number; // 单个消息超时时间，需设置 lifeMode 为 single 。每个消息使用自己的超时时间，开启该模式却未设置时按 severity 判断超时时间
  id?: any; // 消息ID
}
```
