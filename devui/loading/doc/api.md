### [dLoading] 参数

|        参数        |             类型             |          默认          | 说明                                                                | 跳转 Demo                                      |
| :----------------: | :--------------------------: | :--------------------: | :------------------------------------------------------------------ | ---------------------------------------------- |
|      loading       |        `LoadingType`         |           --           | 可选，控制 loading 状态                                             | [基本用法](/components/loading/demo#basic-usage)   |
|      message       |           `string`           |           --           | 可选，loading 时的提示信息                                          | [多promise](/components/loading/demo#multi-promise) |
| loadingTemplateRef |      `TemplateRef<any>`      |           --           | 可选，自定义 loading 模板                                           | [自定义样式](/components/loading/demo#custom-style)  |
|      backdrop      |          `boolean`           |           --           | 可选，loading 时是否显示遮罩                                        | [基本用法](/components/loading/demo#basic-usage)   |
|    showLoading     |          `boolean`           |           --           | 可选，手动启动和关闭 loading 状态,与`loading`参数不能同时使用       |[使用showLoading控制](/components/loading/demo#show-loading)
|    positionType    |           `string`           |       'relative'       | 可选，指定`dLoading`宿主元素的定位类型,取值与 css position 属性一致 |[使用showLoading控制](/components/loading/demo#show-loading)
|        view        | `{top?:string,left?:string}` | {top:'50%',left:'50%'} | 可选，调整 loading 的显示位置，相对于宿主元素的顶部距离与左侧距离   | [基本用法](/components/loading/demo#basic-usage)   |

LoadingType 为 `Observable<any> | Promise<any> | Array<Promise<any>> | Array<Observable<any>> | undefined`
