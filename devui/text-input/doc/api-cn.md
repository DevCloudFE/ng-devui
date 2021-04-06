# 如何使用

在module中引入：

```ts
import { TextInputModule } from 'ng-devui/text-input';
```

在页面中使用：

```xml
<input dTextInput />
```

# dTextInput
## dTextInput 参数

|    参数     |   类型    | 默认  |             说明             | 跳转 Demo                                       |全局配置项| 
| :----------------: | :---------: | :-------: | :---: | :--------------------------: | ----------------------------------------------- |
|     id      | `string`  |  --   |       可选，文本框 id        |[基本用法](demo#basic-usage)|
| placeholder | `string`  |  --   |   可选，文本框 placeholder   | [基本用法](demo#basic-usage) |
|  disabled   | `boolean` | false |    可选，文本框是否被禁用    | [基本用法](demo#basic-usage) |
|    error    | `boolean` | false | 可选，文本框是否出现输入错误 | [基本用法](demo#basic-usage) |
|    size     | `'sm'\|''\|'lg'`  |  ''   | 可选，文本框尺寸，有三种选择`'lg'`,`''`,`'sm'` | [尺寸](demo#size) |
