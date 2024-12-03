# 如何使用

在 module 中引入：

```ts
import { TextareaModule } from 'ng-devui/textarea';
```

在页面中使用：

```xml
<textarea dTextarea></textarea>
<d-textarea-max-length></d-textarea-max-length>
```

## dTextarea

### dTextarea 参数

| 参数                 | 类型                                                | 默认      | 说明                                                                                 | 跳转 Demo                        | 全局配置项 |
| -------------------- | --------------------------------------------------- | --------- | ------------------------------------------------------------------------------------ | -------------------------------- | ---------- |
| error                | `boolean`                                           | false     | 可选，文本框是否出现输入错误                                                         | [基本用法](demo#basic-usage)     |            |
| maxLengthBlocker     | `boolean`                                           | false     | 可选，文本框输入中文符号超出 maxLength 限制时可开启                                  |                                  |            |
| ~~maxLengthCounter~~ | `boolean`                                           | false     | 可选，文本框输入内容长度统计                                                         | [监听输入及最大字数](demo#count) |            |
| resize               | `none \| vertical \| horizontal \| both \| inherit` | none      | 可选，文本框是否可调整大小，可选项：不可调整，水平调整，垂直调整，自由调整，默认继承 | [调整大小](demo#resize)          |            |
| showGlowStyle        | `boolean`                                           | true      | 可选，是否显示悬浮发光效果                                                           |                                  | ✔          |
| styleType            | `'default' \| 'gray'`                               | 'default' | 可选，default 为默认有线框白底风格，gray 为无线框灰底风格                            |                                  | ✔          |

## dTextareaMaxLength

### dTextareaMaxLength 参数

| 参数             | 类型                                                | 默认      | 说明                                                                                 | 跳转 Demo                        | 全局配置项 |
| ---------------- | --------------------------------------------------- | --------- | ------------------------------------------------------------------------------------ | -------------------------------- | ---------- |
| disabled         | `boolean`                                           | false     | 可选，文本框是否禁用                                                                 |                                  |            |
| error            | `boolean`                                           | false     | 可选，文本框是否出现输入错误                                                         |                                  |            |
| maxWidth         | `string`                                            | --        | 可选，文本框最大宽度                                                                 | [监听输入及最大字数](demo#count) |            |
| maxHeight        | `string`                                            | --        | 可选，文本框最大高度                                                                 | [监听输入及最大字数](demo#count) |            |
| maxLength        | `number`                                            | --        | 可选，文本框可输入最大长度                                                           | [监听输入及最大字数](demo#count) |            |
| maxLengthBlocker | `boolean`                                           | false     | 可选，文本框输入中文符号超出 maxLength 限制时可开启                                  |                                  |            |
| placeholder      | `string`                                            | --        | 可选，文本框占位符                                                                   | [监听输入及最大字数](demo#count) |            |
| rows             | `number`                                            | 3         | 可选，文本框行数                                                                     |                                  |            |
| resize           | `none \| vertical \| horizontal \| both \| inherit` | none      | 可选，文本框是否可调整大小，可选项：不可调整，水平调整，垂直调整，自由调整，默认继承 | [监听输入及最大字数](demo#count) |            |
| showGlowStyle    | `boolean`                                           | true      | 可选，是否显示悬浮发光效果                                                           |                                  | ✔          |
| styleType        | `'default' \| 'gray'`                               | 'default' | 可选，default 为默认有线框白底风格，gray 为无线框灰底风格                            |                                  | ✔          |
