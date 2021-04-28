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
    <ng-template dTabContent>...</ng-template>
  </d-tab>
</d-tabs>
```

# d-tabs

## d-tabs parameter

|  Parameter   |              Type               | Default | Description                                                                                                                                                                                                                               | Jump to Demo                                                                  |Global Config| 
| :----------------: | :----------: | :-----------------------------: | :-----: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
|     type     |     `tabs\|pills\|options\|wrapped\|slider`      | 'tabs'  | Optional. Tab group type                                                                                                                                                                                                                  | [Type Pills](demo#type-pills) |
| showContent  |            `boolean`            |  true   | Optional. Indicating whether to display the content corresponding to the tab.                                                                                                                                                             | [No Content](demo#no-set-content)                                             |
|  activeTab   |            `string`             |   --    | Optional. Currently activated tab. The value is the ID of the tab.                                                                                                                                                                        | [Basic Usage](demo#basic-usage)                                               |
|   cssClass   |            `string`             |   --    | Optional. CSS class of a customized tab group                                                                                                                                                                                             | [Customized Template](demo#custom-template)                                   |
| customWidth  |            `string`             |   --    | Optional. It indicates the width of the customized tab.                                                                                                                                                                                   | [Type Options](demo#type-options) |
|   vertical   |            `boolean`            |  false  | Optional. Indicating whether to display vertically                                                                                                                                                                                        |  |
| beforeChange | `function\|Promise\|Observable` |   --    | Optional. Tab Callback function before switching. The value of this parameter is of the boolean type. If false is returned, tab switching can be prevented.                                                                               | [Interception Tab Switching](demo#intercept-tab-switch)                       |
| reactivable  |            `boolean`            |  false  | Optional. Indicates whether to trigger the `activeTabChange` event when a tab in the active state is clicked. The value true indicates that the event can be triggered, and the value false indicates that the event cannot be triggered. | [Interception Tab Switching](demo#intercept-tab-switch)                       |

## d-tabs event

|    Parameter    |              Type              | Description                                                                                                                   | Jump to Demo                    |
| :-------------: | :----------------------------: | :---------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| activeTabChange | `EventEmitter<number\|string>` | Optional. Callback function for switching tabs. This parameter is optional. It returns the ID of the currently activated tab. | [Basic usage](demo#basic-usage) |

## d-tab Parameter

| Parameter |       Type       | Default | Description                                                    | Jump to Demo                      |
| :-------: | :--------------: | :-----: | :------------------------------------------------------------- | --------------------------------- |
|   tabId   |     `string`     |   --    | Optional. Tab ID, which must be unique.                        | [Basic usage](demo#basic-usage)   |
|    id     | `number\|string` |   --    | Optional. Generally, the value is the same as that of `tabId`. | [Basic usage](demo#basic-usage)   |
|   title   |     `string`     |   --    | Optional. Tab title                                            | [Basic usage](demo#basic-usage)   |
| disabled  |    `boolean`     |  false  | Optional. Indicating whether the tab is unavailable            | [No Content](demo#no-set-content) |
