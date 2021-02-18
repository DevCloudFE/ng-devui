# How to use

Import into module:

```ts
import { LayoutModule } from 'ng-devui';
```

In the page:

```html
<d-layout>
  <d-header></d-header>
  <d-content></d-content>
  <d-footer></d-footer>
</d-layout>
```

# d-layout

Layout container, which can be combined with `d-header`, `d-content`, `d-footer`, `d-aside` to implement layout.
Elements that can be nested under `d-layout`: `d-header`, `d-content`, `d-aside`, `d-layout`.

# d-header

Top layout, which can be implemented only in the `d-layout` container as the top of the `d-layout` container.
Default height: 40 px

# d-footer

Bottom layout, which can be implemented only in the `d-layout` container as the bottom of the `d-layout` container.

# d-content

Content container, which can be placed only in the `d-layout` container as the content between `d-header` and `d-footer` in the `d-layout` container.

# d-aside

Sidebar, which can only be placed in the `d-layout` container as the sidebar part of the `d-layout` container.
