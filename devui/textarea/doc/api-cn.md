# 如何使用

在module中引入：

```ts
import { TextareaModule } from 'ng-devui/textarea';
```

在页面中使用：

```xml
<textarea dTextarea></textarea>
```

# dTextarea
## dTextarea 参数

|    参数     |                    类型                     | 默认  |                                         说明                                         | 跳转 Demo                                     |全局配置项| 
| :----------------: | :---------: | :-----------------------------------------: | :---: | :----------------------------------------------------------------------------------: | --------------------------------------------- |
|     id      |                  `string`                   |  --   |                                   可选，文本框 id                                    | [基本用法](demo#basic-usage) |
| placeholder |                  `string`                   |  --   |                               可选，文本框 placeholder                               | [基本用法](demo#basic-usage) |
|  disabled   |                  `boolean`                  | false |                                可选，文本框是否被禁用                                | [基本用法](demo#basic-usage) |
|    error    |                  `boolean`                  | false |                             可选，文本框是否出现输入错误                             | [基本用法](demo#basic-usage) |
|   resize    | `none \| vertical \| horizontal \| both \| inherit` | none  | 可选，文本框是否可调整大小，可选项：不可调整，水平调整，垂直调整，自由调整，默认继承 | [调整大小](demo#resize)      |
