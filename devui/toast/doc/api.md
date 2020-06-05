<!--
 * @Author: your name
 * @Date: 2020-03-15 15:21:38
 * @LastEditTime: 2020-06-04 11:36:56
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \ng-devui\devui\toast\doc\api.md
--> 
| 参数        | 类型          | 默认        |   说明                 |
| :---------: | :----------: | :---------: | :------------------------------------------|
| value |  `Array<Message>` | -- | 必选，消息内容数组，Message对象定义见下文|
| life        | `number`       | 5000/10000        | 可选，超时时间，超时后自动消失，鼠标悬停可以阻止消失，单位毫秒，成功、提示类默认为5000毫秒，错误、警告类默认为10000毫秒 |
| sticky       | `boolean`      | false       | 可选，是否常驻，默认自动关闭 |
| style       | `string`       | --      | 可选，样式 |
| styleClass  | `string`       | --      | 可选，类名 |

### d-toast 事件

| 参数        | 类型          |   说明                 |
| :---------: | :----------: | :------------------------------------------|
| closeEvent |  `EventEmitter<any>` | 可选，返回被手动关闭或自动消失的单条消息内容|
| valueChange |  `EventEmitter<Message[]>` | 可选，返回变化（手动关闭或自动消失）后剩余消息内容数组，Message对象定义见下文|

#### Message 定义 
```
Message {
  severity?: string;
  summary?: string;
  detail?: string;
  id?: any;
}
```
