# 如何使用

在 module 中引入：

```ts
import { TextareaModule } from 'ng-devui/textarea';
```

在页面中使用：

```xml
<textarea dTextarea></textarea>
```

## dTextarea

### dTextarea 参数

| 参数             | 类型                                                | 默认      | 说明                                                                                 | 跳转 Demo                        | 全局配置项 |
| ---------------- | --------------------------------------------------- | --------- | ------------------------------------------------------------------------------------ | -------------------------------- | ---------- |
| error            | `boolean`                                           | false     | 可选，文本框是否出现输入错误                                                         | [基本用法](demo#basic-usage)     |            |
| maxLengthBlocker | `boolean`                                           | false     | 可选，文本框输入中文符号超出 maxLength 限制时可开启                                  |                                  |            |
| maxLengthCounter | `boolean`                                           | false     | 可选，文本框输入内容长度统计                                                         | [监听输入及最大字数](demo#count) |            |
| resize           | `none \| vertical \| horizontal \| both \| inherit` | none      | 可选，文本框是否可调整大小，可选项：不可调整，水平调整，垂直调整，自由调整，默认继承 | [调整大小](demo#resize)          |            |
| showGlowStyle    | `boolean`                                           | true      | 可选，是否显示悬浮发光效果                                                           |                                  | ✔          |
| styleType        | `'default' \| 'gray'`                               | 'default' | 可选，default 为默认有线框白底风格，gray 为无线框灰底风格                            |                                  | ✔          |
