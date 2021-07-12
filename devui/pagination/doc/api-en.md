# How to use

Import into module:

```ts
import { PaginationModule } from 'ng-devui/pagination';
```

In the page:

```html
<d-pagination></d-pagination>
```
# d-pagination


## d-pagination parameter

| Parameter | Type | Default | Description | Jump to Demo |Global Config| 
| :----------------: | :---------------: | :-------------------------------------------------: | :------------------------: | :-------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| pageSize | `number` | 10 | Optional. Maximum number of entries displayed on each page | [Basic usage](demo#basic-usage) |
| total | `number` | 0 | Optional. Total number of displayed items | [Basic usage](demo#basic-usage) |
| pageSizeOptions | `number[]` | 10 | Optional. Data source of the drop-down list box for the maximum number of items on each page. The options are 5, 10, 20, and 50 by default. | [Multiple configurations](demo#multiple-configurations) |
| pageSizeDirection | `Array<AppendToBodyDirection \| ConnectedPosition>` | ['centerDown','centerUp'] | Optional. Sets the display direction of the drop-down list box on each page. For details about AppendToBodyDirection and ConnectedPosition, see dropdown | [Multiple configurations](demo#multiple-configurations) |
| pageIndex | `number` | 1 | Optional. Initializing the page number | [Basic usage](demo#basic-usage) |
| maxItems | `number` | 10 | Optional. Maximum number of buttons that can be displayed on multiple pages. | [Basic usage](demo#basic-usage) |
| preLink | `string` | -- | Optional. Icon of the button on the previous page. The default value is the left arrow icon. | [Basic usage](demo#basic-usage) |
| nextLink | `string` | -- | Optional. The icon is displayed on the next page. The default icon is the right arrow icon. | [Basic usage](demo#basic-usage) |
| size | `number` |'' | Optional. Size of the pagination component. The options are lg, ``, and sm, indicating large, medium, and small respectively. | [Basic usage](demo#basic-usage) |
| canJumpPage | `boolean` | false | Optional. Indicates whether to display pagination input jump. | [Basic usage](demo#basic-usage) |
| canChangePageSize | `boolean` | false | Optional. Display the drop-down list box for selecting the maximum number of entries on each page. | [Basic usage](demo#basic-usage) |
| canViewTotal | `boolean` | false | Optional. Indicating whether to display the total number of entries. | [Basic usage](demo#basic-usage) |
| totalItemText | `string` |'All items' | Optional. Total item text | [Simplified mode](demo#minimalist-model) |
| goToText | `string` |'Jump to' | Optional. Jump to text | [Basic usage](demo#basic-usage) |
| showJumpButton | `boolean` | false | Optional. Whether to display the jump button | [Multiple configurations](demo#multiple-configurations) |
| showTruePageIndex | `boolean` | false | Optional. Whether to display the current page number when the page number exceeds the paging range. | [Special circumstances](demo#exceptional-case) |
| lite | `boolean` | false | Optional. Specifies Whether to switch to the simplified mode. | [Simplified mode](demo#minimalist-model) |
| showPageSelector | `boolean` | true | Optional. Whether to display the page number drop-down list in simplified mode. | [Simplified mode](demo#minimalist-model) |
| haveConfigMenu | `boolean` | false | Optional. Whether to display the configuration in simplified mode | [Simplified mode](demo#minimalist-model) |
| autoFixPageIndex | `boolean` | true | Optional. Indicates whether to automatically correct the page number when the page size is changed. If the pageIndex is processed in the `pageSizeChange` event, you are advised to set the value to `false` | [Simplified Mode](demo#minimalist-model) |
| autoHide | `boolean` | false | Optional, whether to hide automatically, autoHide is true minimum value of pageSizeOptions > total do not show pagination | [Simplified Mode](demo#minimalist-model) |

## d-pagination event

| Parameter | Type | Description | Jump to Demo |
| :-------------: | :--------------------: | :--------------------------------------------------------- | --------------------------------------------------------------- |
| pageIndexChange | `EventEmitter<number>` | Optional. Callback of page number change, which returns the current page number. | [Multiple configurations](demo#multiple-configurations) |
| pageSizeChange | `EventEmitter<number>` |Optional. Callback function when the maximum number of items on each page changes. | [Multiple configurations](demo#multiple-configurations) |

# Interface & Type Definition

### AppendToBodyDirection

```ts
export type AppendToBodyDirection = 'rightDown' | 'rightUp' | 'leftUp' | 'leftDown' | 'centerDown' | 'centerUp';
```

### ConnectedPosition

```ts
export interface ConnectedPosition {
  originX: 'start' | 'center' | 'end';
  originY: 'top' | 'center' | 'bottom';

  overlayX: 'start' | 'center' | 'end';
  overlayY: 'top' | 'center' | 'bottom';

  weight?: number;
  offsetX?: number;
  offsetY?: number;
  panelClass?: string | string[];
}
```