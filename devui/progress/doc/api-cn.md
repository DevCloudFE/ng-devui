# 如何使用

在 module 中引入：

```ts
import { ProgressModule } from 'ng-devui/progress';
```

在页面中使用：

```html
<d-progress></d-progress>
```

## d-progress

### d-progress 参数

| 参数                | 类型                           | 默认值 | 描述                                                                      | 跳转 Demo                               | 全局配置项 |
| ------------------- | ------------------------------ | ------ | ------------------------------------------------------------------------- | --------------------------------------- | ---------- |
| type                | `line \| circle`               | line   | 可选，显示进度条的类型                                                    | [环形进度条](demo#circle-usage)         |
| percentage          | `number`                       | 0      | 可选，进度条占容器显示的比例，最大值为 100                                | [线形进度条](demo#basic-usage)          |
| percentageText      | `string`                       | --     | 可选，进度条当前值的文字说明比如：'30%' \| '4/5'                          | [线形进度条](demo#basic-usage)          |
| showContent         | `boolean \| ShowContentConfig` | --     | 可选，设置环形进度条内是否展示内容                                        | [自定义多色进度条](demo#multiple-usage) |
| strokeColor         | `string \| IGradientColor[]`   | --     | 可选，进度条的颜色显示，默认为颜色变量 --devui-brand 的值，支持使用渐变色 | [自定义多色进度条](demo#multiple-usage) |
| strokeWidth         | `number`                       | 14     | 可选，进度条的线条宽度                                                    | [环形进度条](demo#circle-usage)         |
| multiProgressConfig | `IProgressItem[]`              | []     | 可选，多段进度条的配置数据，参见 IProgressItem 类型定义                   | [自定义多色进度条](demo#multiple-usage) |

## 接口 & 类型定义

```typescript
export interface IProgressItem {
  color: string; // 进度条色值
  percentage: number; // 进度条的进度
  percentageText?: string; // 进度条文字信息
  [key: string]: any;
}

export interface IGradientColor {
  color: string; // 渐变色的色值，线条进度条渐变色从左至右显示，如不设置颜色则按line-gradient样式规则设置渐变色范围
  percentage: string; // 渐变色的百分比
}

export interface ShowContentConfig {
  showInnerContent?: boolean; // 是否显示进度条上的文字信息，默认为关闭
  showOuterContent?: boolean; // 是否显示进度条右侧的文字信息，默认为显示
}
```
