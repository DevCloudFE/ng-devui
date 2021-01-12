### d-avatar 参数

|    参数    |          类型          | 默认 | 说明                                                                        | 跳转 Demo                                                     |
| :--------: | :--------------------: | :--: | :-------------------------------------------------------------------------- | ------------------------------------------------------------- |
|    name    |        `string`        |  --  | 必选，传入字符串用于制作头像                                                | [头像显示的基本规则](demo#basic-rules)     |
|   gender   | `string\|male\|female` |  --  | 可选，根据性别区分头像颜色,传入 string 可以是`female\|male`的任意大小写形式 | [头像显示的基本规则](demo#basic-rules)     |
|   width    |        `number`        |  40  | 可选，设定头像的宽度, 单位为'px'                                            | [头像的基础配置](demo#basic-configuration) |
|   height   |        `number`        |  40  | 可选，设定头像的高度,单位为'px'                                             | [头像的基础配置](demo#basic-configuration) |
|  isRound   |       `boolean`        | true | 可选，是否显示为圆形头像                                                    | [头像的基础配置](demo#basic-configuration) |
|   imgSrc   |        `string`        |  --  | 可选，传入自定义图片作为头像                                                | [头像的基础配置](demo#basic-configuration) |
| customText |        `string`        |  --  | 可选，传入自定义显示文字                                                    | [头像的基础配置](demo#basic-configuration) |

#### 显示优先级排序

imgSrc > customText > name
