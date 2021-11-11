# How to use

Import into module

```ts
import { AutoCompleteModule } from 'ng-devui/auto-complete';
```

In the page

```html
<xxx dAutoComplete></xxx>
```

# dAutoComplete

## dAutoComplete Parameter

|       Parameter        |                        Type                         |                    Default                    |                                                                                                                Description                                                                                                                | Jump to Demo                                        | Global Config |
| :--------------------: | :-------------------------------------------------: | :-------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------- | ------------- |
|         source         |                    `Array<any>`                     |                      --                       |                                                                                      Required. This parameter is optional if searchFn is specified.                                                                                       | [Basic usage](demo#basic-usage)                     |
| allowEmptyValueSearch  |                      `boolean`                      |                     false                     |                                                                      Optional. indicates whether to display a search message when the bound text box value is empty.                                                                      | [Customized template display](demo#auto-custom)     |
|      appendToBody      |                      `boolean`                      |                     false                     |                                                                                Optional. Whether to append to body is displayed in the drop-down list box.                                                                                | [Customized template display](demo#auto-custom)     |
| appendToBodyDirections | `Array<AppendToBodyDirection \| ConnectedPosition>` | `['rightDown','leftDown','rightUp','leftUp']` |                                        Optional. The first position in the array is preferred for the direction array, for details about AppendToBodyDirection and ConnectedPosition, see dropdown                                        | [Customized template display](demo#auto-custom)     |
|        disabled        |                      `boolean`                      |                     false                     |                                                                                             Optional. Indicating whether to disable commands.                                                                                             | [Disabled](demo#auto-disable)                       |
|         delay          |                      `number`                       |                      300                      |                                                                  Optional. The search is performed only after the delay time elapses and a new value is entered. (`ms`)                                                                   | [Customized template display](demo#auto-custom)     |
|      disabledKey       |                      `string`                       |                      --                       | Optional. Disable a single option. If the input resource source option type is an object, for example, disabled, and the disable attribute of the object is true, for example, {label: xxx, disabled: true}, this option will be disabled | [Disabled](demo#auto-disable)                       |
|      itemTemplate      |                    `TemplateRef`                    |                      --                       |                                                                                                   Optional. Customized display template                                                                                                   | [Customized template display](demo#auto-custom)     |
|  noResultItemTemplate  |                    `TemplateRef`                    |                      --                       |                                                                                                 Optional. No matching item is displayed.                                                                                                  | [Customized template display](demo#auto-custom)     |
|       formatter        |               `(item: any) => string`               |    [`defaultFormatter`](#defaultformatter)    |                                                                                                       Optional. Formatting function                                                                                                       | [Disabled](demo#auto-disable)                       |
|      isSearching       |                      `boolean`                      |                     false                     |                                                                                      Optional. indicating whether the search template is displayed.                                                                                       | [Customized template display](demo#auto-custom)     |
|   searchingTemplate    |                    `TemplateRef`                    |                      --                       |                                                                                         Optional. The template is displayed in customized search.                                                                                         | [Customized template display](demo#auto-custom)     |
|       sceneType        |                      `string`                       |                      --                       |                                                                                             Optional. The value can be select or suggestion.                                                                                              | [Enable lazy load](demo#auto-lazy-load)             |
|        searchFn        |        `(term: string) => Observable<any[]>`        |     [`defaultSearchFn`](#defaultsearchfn)     |                                                                                                   Optional. Customized search filtering                                                                                                   | [Customized data matching method](demo#auto-object) |
|        tipsText        |                      `string`                       |                'Latest input'                 |                                                                                                           Optional. prompt text                                                                                                           | [Disabled](demo#auto-disable)                       |
|      latestSource      |                    `Array<any>`                     |                      --                       |                                                                                                          Optional. Latest input                                                                                                           | [Latest input](demo#auto-latest)                    |
|      valueParser       |                `(item: any) => any`                 |   [`defaultValueParse`](#defaultvalueparse)   |                                                                                                     (optional) Process selected data                                                                                                      | [Enable lazy load](demo#auto-lazy-load)             |
|     enableLazyLoad     |                      `boolean`                      |                     false                     |                                                                                                 Optional. Whether lazy loading is allowed                                                                                                 | [Enable lazy load](demo#auto-lazy-load)             |
|   dAutoCompleteWidth   |                      `number`                       |                      --                       |                                                                                                     Optional. Adjust the width (`px`)                                                                                                     |
|     showAnimation      |                      `boolean`                      |                     true                      |                                                                                                  optional. Whether to enable animation.                                                                                                   |                                                     | ✔             |

## dAutoComplete Event

|      Parameter      |                                         Type                                         |                                                                                                            Description                                                                                                            | Jump to Demo                            |
| :-----------------: | :----------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------- |
|      loadMore       |               `EventEmitter<ComponentRef<AutoCompletePopupComponent>>`               | : optional. It is a lazy loading trigger event. It is used together with enableLazyLoad. \`$event.loadFinish()\` is used to disable the loading status. $event is the instance of the pop-up component AutoCompletePopupComponent | [Enable lazy load](demo#auto-lazy-load) |
|     selectValue     |                                 `EventEmitter<any>`                                  |                                                                                      (optional), callback function after selecting an option                                                                                      | [Enable lazy load](demo#auto-lazy-load) |
| transInputFocusEmit | `EventEmitter<{focus: boolean, popupRef: ComponentRef<AutoCompletePopupComponent>}>` |                                                                                           (optional). Callback function for input focus                                                                                           | [Enable lazy load](demo#auto-lazy-load) |

# Interface & Type Definition

### defaultSearchFn

```ts
defaultSearchFn = (term) => {
  return of(this.source.filter((lang) => this.formatter(lang).toLowerCase().indexOf(term.toLowerCase()) !== -1));
};
```

term indicates the entered keyword.

### defaultFormatter

```ts
defaultFormatter = (item) => (item ? item.label || item.toString() : '');
```

item indicates a data item.

### defaultValueParse

```ts
defaultValueParse = (item) => item;
```

item indicates a data item.
