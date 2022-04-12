# How to use

Import into module

```ts
import { EditableSelectModule } from ' ng-devui/editable-select';
```

On the page

```html
<d-editable-select></d-editable-select>
```

# d-editable-select

## d-editable-select parameter

|       Parameter        |                        Type                         |                    Default                    |                                                                         Description                                                                         | Jump to Demo                                                 | Global Config |
| :--------------------: | :-------------------------------------------------: | :-------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------- | ------------- |
|      appendToBody      |                      `boolean`                      |                     false                     |                                                 Optional. Whether to appendToBody in the drop-down list box                                                 | [Basic usage](demo#basic-usage)                              |
| appendToBodyDirections | `Array<AppendToBodyDirection \| ConnectedPosition>` | `['rightDown','leftDown',`<br>`'rightUp','leftUp']` | Optional. The first position in the array is preferred for the direction array, for details about AppendToBodyDirection and ConnectedPosition, see dropdown | [Basic usage](demo#basic-usage)                              |
|         width          |                      `number`                       |                      --                       |                           Optional. Controls the width of the drop-down list box. This parameter is used with appendToBody (`px`)                           |
|        ngModel         |                        `any`                        |                      --                       |                                                 Optional. Selected objects can be bound in both directions.                                                 | [Basic usage](demo#basic-usage)                              |
|         source         |                    `Array<any>`                     |                      --                       |                                                                     Required. Data list                                                                     | [Basic usage](demo#basic-usage)                              |
|        disabled        |                      `boolean`                      |                     false                     |                                         Optional. The value true indicates that the drop-down list box is disabled.                                         |
|      disabledKey       |                      `string`                       |                      --                       |                                                    Optional. Sets the key value of the disabled option.                                                     | [Set disable options](demo#disable-data-with-source)         |
|      placeholder       |                      `string`                       |                      ''                       |                                                 Optional. This field is displayed when no item is selected.                                                 |
|      itemTemplate      |                    `TemplateRef`                    |                      --                       |                                                            Optional, Dropdown list item template                                                            |
|  noResultItemTemplate  |                    `TemplateRef`                    |                      --                       |                                 Optional. Template for which no result is found after the drop-down list item is searched.                                  |
|       maxHeight        |                      `number`                       |                      --                       |                                                  Optional. Maximum height of the drop-down list box (`px`)                                                  | [Basic usage](demo#basic-usage)                              |
|        searchFn        |        `(term: string) => Observable<any[]>`        |     [`defaultSearchFn`](#defaultsearchfn)     |                                                           Optional. User-defined search function                                                            | [Customized data matching method](demo#with-search-function) |
|     enableLazyLoad     |                      `boolean`                      |                     false                     |                                                          Optional. Whether lazy loading is allowed                                                          | [Enable lazy load](demo#lazy-load)                           |
|     showAnimation      |                      `boolean`                      |                     true                      |                                                           optional. Whether to enable animation.                                                            |                                                              | ✔             |

## d-editable-select event

|    Event     |                           Type                           |                                                                                     Description                                                                                     | Jump to Demo                       |
| :----------: | :------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | ---------------------------------- |
|   loadMore   | `EventEmitter<ComponentRef<AutoCompletePopupComponent>>` | Optional. lazy loading trigger event. This event is used together with `enableLazyLoad' to disable the loading status. \$event indicates the instance of AutoCompletePopupComponent | [Enable lazy load](demo#lazy-load) |
| toggleChange |                 `EventEmitter<boolean>`                  |                                            Optional. output function. It is optional. It is used to enable or disable the toggle event.                                             | [Basic usage](demo#basic-usage)    |

# Interface & Type Definition

### defaultSearchFn

```ts
defaultSearchFn = (term) => {
  return of(this.source.filter((lang) => this.formatter(lang).toLowerCase().indexOf(term.toLowerCase()) !== -1));
};
```

term indicates the entered keyword.
