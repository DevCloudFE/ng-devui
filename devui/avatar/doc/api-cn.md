# 如何使用

在module中引入：

```ts
import { AvatarModule } from 'ng-devui/avatar';
```

在页面中使用：

```xml
<d-avatar></d-avatar>
```

# d-avatar
## d-avatar 参数

|    参数    |          类型          | 默认值 | 描述                                                                        | 跳转 Demo                                                     |全局配置项| 
| :----------------: | :--------: | :--------------------: | :--: | :-------------------------------------------------------------------------- | ------------------------------------------------------------- |
|    name    |        `string`        |  --  | 必选，传入字符串用于制作头像                                                | [头像显示的基本规则](demo#basic-rules)     |
|   gender   | `string \| male \| female` |  --  | 可选，根据性别区分头像颜色，传入 string，可以是`female \| male`的任意大小写形式 | [头像显示的基本规则](demo#basic-rules)     |
|   width    |        `number`        |  40  | 可选，设定头像的宽度， 单位为`px`                                            | [头像的基础配置](demo#basic-configuration) |
|   height   |        `number`        |  40  | 可选，设定头像的高度，单位为`px`                                            | [头像的基础配置](demo#basic-configuration) |
|  isRound   |       `boolean`        | true | 可选，是否显示为圆形头像                                                    | [头像的基础配置](demo#basic-configuration) |
|   imgSrc   |        `string`        |  --  | 可选，传入自定义图片作为头像                                                | [头像的基础配置](demo#basic-configuration) |
| customText |        `string`        |  --  | 可选，传入自定义显示文字                                                    | [头像的基础配置](demo#basic-configuration) |

### 头像显示基本规则

- `中文开头`：取传入字符串的最后两个字符
- `英文开头`：取传入字符串的前面两个字符
- `多个英文名连用`：取传入字符串的前两个英文名首字母
- `非中英文开头`：取传入字符串的前两个字符

### 头像特殊显示规则

- 未传入`name`，`customText`，`imgSrc`，视为使用该头像的用户不存在
- 传入`name`，`customText`，`imgSrc`的值为空，视为使用该头像的用户无昵称，使用默认头像

### 显示优先级排序

imgSrc > customText > name
