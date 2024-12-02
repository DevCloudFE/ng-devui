# How to use

Import into module:

```ts
import { TabsModule } from 'ng-devui/tabs';
```

In the page:

```html
<d-tabs>
  <d-tab>
    <ng-template dTabTitle>...</ng-template>
    content
  </d-tab>
</d-tabs>
```

## d-tabs

### d-tabs parameter

| Parameter              | Type                                    | Default | Description                                                                                                                                                                                                                               | Jump to Demo                                            | Global Config |
| ---------------------- | --------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ------------- |
| type                   | `tabs\|pills\|options\|wrapped\|slider` | 'tabs'  | Optional. Tab group type                                                                                                                                                                                                                  | [Type Pills](demo#type-pills)                           |
| showContent            | `boolean`                               | true    | Optional. Indicating whether to display the content corresponding to the tab.                                                                                                                                                             | [No Content](demo#no-set-content)                       |
| activeTab              | `string`                                | --      | Optional. Currently activated tab. The value is the ID of the tab.                                                                                                                                                                        | [Basic Usage](demo#basic-usage)                         |
| customWidth            | `string`                                | --      | Optional. It indicates the width of the customized tab.                                                                                                                                                                                   |                                                         |
| beforeChange           | `function\|Promise\|Observable`         | --      | Optional. Tab Callback function before switching. The value of this parameter is of the boolean type. If false is returned, tab switching can be prevented.                                                                               | [Interception Tab Switching](demo#intercept-tab-switch) |
| reactivable            | `boolean`                               | false   | Optional. Indicates whether to trigger the `activeTabChange` event when a tab in the active state is clicked. The value true indicates that the event can be triggered, and the value false indicates that the event cannot be triggered. | [Interception Tab Switching](demo#intercept-tab-switch) |
| closeable              | `boolean`                               | false   | Optional. Specifies whether to display the deletion icon.                                                                                                                                                                                 | [Add / Remove](demo#add-delete)                         |
| closeableIds           | `Array<string>`                         | []      | Optional. Specifies the ID of the tab that can be deleted. By default, the array is empty. All tabs can be deleted.                                                                                                                       | [Add / Remove](demo#add-delete)                         |
| addable                | `boolean`                               | false   | Optional. Indicating whether to display the add tab.                                                                                                                                                                                      | [Add / Remove](demo#add-delete)                         |
| addTabTpl              | `TemplateRef<any>`                      | --      | Optional. Used together with addable to customize the add tab.                                                                                                                                                                            |                                                         |
| scrollMode             | `boolean \| 'normal'\| 'auto'`          | false   | Optional. Indicates whether to enable big data scrolling. The options are normal and true. The options are auto. The scrolling mode is automatically enabled based on the comparison between the total tab width and container width.     | [Big data display](demo#big-data)                       |
| scrollModeOperationTpl | `TemplateRef<any>`                      | --      | Optional. Add custom operations in the scrolling mode.                                                                                                                                                                                    | [Big data display](demo#big-data)                       |
| isHidden               | `boolean`                               | false   | Optional. Indicates whether to use the hidden mode to not destroy the dom when the tab content is hidden.                                                                                                                                 | [Customizing a Template](demo#custom-template)          |

### d-tabs event

| Parameter            | Type                           | Description                                                                                                                    | Jump to Demo                    |
| -------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------- |
| activeTabChange      | `EventEmitter<number\|string>` | Optional. Callback function for switching tabs. This parameter is optional. It returns the ID of the currently activated tab.  | [Basic usage](demo#basic-usage) |
| addOrDeleteTabChange | `EventEmitter<number\|string>` | Optional. Callback function for adding or deleting tabs. It returns the tab ID and operation (add \| delete) of the operation. | [Add / Remove](demo#add-delete) |

### d-tab Parameter

| Parameter | Type             | Default | Description                                         | Jump to Demo                      |
| --------- | ---------------- | ------- | --------------------------------------------------- | --------------------------------- |
| id        | `number\|string` | --      | Optional. Unique value that identifies a tab.       | [Basic usage](demo#basic-usage)   |
| title     | `string`         | --      | Optional. Tab title                                 | [Basic usage](demo#basic-usage)   |
| disabled  | `boolean`        | false   | Optional. Indicating whether the tab is unavailable | [No Content](demo#no-set-content) |
