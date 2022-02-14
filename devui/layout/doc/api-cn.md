# 如何使用

在 module 中使用：

```ts
import { LayoutModule } from 'ng-devui';
```

在全局样式中，引入：
```css
@import '~ng-devui/devui-layout.css';
```

在页面中使用：

```html
<!-- 栅格 -->
<d-row>
  <d-col>
  </d-col>
</d-row>

<!-- Flex，栅格容器默认已添加[dFlex]标识 -->
<xxx [dFlex]>
</xxx>

<!-- Space -->
<xxx [dSpace]="xxxx">
  <xx>
  </xx>
  <xx>
  </xx>
</xxx>

<!-- Gutter -->
<xxx [dGutter]="xxxx">
  <xx>
  </xx>
  <xx>
  </xx>
</xxx>

<!-- Class -->
<xxx [dClass]="xxxx">
</xxx>

<!-- Style -->
<xxx [dStyle]="xxxx">
</xxx>

<!-- 如果需要使用布局容器 -->
<d-layout>
  <d-header></d-header>
  <d-content></d-content>
  <d-footer></d-footer>
</d-layout>
```


# d-row
栅格布局行容器，已默认绑定`dFlex`指令，并设定为行容器，可使用 `dFlex（已默认绑定）、dPace、dGutter、dClass、dStyle` 指令进行更多布局设置。

# d-col
栅格布局列容器，预期为 `d-row` 的子元素，已默认绑定 `dFlex` 指令，可使用 `dFlex（已默认绑定）、dPace、dGutter、dClass、dStyle` 指令进行更多布局设置。

## d-col 参数
|    参数     |      类型   |  默认   | 说明  | 跳转 Demo |全局配置项| 
| :----------------: | :---------: | :------------:  | :-----: | :------------------  |   |
|  dSpan | [`DResponseParameter`](#dresponseparameter)`<[0 - 24] \| 'auto'>` |   --    | 设置栅格所占份数（0 - 24）|   [栅格基本用法](demo#basic-usage)  |
|  dOffset | [`DResponseParameter`](#dresponseparameter)`<[0 - 24]>` |   --    | 设置元素间隔栅格份数（0 - 24）|   [左右偏移](demo#offset)  |

# dFlex
用于快速设置 `Flex` 布局属性的指令，已默认绑定到 `d-row`、`d-col` 容器，也使用于其他任何需要使用 `flex` 布局的元素上。
## dFlex 参数
|    参数     |      类型   |  默认   | 说明  | 跳转 Demo |全局配置项| 
| :----------------: | :---------: | :------------:  | :-----: | :------------------  |   |
|  dFlex | [`DResponseParameter`](#dresponseparameter)`<number \| string>` |   --    | 设置元素flex属性 |   [Flex使用](demo#flex)  |
|  dFlexContainer | `'row' \| 'column'` |   --    | 设置元素是否为flex容器且设置子元素排列方向 |   [Flex使用](demo#flex)  |
|  dAlign | [`DResponseParameter`](#dresponseparameter)`<`[`DAlign`](#dalign)`>` |   --    | 设置子元素交叉轴对齐方式 |   [对齐](demo#align-justify)  |
|  dJustify | [`DResponseParameter`](#dresponseparameter)`<`[`DJustify`](#djustify)`>` |   --    | 设置子元素主轴对齐方式 | [对齐](demo#align-justify) |
|  dAlignSelf | [`DResponseParameter`](#dresponseparameter)`<`[`DAlignSelf`](#dalignself)`>` |   --    | 设置元素自身交叉轴对齐方式 |   [对齐](demo#align-justify)  |
|  dOrder | [`DResponseParameter`](#dresponseparameter)`<[0 - 24]>` |   --    | 设置元素排序（0 - 24）|   [排序](demo#order)  |

# dSpace
以设置子元素margin值方式，实现子元素间距控制。
## dSpace 参数
|    参数     |      类型   |  默认   | 说明  | 跳转 Demo |全局配置项| 
| :----------------: | :---------: | :------------:  | :-----: | :------------------  |   |
|  dSpace | [`DResponseParameter`](#dresponseparameter)`<number \| [number, number]>` |   --    | 设置子级元素间距值 |   [栅格间距（Space）](demo#space)  |
|  dSpaceDirection | [`DResponseParameter`](#dresponseparameter)`<'vertical' \| 'horizontal'>` |   'vertical'    | 设置默认间距方向 |   [栅格间距（Space）](demo#space)  |

# dGutter
以设置子元素padding值方式，实现子元素间间距控制。
## dGutter 参数
|    参数     |      类型   |  默认   | 说明  | 跳转 Demo |全局配置项| 
| :----------------: | :---------: | :------------:  | :-----: | :------------------  |   |
|  dGutter | [`DResponseParameter`](#dresponseparameter)`<number \| [number, number]>` |   --    | 设置子级元素间距值 |   [栅格间距（Gutter）](demo#gutter)  |
|  dGutterDirection | [`DResponseParameter`](#dresponseparameter)`<'vertical' \| 'horizontal'>` |   'horizontal'    | 设置默认间距方向 |   [栅格间距（Gutter）](demo#gutter)  |
|  dGutterNoOuter | [`DResponseParameter`](#dresponseparameter)`<boolean>` |   false    | 设置是否消除设置子元素padding对整体布局外层产生的边距 |   [间距（通用）](demo#space-gutter)  |

# dClass
可使用[dClass]对元素进行 `class` 名绑定设置，支持响应式并可在不同断点下 `class` 合并。
## dClass 参数
|    参数     |      类型   |  默认   | 说明  | 跳转 Demo |全局配置项| 
| :----------------: | :---------: | :------------:  | :-----: | :------------------  |   |
|  dClass | [`DResponseParameter`](#dresponseparameter)`<string[]>` |   --    | 设置需要的class名数组 |   [响应式Class](demo#class)  |

# dStyle
可使用[dStyle]对元素进行 `style` 名绑定设置，支持响应式并可在不同断点下 `style` 合并。

## dStyle 参数
|    参数     |      类型   |  默认   | 说明  | 跳转 Demo |全局配置项| 
| :----------------: | :---------: | :------------:  | :-----: | :------------------  |   |
|  dStyle | [`DResponseParameter`](#dresponseparameter)`<styleObject>` |   --    | 设置需要的class名数组 |   [响应式Style](demo#style)  |

# d-layout

布局容器，可以与`d-header`, `d-content`, `d-footer`, `d-aside`组合实现布局；
`d-layout`下可嵌套元素：`d-header`, `d-content`, `d-aside`, `d-layout`。

# d-header

顶部布局，只能放在`d-layout`容器中，作为`d-layout`容器的顶部实现。
默认高度：40px。

# d-footer

底部布局，只能放在`d-layout`容器中，作为`d-layout`容器的底部实现。

# d-content

内容容器，只能放在`d-layout`容器中，作为`d-layout`容器`d-header`与`d-footer`之间的内容。

# d-aside

侧边栏，只能放在`d-layout`容器中，作为`d-layout`容器的侧边栏部分。


# 接口 & 类型定义

### DJustify
```ts
export type DJustify = 'start' | 'end' | 'center' | 'around' | 'between';
```

### DAlign
```ts
export type DAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch';
```

### DAlignSelf
``` ts
export type DAlignSelf = 'start' | 'center' | 'end' | 'baseline' | 'stretch';
```

### DBreakpointsMap
```ts
export const DBreakpointsMap = {
  ss: 0,
  ms: 360,
  mm: 768,
  ml: 1024,
  xs: 1280,
  sm: 1440,
  md: 1600,
  lg: 1760,
  xl: 1920,
};
```

### DResponseParameter
```ts
export type DResponseParameter<T> = T | {
  ss?: T,
  ms?: T,
  mm?: T,
  ml?: T,
  xs?: T,
  sm?: T,
  md?: T,
  lg?: T,
  xl?: T,
}
```
