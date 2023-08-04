# How to use
Import into module:
```ts
import { SearchModule } from 'ng-devui/search';
```

In the page:
```html
<d-search (searchFn)="onSearch($event)"></d-search>
```
# Search

## d-search parameter

| Parameter | Type | Default | Description | Jump to Demo |Global Config| 
| :----------------: | :-----------: | :-------: | :---------------------: | :-------------------------------------- | ----------------------------------------------------- |
| size | `string` |'' | Optional. Specifies the size of the search box. The options are lg, '', and sm. | [Basic Usage](demo#basic-usage) |
| placeholder | `string` |'Please Input keywords' | Optional. This parameter specifies the placeholder in the input box. |
| maxLength | `number` | Number.MAX_SAFE_INTEGER | Optional. Max-length of the text box. | [NgModel](demo#bidirectional-binding) |
| delay | `number` | 300 | Optional. Delay of debounceTime. |
| disabled | `boolean` | false | Optional. Indicating whether the text box is available. | [Basic Usage](demo#basic-usage)
| autoFocus | `boolean` | false | Optional. Whether to enable autofocus for the text box. | [Auto Focus](demo#auto-focus) |
| isKeyupSearch | `boolean` | false | Optional. Indicates whether to support immediate searchFn after input. | [Basic Usage](demo#basic-usage) |
| iconPosition | `string` | 'right' | Optional. The options are'left' and'right'.| [No Border](demo#search-no-border)|
| noBorder  | `boolean` |          'false'          | Optional. Specifies whether to display the border. | [Left Search Icon](demo#icon-left) |
| styleType  | `'default' \| 'gray'` |          'default'          | Optional. Default indicates the white background style of the wire frame, and gray indicates the gray background style of the wireless frame. | [No Border](demo#search-no-border) | ✔ |
| cssClass | `string` |'' | Optional. The class name can be transferred to the text box. | |

## d-search event

| Event | Type | Description | Jump to Demo |
| :------: | :------: | :--------------------------------------------------- | ------------------------------------------- |
| searchFn | `string` | Callback function triggered by pressing Enter or clicking the search button to return the value entered in the text box. | [Basic Usage](demo#basic-usage) |
