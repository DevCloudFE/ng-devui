# How to use

Import into module:

```ts
import { MultiAutoCompleteModule } from ' ng-devui/multi-auto-complete';
```

In the page:

```html
<d-multi-auto-complete></d-multi-auto-complete>
```

## d-multi-auto-complete

### d-multi-auto-complete parameters

- This component is implemented based on dAutoComplete. The usage of parameters such as itemTemplate and noResultItemTemplate is the same as that of dAutoComplete. (For details about how to use the Demo to jump to such parameters, see dAutoComplete.)

| Parameter              | Type                                                | Default                                       | Description                                                                                                                                                                                                                                | Jump to Demo                                           | Global Config |
| ---------------------- | --------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ | ------------- |
| appendToBody           | `boolean`                                           | --                                            | Optional. AppendToBody                                                                                                                                                                                                                     | [Basic usage](demo#basic-usage)                        |
| appendToBodyDirections | `Array<AppendToBodyDirection \| ConnectedPosition>` | `['rightDown','leftDown','rightUp','leftUp']` | Optional. The first position in the array is preferred for the direction array, for details about AppendToBodyDirection and ConnectedPosition, see dropdown                                                                                | [Basic usage](demo#basic-usage)                        |
| width                  | `number`                                            | --                                            | Optional. Controls the width of the drop-down list box. This parameter is used with appendToBody (`px`)                                                                                                                                    |                                                        |
| disabled               | `boolean`                                           | --                                            | Optional. Indicating whether to disable it                                                                                                                                                                                                 | [Disabled](demo#auto-complete-disabled)                |
| disabledKey            | `string`                                            | --                                            | Optional. Disable a single option. If the input resource source option type is an object, for example, disabled, and the disabled attribute of the object is true, for example, {label: xxx, disabled: true}, this option will be disabled | [Disabled](demo#auto-disable)                          |
| source                 | `Array<any>`                                        | --                                            | Optional. Data list                                                                                                                                                                                                                        | [Basic usage](demo#basic-usage)                        |
| itemTemplate           | `TemplateRef`                                       | --                                            | Optional. The drop-down list box contains a template.                                                                                                                                                                                      | [Customized template display](demo#auto-custom)        |
| noResultItemTemplate   | `TemplateRef`                                       | --                                            | Optional. Template for displaying the result when the result does not exist                                                                                                                                                                | [Customized template display](demo#auto-custom)        |
| delay                  | `number`                                            | 300                                           | Optional. The query starts after the specified delay milliseconds (`ms`)                                                                                                                                                                   | [Customized template display](demo#auto-custom)        |
| searchFn               | `(term: string) => Observable<any[]>`               | [`defaultSearchFn`](#defaultsearchfn)         | Optional. Customized search filtering                                                                                                                                                                                                      | [Customized matching method](demo#auto-complete-array) |
| formatter              | `(item: any) => string`                             | [`defaultFormatter`](#defaultformatter)       | : Optional. Customize the display content of item data. By default, item.label or item.toString() is displayed.                                                                                                                            | [Disabled](demo#auto-disable)                          |
| valueParser            | `(item: any) => any`                                | [`defaultValueParse`](#defaultvalueparse)     | Optional. Converts the selected data                                                                                                                                                                                                       | [Enable lazy loading](demo#auto-lazy-load)             |
| tipsText               | `string`                                            | --                                            | Optional. Prompt text                                                                                                                                                                                                                      | [Disabled](demo#auto-disable)                          |
| placeholder            | `string`                                            | --                                            | Optional. Placeholder                                                                                                                                                                                                                      | [Basic usage](demo#basic-usage)                        |
| latestSource           | `Array<any>`                                        | --                                            | Optional. Latest input                                                                                                                                                                                                                     | [Last input](demo#auto-latest)                         |
| showAnimation          | `boolean`                                           | true                                          | optional. Whether to enable animation.                                                                                                                                                                                                     |                                                        | ✔             |
| cssClass               | `string`                                            | --                                            | Optional. ClassName of the input.                                                                                                                                                                                                          |
| showGlowStyle          | `boolean`                                           | true                                          | Optional. Indicates whether to display the floating glow effect.                                                                                                                                                                          |
| retainInputValue          | `boolean`                                           | false                                          | Optional. Indicates whether to clear the input after tag creation.                                                                                                                                                                          |

## d-multi-auto-complete events

| Parameter  | Type                | Default | Description                                                              | Jump to Demo                                           |
| ---------- | ------------------- | ------- | ------------------------------------------------------------------------ | ------------------------------------------------------ |
| autoSubmit | `EventEmitter<any>` | --      | Optional. When the selected data changes, the selected data is returned. | [Customized matching method](demo#auto-complete-array) |

## Interface & Type Definition

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
