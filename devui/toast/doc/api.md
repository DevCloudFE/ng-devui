| 参数        | 类型          | 默认        |   说明                 |
| :---------: | :----------: | :---------: | :------------------------------------------|
| life        | number       | 3000        | 超时时间，单位毫秒，默认为3000毫秒 |
| sticky       | boolean      | false       | 是否常驻，默认自动关闭 |
| style       | string       | (none)      | 样式 |
| styleClass  | string       | (none)      | 类名 |
| value |  Array<Message> | -- | 消息内容|

#### Message 
```
Message {
  severity?: string;
  summary?: string;
  detail?: string;
  id?: any;
}
```
