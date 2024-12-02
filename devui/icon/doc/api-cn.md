## 如何使用

在 module 中引入：

```typescript
import { IconModule } from 'ng-devui/icon';
```

页面中使用：

```html
<d-icon></d-icon>

<d-icon-group>
  <d-icon></d-icon>
  <d-icon></d-icon>
</d-icon-group>
```

# d-icon

### d-icon 参数

|   参数   |            类型            | 默认  | 说明                                                                                        |
| :------: | :------------------------: | :---: | :------------------------------------------------------------------------------------------ |
|   icon   | `string\|TemplateRef<any>` |  --   | 必选，传入[图标库](/icon/zh-cn/ruleResource)图标，例如 'icon-add' |
| operable |         `boolean`          | false | 可选，图标是否可操作                                                                        |
| disabled |         `boolean`          | false | 可选，图标是否禁用                                                                          |
|  rotate  |    `number\|'infinite'`    |  --   | 可选，图标的旋转角度，设置为'infinite'时图标会保持持续旋转                                  |
|  color  |    `string`    |  --   | 可选，图标的颜色设置                                |
