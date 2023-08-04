# 如何使用

在 module 中引入：

```ts
import { InputGroupModule } from 'ng-devui/input-group';
```

在页面中使用：

```xml
<d-input-group></d-input-group>
```

## d-input-group

### d-input-group 参数

| 参数          | 类型                         | 默认                    | 说明                                           | 跳转 Demo                    | 全局配置项 |
| ------------- | ---------------------------- | ----------------------- | ---------------------------------------------- | ---------------------------- | ---------- |
| prefixContent | `'string \| TemplateRef<any` | --                      | 可选，设置前缀                                 | [基本用法](demo#basic-usage) |
| suffixContent | `'string\| TemplateRef<any`  | --                      | 可选，设置后缀                                 | [基本用法](demo#basic-usage) |
| spliceType    | `ISpliceType`                | <pre>'standalone'</pre> | 可选，设置自适应拼接类型，注意拼接双方都要设置 | [基本用法](demo#basic-usage) |
| isEmbed       | `boolean`                    | false                   | 可选，配合 dTextInput 使用，将前后缀嵌入输入框 | [嵌入用法](demo#embed-usage) |
| disabled      | `boolean`                    | false                   | 可选，配合 isEmbed 使用，设置禁用状态          | [嵌入用法](demo#embed-usage) |

## 接口 & 类型定义

### ISpliceType

默认值为'standalone'， 设置自适应拼接类型，注意拼接双方都要设置

```ts
export type ISpliceType = 'standalone' | 'left' | 'right' | 'both';
```
