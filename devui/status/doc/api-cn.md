# 如何使用

在 module 中引入：

```ts
import { StatusModule } from 'ng-devui/status';
```

在页面中使用：

```html
<d-status></d-status>
```

## d-status

### d-status 参数

| 参数 | 类型                                                                             | 默认 | 说明                                                                                            | 跳转 Demo                    | 全局配置项 |
| ---- | -------------------------------------------------------------------------------- | ---- | ----------------------------------------------------------------------------------------------- | ---------------------------- | ---------- |
| type | `success\|error\|warning\|waiting\|running\|invalid\|initial\|skipped\|canceled` | --   | 必选，类型，值有 success、error、warning、waiting、running、invalid、initial、skipped、canceled | [基本用法](demo#basic-usage) |
