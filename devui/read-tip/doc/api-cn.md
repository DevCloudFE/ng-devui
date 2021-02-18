# 如何使用

在 module 中引入：

```ts
import { ReadTipModule } from 'ng-devui/read-tip';
```

在页面中使用：

```html
<xxx dReadTip [readTipOptions]="youOptions"> ... </xxx>
```

# dReadTip

## dReadTip 参数

|         参数         |                类型                 |            默认             | 说明                            | 跳转 Demo                                    |
| :------------------: | :---------------------------------: | :-------------------------: | :------------------------------ | -------------------------------------------- |
|    readTipOptions    | [`ReadTipOptions`](#readtipoptions) | [详见下方](#readtipoptions) | 必选，配置提示选项              | [基本用法](demo#basic)                       |
| readTipOptions.rules |   [`ReadTipRules`](#readtiprules)   |             --              | 必选，配置 readtip 内容         | [包括多个提示的 readtip](demo#multi-readtip) |
|   contentTemplate    |         `TemplateRef<any>`          |             --              | 可选，传入模板显示 readtip 内容 | [传入模板显示内容](demo#readtip-template)    |

# 接口 & 类型定义

### ReadTipOptions

```ts
export interface ReadTipOptions {
  trigger?: 'hover' | 'click'; // 默认值是 hover
  showAnimate?: boolean; // 默认值是 false
  mouseenterTime?: number; // 默认值是 100
  mouseleaveTime?: number; // 默认值是 100
  position?: PositionType | PositionType[]; // 默认值是 'top'
  overlayClassName?: string; // 默认值为空字符串
  rules: ReadTipRules;
}
```

### ReadTipRules

```ts
export type ReadTipRules = ReadTipRule | ReadTipRule[];

export interface ReadTipRule {
  key?: string;
  selector: string;
  trigger?: 'hover' | 'click'; // 可以继承自 ReadTipOptions
  title?: string;
  content?: string;
  showAnimate?: boolean; // 可以继承自 ReadTipOptions
  mouseenterTime?: number; // 可以继承自 ReadTipOptions
  mouseleaveTime?: number; // 可以继承自 ReadTipOptions
  position?: PositionType | PositionType[]; // 可以继承自 ReadTipOptions
  overlayClassName?: string; // 可以继承自 ReadTipOptions
  dataFn?: ({ element, rule: ReadTipRule }) => Observable<{ title?: string; content?: string; template?: TemplateRef<any> }>;
}
```
