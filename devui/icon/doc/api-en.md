## 如何使用

Import into module：

```typescript
import { IconModule } from 'ng-devui/icon';
```

In the page：

```html
<d-icon></d-icon>

<d-icon-group>
  <d-icon></d-icon>
  <d-icon></d-icon>
</d-icon-group>
```

# d-icon

### d-icon parameter

| Parameter |            Type            | Default | Description                                                                                                                                                                     |
| :-------: | :------------------------: | :-----: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|   icon    | `string\|TemplateRef<any>` |   --    | (mandatory). The [icon library] (https://devui.design/icon/ruleResource) icon is transferred, for example, 'icon-add' or a customized template can be transferred. |
| operable  |         `boolean`          |  false  | Optional. Indicates whether the icon is operable.                                                                                                                               |
| disabled  |         `boolean`          |  false  | Optional. Indicates whether the icon is disabled.                                                                                                                               |
