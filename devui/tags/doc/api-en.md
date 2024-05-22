# How to use

Import into module:

```ts
import { TagsModule } from 'ng-devui/tags';
```

In the page:

```html
<d-tag [tag]="'Default Tag Color'"></d-tag>
```

## Tags

### d-tag parameter

| Parameter                   | Type                                                             | Default   | Description                                                                                                                                                          | Jump to Demo                  | Global Config |
| --------------------------- | ---------------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------------- |
| tag                         | `string`                                                         | --        | Required. The entered tag and selected tag are recorded.                                                                                                             | [Single Tag](demo#single-tag) |
| mode                        | `ITagMode`                                                       | 'default' | Optional. Tag type, The options are as follows: `'default' \| 'checkable' \| 'closeable'`                                                                            | [Single Tag](demo#single-tag) |
| size                        | `ITagSize`                                                       | 'md'      | Optional. Tag size, The options are as follows: `'md' \| 'lg'`                                                                                                       | [Single Tag](demo#single-tag) |
| titleContent                | `string`                                                         | --        | Optional. Sets the title displayed when the cursor is hovered.                                                                                                       | [Single Tag](demo#single-tag) |
| labelStyle                  | `string`                                                         | ''        | Optional. The tag can be blue-w98, aqua-w98, olivine-w98, green-w98, yellow-w98, orange-w98, pink-w98, red-w98, or purple-w98, you can also transfer a custom class. | [Single Tag](demo#single-tag) | .             |
| deleteable                  | `boolean`                                                        | false     | Optional. Specifies whether a tag can be deleted.                                                                                                                    | [Single Tag](demo#single-tag) |
| customViewTemplate Template | `TemplateRef`                                                    | --        | Optional. Custom tag template.                                                                                                                                       | [Single Tag](demo#single-tag) |
| checked                     | `boolean`                                                        | false     | Optional. Initial status of a tag. selected.                                                                                                                         | [Single Tag](demo#single-tag) |
| customColor                 | `string`                                                         | ''        | Optional. Enter a color string (for example, '#f50') and customize the color label.                                                                                  | [Single Tag](demo#single-tag) |
| maxWidth                    | `string`                                                         | --        | Optional. Indicates the maximum width of the label. If the label exceeds the maximum width, the text is omitted and an ellipsis is displayed.                        | [Single Tag](demo#single-tag) |
| beforeDelete                | `(tag?: string)=>boolean\|Promise<boolean>\|Observable<boolean>` | --        | Optional. Delete previous callbacks.                                                                                                                                 |

### d-tag event

| Event name    | Type                                     | Description                                                  | Jump to Demo                  |
| ------------- | ---------------------------------------- | ------------------------------------------------------------ | ----------------------------- |
| tagDelete     | `EventEmitter<{tag: tag, event: event}>` | Event triggered when a tag is deleted.                       | [Single Tag](demo#single-tag) |
| checkedChange | `EventEmitter<boolean>`                  | Event triggered when the selected status of the tag changes. |                               |

### d-tags parameter

| Parameter       | Type                                                             | Default   | Description                                                                                         | Jump to Demo                              |
| --------------- | ---------------------------------------------------------------- | --------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| tags            | `Array`                                                          | []        | Required. It records the entered tag and selected tag.                                              | [Tag Group](demo#tags-group)              |
| mode            | `ITagMode`                                                       | 'default' | Optional. Tag type, The options are as follows: `'default' \| 'checkable' \| 'closeable'`           | [Tag Group](demo#single-tag)              |
| size            | `ITagSize`                                                       | 'md'      | Optional. Tag size, The options are as follows: `'md' \| 'lg'`                                      | [Tag Group](demo#single-tag)              |
| displayProperty | `string`                                                         | ''        | Optional. Set the attribute name to the value of the attribute.                                     | [Tag Group](demo#tags-group)              |
| deleteable      | `boolean`                                                        | false     | Optional. Specifies whether a tag can be deleted.                                                   | [Tag Group](demo#tags-group)              |
| titleProperty   | `string`                                                         | ''        | Optional. Sets the attribute name. When the cursor is hovered, the value of the title is displayed. | [Tag Group](demo#tags-group)              |
| hideBeyondTags  | `boolean`                                                        | false     | Optional. If the total width of the tag group exceeds the width of the parent, hide the extra tag.  | [Multi-Label Exceed Hide](demo#hide-tags) |
| beforeDelete    | `(tag?: string)=>boolean\|Promise<boolean>\|Observable<boolean>` | --        | Optional. Delete previous callbacks.                                                                |

### d-tags event

| Event name    | Type                                                       | Description                                                     | Jump to Demo                 |
| ------------- | ---------------------------------------------------------- | --------------------------------------------------------------- | ---------------------------- |
| tagDelete     | `EventEmitter<{tag: tag, index: index, event: event}>`     | Event triggered when a tag is deleted.                          | [Tag Group](demo#tags-group) |
| checkedChange | `EventEmitter<{ tag: tag, index: index, checked: event }>` | This event is triggered when the check status of a tag changes. |                              |
