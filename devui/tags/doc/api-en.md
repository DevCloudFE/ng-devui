# How to use
Import into module:
```ts
import { TagsModule } from 'ng-devui/tags';
```

In the page:
```html
<d-tag [tag]="'Default Tags Color'"></d-tag>
```
# Tags

## d-tag parameter

|          Parameter          |     Type      | Default | Description                                                                                                                                                           | Jump to Demo                                     |
| :-------------------------: | :-----------: | :-----: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
|             tag             |   `string`    |   --    | Required. The entered tag and selected tag are recorded.                                                                                                              | [Single Tag](demo#single-tag)   |
|        titleContent         |   `string`    |   --    | Optional. Sets the title displayed when the cursor is hovered.                                                                                                        | [Single Tag](demo#single-tag)   |
|         labelStyle          |   `string`    |   ''    | Optional. The label can be blue-w98, aqua-w98, olivine-w98, green-w98, yellow-w98, orange-w98, pink-w98, red-w98, or purple-w98, you can also transfer a custom class. | [Single Tag](demo#single-tag)   | .   |
|         deleteable          |   `boolean`   |  false  | Optional. Specifies whether a tag can be deleted.                                                                                                                     | [Single Tag](demo#single-tag)   |
| customViewTemplate Template | `TemplateRef` |   --    | Optional. Custom tag template.     | [Single Tag](demo#single-tag)   |
|           checked           |   `boolean`   |  false  | Optional. Initial status of a tag. selected.                                                                                                                           | [Single Tag](demo#single-tag)   |
|         customColor         |   `string`    |   ''    | Optional. Enter a color string (for example, '#f50') and customize the color label.                                                                                   | [Single Tag](demo#single-tag) |

## d-tag event

| Event name |                   Type                   | Description                           | Jump to Demo                                   |
| :--------: | :--------------------------------------: | :------------------------------------ | ---------------------------------------------- |
| tagDelete  | `EventEmitter<{tag: tag, event: event}>` | Event triggered when a tag is deleted. | [Single Tag](demo#single-tag) |

## d-tags parameter

|    Parameter    |   Type    | Default | Description                                                                                         | Jump to Demo                                  |
| :-------------: | :-------: | :-----: | :-------------------------------------------------------------------------------------------------- | --------------------------------------------- |
|      tags       |  `Array`  |   []    | Required. It records the entered tag and selected tag.                                              | [Tag Group](demo#tags-group) |
| displayProperty | `string`  |   ''    | Optional. Set the attribute name to the value of the attribute.                                     | [Tag Group](demo#tags-group) |
|   deleteable    | `boolean` |  false  | Optional. Specifies whether a tag can be deleted.                                                   | [Tag Group](demo#tags-group) |
|  titleProperty  | `string`  |   ''    | Optional. Sets the attribute name. When the cursor is hovered, the value of the title is displayed. | [Tag Group](demo#tags-group) |

## d-tags event

| Event name |                          Type                          | Description                           | Jump to Demo                                  |
| :--------: | :----------------------------------------------------: | :------------------------------------ | --------------------------------------------- |
| tagDelete  | `EventEmitter<{tag: tag, index: index, event: event}>` | Event triggered when a tag is deleted. | [Tag Group](demo#tags-group) |
