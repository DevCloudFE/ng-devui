# 如何使用

在 module 中使用：

```ts
import { LayoutModule } from 'ng-devui';
```

在页面中使用：

```html
<d-layout>
  <d-header></d-header>
  <d-content></d-content>
  <d-footer></d-footer>
</d-layout>
```

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
