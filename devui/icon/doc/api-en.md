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

| Parameter |            Type            | Default | Description                                                                                                                  |
| :-------: | :------------------------: | :-----: | :--------------------------------------------------------------------------------------------------------------------------- |
|   icon    | `string\|TemplateRef<any>` |   --    | (mandatory). Transfer the [icon library](/icon/zh-cn/ruleResource) icon, for example, 'icon-add' |
| operable  |         `boolean`          |  false  | Optional. Indicates whether the icon is operable.                                                                            |
| disabled  |         `boolean`          |  false  | Optional. Indicates whether the icon is disabled.                                                                            |
|  rotate   |   `number\|'infinite'`   |   --    | Optional. Rotation angle of the icon. If the value is ‘infinite’, the icon rotates continuously.                               |
|   color   |          `string`          |   --    | Optional. Set the color of the icon.                                                                                         |
